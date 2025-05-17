# PharmMedication
EasyMedications

EasyMedications is a web application for browsing, purchasing medications, and submitting prescriptions online. It supports user authentication, cart management, prescription uploads, and admin functionalities for managing pharmacies and inventory. Built with a React frontend and Node.js backend, it integrates MongoDB for data storage and Material-UI for a modern UI.

Features





User Authentication: Register, login, and logout with JWT-based security.



Medicine Discovery: Browse and filter medications by category, search, and add to cart.



Cart Management: Add, view, and remove items from the cart.



Prescription Upload: Submit prescriptions with medication details and pharmacy selection.



Admin Dashboard: Manage pharmacies, inventory, and view analytics (for Admin users).



Role-Based Access: Supports User, Pharm, and Admin roles.



Responsive Design: Built with Material-UI for a seamless experience across devices.

Project Flow





User Interaction:





Users browse medications on the MedicineDiscovery page, filter by category (e.g., Pain Relief), or search by name.



Authenticated users add items to their cart, view cart contents, or remove items.



Users upload prescriptions via a form, selecting a location and pharmacy.



Admin Interaction:





Admins access /Dashboard, /Pharmacy, and /Inventory routes to manage data.



Admins view pharmacy lists, update inventory, and monitor prescription statuses.



Backend Processing:





APIs handle cart operations (/api/cart), prescriptions (/api/prescriptions), and pharmacy data (/api/pharmacy).



MongoDB stores user data (including cart), prescriptions, and pharmacy details.



Authentication:





JWT tokens authenticate API requests, ensuring secure access to user-specific data.

Tech Stack





Frontend: React, Material-UI, Axios, Formik, Yup, React-Router



Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt



Environment: .env for API URLs, JWT secrets, and MongoDB URI

Prerequisites





Node.js (v16+)



MongoDB (local or Atlas with 0.0.0.0 network access)



npm



Git

Setup Instructions

1. Clone the Repository

git clone https://github.com/<your-username>/EasyMedications.git
cd EasyMedications

2. Backend Setup





Navigate to the server directory:

cd Server



Install dependencies:

npm install



Create a .env file in Server with:

MONGO_URI=mongodb://localhost:27017/easymedications
JWT_SECRET=your_jwt_secret
PORT=5000



Initialize MongoDB for existing users:

// Run in MongoDB shell
db.users.updateMany(
  { cart: { $exists: false } },
  { $set: { cart: [] } }
);



Start the backend:

npm start

3. Frontend Setup





Navigate to the client directory:

cd client



Install dependencies:

npm install



Create a .env file in client with:

REACT_APP_API_URL=http://localhost:5000/api



Start the frontend:

npm start

4. Access the Application





Frontend: http://localhost:3000



Backend API: http://localhost:5000/api

Usage





Register/Login:





Navigate to /register or /login to create or access an account.



Admin accounts (role: Admin) can access dashboard features.



Browse Medications:





Use the search bar or category filters on the homepage (/) to find medications.



Click "Add to Cart" to add items (requires login).



Manage Cart:





View cart at /cart.



Remove items as needed.



Submit Prescription:





Click the profile icon and select "Upload Prescription".



Fill in medication details, patient name, location, and pharmacy.



Admin Features:





Log in as an admin to access /Dashboard, /Pharmacy, and /Inventory.



Manage pharmacy data and inventory.

API Endpoints





Users:





POST /api/users/register: Register a new user.



POST /api/users/login: Login and receive JWT.



GET /api/users/profile: Fetch user role and email.



Cart:





POST /api/cart: Add item to cart.



GET /api/cart: View cart items.



DELETE /api/cart: Remove item from cart.



Prescriptions:





POST /api/prescriptions: Submit a prescription.



Pharmacy:





GET /api/pharmacy/locations: List available locations.



GET /api/pharmacy/list?address=<location>: List pharmacies by location.



GET /api/pharmacy/admin/pharmacies: Admin pharmacy management.

Testing





Backend:

curl -X POST http://localhost:5000/api/users/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123","role":"User"}'

curl -X POST http://localhost:5000/api/cart \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"productId":"1","quantity":1,"name":"Ibuprofen"}'



Frontend:





Open http://localhost:3000.



Test cart addition, prescription submission, and admin navigation.



Check browser console and Network tab for errors.

Troubleshooting





404 Errors: Verify API endpoints match between frontend and backend.



Undefined Cart: Ensure cart field is initialized in MongoDB (userModel.js has default: []).



Syntax Errors: Run npm start in client to catch JSX issues; fix in MedicineDiscovery.js.



MongoDB Connection: Confirm MONGO_URI in .env and network access (0.0.0.0 for Atlas).



Debugging: Add console.log in controllers or components; check MongoDB with db.users.find().

Contributing





Fork the repository.



Create a feature branch (git checkout -b feature/YourFeature).



Commit changes (git commit -m "Add YourFeature").



Push to the branch (git push origin feature/YourFeature).



Open a Pull Request.

License

MIT License. See LICENSE for details.

Contact

For support, contact the development team at support@solutionwing.io.
