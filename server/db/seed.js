import mongoose from 'mongoose';
import User from '../models/userModel.js';
import connectDB from './conn.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Connected to database: ${dbName}`);
    if (dbName !== 'EasyMedication') {
      throw new Error(`Expected database 'EasyMedication', but connected to '${dbName}'`);
    }
    const adminExists = await User.findOne({ email: 'admin@easymedications.com' });
    if (!adminExists) {
      const admin = new User({
        email: 'admin@easymedications.com',
        password: 'Admin123!', // Will be hashed
        role: 'Admin'
      });
      await admin.save();
      console.log(`Admin user created in ${dbName}.users`);
    } else {
      console.log(`Admin user already exists in ${dbName}.users`);
    }
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    await mongoose.connection.close();
  }
};

seedAdmin();