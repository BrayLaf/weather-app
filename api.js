// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'data', 'reg.json');

const readDataFromFile = () => {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        // If the file is empty, return an empty array
        return data ? JSON.parse(data) : [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  };

router.post('/register', (req, res) => {
    try {
        const newRegistration = req.body; // the newUser object from the client
    
        // Read existing registrations
        const registrations = readDataFromFile();
    
        // Append the new registration to the list
        registrations.push(newRegistration);
    
        // Write the updated array back to the file with pretty-print formatting for readability
        fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2));
    
        // Send a success response with the data you just saved
        res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: newRegistration
        });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error'
        });
      }
});

router.get('/viewReg', (req, res) => {
    const registrations = readDataFromFile();
    res.json(registrations);
});

module.exports = router;