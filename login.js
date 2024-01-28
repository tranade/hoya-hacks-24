const express = require('express');
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  
  const app = express();
  app.use(bodyParser.json());
  
  const db = mysql.createConnection({
    host: 'your-mysql-host',
    user: 'your-mysql-user',
    password: 'your-mysql-password',
    database: 'your-mysql-database',
  });
  
  app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
  
    const query = 'SELECT * FROM userinfo WHERE user_id = ? AND passcode = ?';
  
    console.log('Executing query:', query);
    console.log('Query parameters:', [email, password]);
  
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Query results:', results);
  
      if (results.length > 0) {
        // Authentication successful
        res.status(200).send('Login successful');
        console.log('Logged in successfully');
      } else {
        // Authentication failed
        res.status(401).send('Invalid email or password');
      }
    });
  });
  
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });