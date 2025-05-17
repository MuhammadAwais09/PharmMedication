import express from "express";
import { getDb } from "../db/conn.js"
import userModel from "../models/userModel.js";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';



import path from 'path';

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_url,
);
oauth2Client.setCredentials({
  refresh_token: process.env.Referesh_Token,
});
const router = express.Router();
dotenv.config();
const secretKey = process.env.secretKey;
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});



export const addPatient = async (req, res) => {
  const {
    _id, firstName, lastName, gender, age, dob, city, state, zip, status, emailAddress, phoneNumber, trackingNumber,
    firstNameTo, lastNameTo, dobTo, genderTo, cityTo, stateTo, zipTo, statusTo, emailAddressTo, phoneNumberTo, trackingNumberTo
  } = req.body;

  console.log("emailAddress", emailAddress);

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  try {
    jwt.verify(token, process.env.secretKey); // Assuming your secretKey is in environment variables
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  let client;

  try {
    client = await getDb().connect();
    if (!client) throw new Error("Database connection not established");

    console.log("Database connection established");

    let query, values;
    const isNewPatient = !_id;

    if (isNewPatient) {
      // Add operation: Insert a new patient
      query = `
         INSERT INTO patients (
          "firstName", "lastName", "gender", "age", "dob", "city", "state", "zip", "status", "createdAt",
          "emailAddress", "phoneNumber", "trackingNumber",
          "firstNameTo", "lastNameTo", "dobTo", "genderTo", "cityTo", "stateTo", "zipTo", "statusTo",
          "emailAddressTo", "phoneNumberTo", "trackingNumberTo"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
          $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        ) RETURNING "_id"
      `;
      values = [
        firstName, lastName, gender, age, dob, city, state, zip, status, new Date(), emailAddress, phoneNumber, trackingNumber,
        firstNameTo, lastNameTo, dobTo, genderTo, cityTo, stateTo, zipTo, statusTo, emailAddressTo, phoneNumberTo, trackingNumberTo
       ];
    } else {
      // Update operation: Update an existing patient
      query = `
        UPDATE patients SET
          "firstName" = COALESCE($2, "firstName"), "lastName" = COALESCE($3, "lastName"), "gender" = COALESCE($4, "gender"),
          "age" = COALESCE($5, "age"), "dob" = COALESCE($6, "dob"), "city" = COALESCE($7, "city"), "state" = COALESCE($8, "state"),
          "zip" = COALESCE($9, "zip"), "status" = COALESCE($10, "status"), "updatedAt" = $11, "emailAddress" = $12,
          "phoneNumber" = $13, "trackingNumber" = $14,
          "firstNameTo" = COALESCE($15, "firstNameTo"), "lastNameTo" = COALESCE($16, "lastNameTo"), "dobTo" = COALESCE($17, "dobTo"),
          "genderTo" = COALESCE($18, "genderTo"), "cityTo" = COALESCE($19, "cityTo"), "stateTo" = COALESCE($20, "stateTo"),
          "zipTo" = COALESCE($21, "zipTo"), "statusTo" = COALESCE($22, "statusTo"), "emailAddressTo" = COALESCE($23, "emailAddressTo"),
          "phoneNumberTo" = COALESCE($24, "phoneNumberTo"), "trackingNumberTo" = COALESCE($25, "trackingNumberTo")
        WHERE "_id" = $1 RETURNING "_id"
      `;
      values = [
        _id, firstName, lastName, gender, age, dob, city, state, zip, status, new Date(), emailAddress, phoneNumber, trackingNumber,
        firstNameTo, lastNameTo, dobTo, genderTo, cityTo, stateTo, zipTo, statusTo, emailAddressTo, phoneNumberTo, trackingNumberTo
      ];
    }

    const result = await client.query(query, values);
    const patientId = result.rows[0]?._id;

    if (isNewPatient) {
      res.status(201).json({ message: "Patient added successfully", patientId });
    } else {
      if (result.rowCount > 0) {
        res.status(200).json({ message: `Patient with ID ${_id} updated successfully` });
      } else {
        res.status(200).json({ message: `Patient with ID ${_id} not found` });
      }
    }
  } catch (error) {
    console.error("Error in addPatient:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  } finally {
    // Ensure client release in case of error or success
    if (client) {
      client.release();
    }
  }
};


export const getAllPatients = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.secretKey); // Assuming your secretKey is in environment variables
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Token is valid, proceed with fetching patients
    const client = await getDb().connect();

    // Query to fetch all patients
    const query = 'SELECT * FROM patients WHERE "inActive" = false';
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Check if any patients are found
    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'No patients found' });
    }

    // Send the result as a JSON response
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.secretKey);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Token is valid, proceed with the deletion process
    const documentId = parseInt(req.query.documentId, 10); // Convert documentId to an integer
    console.log("Received documentId:", req.query.documentId);
    console.log("Parsed documentId as integer:", documentId);

    // Validate that documentId is a valid integer
    if (isNaN(documentId)) {
      return res.status(400).json({ message: 'Invalid document ID. Must be an integer.' });
    }

    const client = await getDb().connect();

    // Only update the 'inactive' field
    const query = 'UPDATE patientdocument SET inactive = true WHERE _id = $1 RETURNING *';
    const result = await client.query(query, [documentId]);

    // Release the client back to the pool
    client.release();

    // If no document is found with the given ID
    if (result.rowCount === 0) {
      return res.status(200).json({ message: 'Document not found' });
    }

    // Send the updated document data as a JSON response
    return res.status(200).json({
      message: 'Document marked as inactive successfully',
      document: result.rows[0] // This should still include the original filename and other fields
    });
  } catch (error) {
    console.error('Error marking document as inactive:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const uploadFile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.secretKey);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const patientId = req.body.patientId;
    const emailAddress = req.body.emailAddress;
    const documentType = req.body.documentType;
    const isChecked = req.body.isChecked; // Use camelCase
    const date = req.body.date;

    console.log('Received patientId:', patientId);
    console.log('Received emailAddress:', emailAddress);
    console.log('Received documentType:', documentType);
    console.log('Received date:', date);
    console.log('isChecked:', isChecked, 'Type:', typeof isChecked);


    // Read the file content
    const fileContent = fs.readFileSync(file.path);

    // Extract the filename
    const filename = file.originalname;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: path.basename(file.originalname),
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    // Upload the file to S3
    const data = await s3.upload(params).promise();
    const client = await getDb().connect();

    try {
      // Insert patientId, url, filename, documentType, and date into the database
      const query = `
        INSERT INTO patientDocument (patientId, url, filename, documentType, date)
        VALUES ($1, $2, $3, $4, $5) RETURNING _id
      `;
      const values = [patientId, data.Location, filename, documentType, date];
      const result = await client.query(query, values);

      console.log('Inserted document ID:', result.rows[0]._id);

      let emailResponse = null;
      if (isChecked === 'true') {
        emailResponse = await sendEmailToPatient(patientId, filename, emailAddress,file);
      }

      const response = {
        message: 'File uploaded successfully',
        documentId: result.rows[0]._id,
      };

      if (emailResponse) {
        response.emailStatus = emailResponse;
      }

      return res.status(200).json(response);

    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



export const getPatientDocument = async (req, res) => {
  const { patientId, docId } = req.params;

  // Validate patientId format
  if (patientId && isNaN(patientId)) {
    return res.status(400).send('Invalid patient ID format');
  }

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.secretKey);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  try {
    const client = await getDb().connect();

    let query, values;
    if (docId) {
      // If docId is provided, fetch the specific document
      query = 'SELECT * FROM patientDocument WHERE _id = $1 AND inactive = false';
      values = [docId];
    } else if (patientId) {
      // If patientId is provided, fetch documents for the patient
      query = 'SELECT * FROM patientDocument WHERE patientId = $1 AND inactive = false';
      values = [patientId];
    } else {
      return res.status(400).send('Either patientId or docId must be provided');
    }

    const result = await client.query(query, values);
    client.release();

    // Check if any documents were found
    if (result.rows.length === 0) {
      return res.status(200).send(`No active documents found for ${docId ? `document ID: ${docId}` : `patient ID: ${patientId}`}`);
    }

    // For each document, generate a presigned URL
    const documentsWithPresignedUrls = await Promise.all(result.rows.map(async (document) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: document.filename, // The filename is saved as the Key in S3
        Expires: 60 * 3, // Presigned URL expires in 3 minutes
      };

      // Generate presigned URL
      const presignedUrl = await s3.getSignedUrlPromise('getObject', params);

      // Return the document with the presigned URL
      return {
        ...document,
        presignedUrl // Attach the presigned URL to the document
      };
    }));

    // Return the documents with presigned URLs
    return res.status(200).json(documentsWithPresignedUrls);
  } catch (error) {
    console.error('Error getting patient documents:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const getAllPatientDocument = async (req, res) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.secretKey);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  try {
    const client = await getDb().connect();

    // Query to fetch all active documents
    const query = 'SELECT * FROM patientDocument WHERE inactive = false';

    const result = await client.query(query);
    client.release();

    // Check if any documents were found
    if (result.rows.length === 0) {
      return res.status(200).send('No active documents found.');
    }

    // For each document, generate a presigned URL
    const documentsWithPresignedUrls = await Promise.all(result.rows.map(async (document) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: document.filename, // The filename is saved as the Key in S3
        Expires: 60 * 3, // Presigned URL expires in 3 minutes
      };

      // Generate presigned URL
      const presignedUrl = await s3.getSignedUrlPromise('getObject', params);

      // Return the document with the presigned URL
      return {
        ...document,
        presignedUrl // Attach the presigned URL to the document
      };
    }));

    // Return the documents with presigned URLs
    return res.status(200).json(documentsWithPresignedUrls);
  } catch (error) {
    console.error('Error getting all patient documents:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




export const getPatientById = async (req, res) => {
  const { id } = req.params;

  // Ensure the ID is a number or appropriate type for PostgreSQL
  if (isNaN(id)) {
    return res.status(400).send('Invalid ID format');
  }

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.secretKey); // Assuming your secretKey is in environment variables
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  try {
    const client = await getDb().connect(); // Get a client from the pool

    // Prepare the SQL query
    const query = 'SELECT * FROM patients WHERE _id = $1';
    const values = [parseInt(id, 10)];

    // Execute the query
    const result = await client.query(query, values);

    // Release the client back to the pool
    client.release();

    // Check if any rows were returned
    if (result.rows.length === 0) {
      return res.status(200).send(`Patient with ID: ${id} does not exist`);
    }

    // Send the result as JSON response
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error getting patient by ID:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const deletePatient = async (req, res) => {
  const { id } = req.params;
  console.log("I'm called deactivatePatient");

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.secretKey); // Assuming your secretKey is in environment variables
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  try {
    const client = await getDb().connect(); // Get a client from the pool

    // Prepare the SQL query to mark the patient as inactive
    const query = `UPDATE patients SET "inActive" = TRUE WHERE _id = $1 RETURNING *`;
    const values = [id];

    // Execute the query
    const result = await client.query(query, values);

    // Release the client back to the pool
    client.release();

    if (result.rowCount > 0) {
      return res.status(200).json({ message: `Patient with ID ${id} has been marked as inactive.` });
    } else {
      return res.status(404).json({ message: `Patient with ID ${id} not found` });
    }
  } catch (error) {
    console.error('Error in deactivatePatient:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const sendEmailToPatient = async (patientId, filename, emailAddress, file) => {
  try {
    // Get access token using the refresh token
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.Email,
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.Referesh_Token,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"Premium Labs" <${process.env.Email}>`,
      to: emailAddress,
      subject: 'Your test results are ready.',
      text: 'Please find your test results attached.',
      attachments: [
        {
          filename: filename,
          content: fs.readFileSync(file.path),
          encoding: 'base64',
          contentType: file.mimetype,
        },
      ],
      html: `
At Premium Labs, we strive to provide excellent service. If you had a positive experience, we'd appreciate a brief review. Your feedback helps us improve.
To leave a review, simply click https://g.page/r/CXGmN_8TtG83EBM/review or search for "Premium Labs" on Google. There's no need to mention the specific service you received.
Thank you for choosing Premium Labs!
        <p>Best regards,</p>
        <p>Premium Labs Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return 'Email sent successfully.';
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email notification.');
  }
};

export const count = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.secretKey);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  let client;
  try {
    client = await getDb().connect();
    const query = `
      SELECT documenttype, COUNT(*) AS count
FROM patientdocument
WHERE inactive = 'false'
GROUP BY documenttype
    `;
    const result = await client.query(query);

    const counts = {};

    result.rows.forEach(row => {
      const type = row.documenttype;
      counts[type] = Number(row.count);
    });

    return res.status(200).json(counts);
  } catch (error) {
    console.error('Error fetching patient documents:', error);
    return res.status(500).json({ message: 'An error occurred while fetching patient documents.' });
  } finally {
    // Ensure the client is released back to the pool
    if (client) {
      client.release();
    }
  }
};


export default router;
