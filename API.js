const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require("cors");
const date = require('date-and-time');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin:true}));

// const hostname = '192.168.1.107';
const hostname = '192.168.1.103';
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
        const query = 'SELECT * FROM services';
      
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

  //GET API for GROUP
  app.get('/api/services', (req, res) => {
    const query = 'SELECT * FROM SERVICES';
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
  app.post('/api/takeservice',async(req, res) => {
      const { S_Name, Gender,Age, Profession, Pincode,State,City,Area,Group,GenderS,AgeS,Experience,SpecialNote,DocLink,VideoLink,LocationLink,AnySpecialGroup,Category,Charges_paid, MobileNo} = req.body;
      const dateTimeObject = new Date(); 
      try {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const currentDate = new Date(); 
        const currentYear = currentDate.getFullYear();
        const currentHour = currentDate.getHours();
        const currentMonth = currentDate.getMonth() + 1;
        const currentMinute = currentDate.getMinutes();
        const currentDay = currentDate.getDate();
        const lastThreeDigits = MobileNo.slice(-3);
        const currentSecond = currentDate.getSeconds();
      
        const till_date = date.addDays(dateTimeObject,30)

        console.log(till_date);

      Serviceid = "SDK"+ currentYear + currentHour + currentMonth + currentMinute + currentDay + lastThreeDigits + currentSecond;
      console.log(Serviceid);

      con.query('select * from services where Category =  ?',[Category], (error, result) => {
        if (error) {
          throw error;
        } else {
          if(result.length == "1")
          {
            Sector = result[0]['Sector'];
            Service = result[0]['Service'];
            Charges = result[0]['ChargePerDay'];


          con.query('INSERT INTO servicehdr (Serviceid,Sector,Service,Category,Charges,Charges_paid,Created_On,Valid_till,S_Status) VALUES (?,?,?,?,?,?,?,?,?)',[Serviceid,Sector,Service,Category,Charges,Charges_paid,dateTimeObject,till_date,"Save" ], (err, result) => {
          if (err) throw err;
          else{
            
            con.query('INSERT INTO servicedtl (Serviceid,S_Name,Gender,Country,State,City,Area,Pincode) VALUES (?,?,?,?,?,?,?,?)',[Serviceid,S_Name,Gender,"INDIA",State,City,Area,Pincode ], (err, result) => {
              if (err) throw err;
            res.json({ message: 'Inserted successfully'});
            });

          }   
        });


          }
        }
      });
    } catch (error) {
      res.json({ message: 'Error calling URL:', error}); 
    }    
  });
 
   //GET API for GROUP
   app.get('/api/getallservices', (req, res) => {
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid';
    // Execute the query
    con.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });

  //delete service from cart
  app.delete('/api/deleteFromCart',(req, res) => {
    const { Serviceid } = req.body;
    const query = 'DELETE FROM servicedtl WHERE Serviceid=?';

    con.query(query,[Serviceid], (error, rows, result) => {
      if (error) {
        throw error;
      } else {  
      
          const queryhdr = 'DELETE FROM servicehdr WHERE Serviceid=?';
          con.query(queryhdr,[Serviceid], (error, results) => {
            if (error) {
              res.status(500).send(error);
            } else {
              res.json(results);
            }
          });
           
      }
    });     
  });


  app.post('/api/editFromCart',(req, res) => {
    const { Serviceid } = req.body;
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid WHERE servicehdr.Serviceid = ?';
    con.query(query,[Serviceid], (error, result) => {
      if (error) {
        throw error;
      } else {  
        res.json(result);
      }
    });  
  })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
