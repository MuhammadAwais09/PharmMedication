import User from '../models/userModel.js';
import Payment from '../models/paymentModel.js';
import jwt from 'jsonwebtoken';

// Product price mapping (consistent with Cart.js)
const productPrices = {
  1: 10.0, // Ibuprofen
  2: 8.0,  // Paracetamol
  3: 5.0,  // Aspirin
  4: 12.0, // Cetirizine
  5: 15.0, // Loratadine
  6: 14.0, // Fexofenadine
  7: 20.0, // Amoxicillin
  8: 18.0, // Azithromycin
  9: 22.0, // Ciprofloxacin
  10: 25.0, // Metformin
  11: 30.0, // Insulin
  12: 28.0, // Glipizide
  13: 27.0, // Atorvastatin
  14: 26.0, // Losartan
  15: 24.0, // Amlodipine
  16: 15.0, // Omeprazole
  17: 13.0, // Ranitidine
  18: 10.0, // Loperamide
  19: 35.0, // Albuterol
  20: 32.0, // Montelukast
  21: 30.0, // Budesonide
  22: 20.0, // Prednisone
  23: 18.0, // Dexamethasone
  24: 16.0, // Hydrocortisone
  25: 22.0, // Sertraline
  26: 21.0, // Fluoxetine
  27: 19.0, // Diazepam
  28: 23.0, // Levothyroxine
  29: 20.0, // Liothyronine
  30: 25.0, // Propylthiouracil
};

const processPayment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { cardNumber, cardHolder } = req.body;
    if (!cardNumber || !cardHolder) {
      return res.status(400).json({ error: 'Card number and cardholder name are required' });
    }

    const user = await User.findById(userId).select('cart name');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.cart.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total amount and prepare items with prices
    const items = user.cart.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: productPrices[item.productId] || 10.0, // Default price
    }));

    const amount = items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

    // Create payment record
    const payment = new Payment({
      userId,
      cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Mask card number
      cardHolder,
      amount: parseFloat(amount),
      items,
    });

    await payment.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    // Return data for invoice
    res.status(200).json({
      message: 'Payment successful',
      invoiceData: {
        userName: user.name,
        cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
        amount: parseFloat(amount),
        items,
        createdAt: payment.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { processPayment, getPaymentHistory };