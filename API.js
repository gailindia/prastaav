const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin:true}));

// const hostname = '192.168.1.107';
const hostname = '192.168.1.101';
const port = 4040;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "gail@123",
    database : 'test',
    insecureAuth : true
    });

    con.connect();

    //GET API for GROUP
    app.get('/api/data', (req, res) => {
        const query = 'SELECT * FROM mobilelogin';
      
        // Execute the query
        con.query(query, (error, results) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.json(results);
          }
        });
    });
  

  // LOGIN API
    app.post('/api/Login',async(req, res) => {
    const { MobileNo} = req.body;
    const dateTimeObject = new Date(); 
    const OTP = Math.floor(100000 + Math.random() * 900000); 
    const message = 'One time password (OTP) is ' + OTP + ' for verification in Service APP. Do not share OTP for security reasons.';
    const encodedString = encodeURIComponent(message);

    try {
      const url = 'https://www.buckfy.in/api/mt/SendSMS?user=gailintr&password=Gail@123&senderid=GAILIN&channel=Trans&DCS=0&flashsms=0&number='+MobileNo+'&text='+ encodedString +'&route=04'; //Replace this with the URL you want to call
      const response = await axios.get(url);

      con.query('select * from mobilelogin where Mobile =  ?',[MobileNo], (error, result) => {
        if (error) {
          throw error;
        } else {
          if(result.length == "1")
          {
            
            con.query('update mobilelogin set OTP=?,Verified_ON = ?,Created_On =? where Mobile = ? ',[OTP,dateTimeObject,dateTimeObject,MobileNo], (err, result) => {
              if (err) throw err;
              res.json({ success: true, message: 'OTP sent successfully!' });
            });
          }else{
            con.query('INSERT INTO mobilelogin (Mobile,OTP,Verified_ON,Created_On) VALUES (?,?,?,?)',[MobileNo,OTP,dateTimeObject,dateTimeObject], (err, result) => {
              if (err) throw err;
              res.json({ message: 'Login successfully'});
            });
          }      
        }
      }) 
  } catch (error) {
    res.json({ message: 'Error calling URL:', error}); 
  }    
    });
  
  // VERIFY OTP
  app.post('/api/VerifyOTP', (req,res) => {
    const { MobileNo,OTP} = req.body;

    con.query('select OTP from mobilelogin where Mobile =  ?',[MobileNo], (error, rows, result) => {
      if (error) {
        throw error;
      } else {  
       
        if(OTP == rows[0].OTP)
        {
          res.json({ success: true, message: 'OTP Verified' });
        }else{
          res.json({ message: 'Invalid OTP'});
        }      
      }
    })     
  });


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
