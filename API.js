const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require("cors");
const date = require('date-and-time');
const { isEmpty } = require('rxjs');
const { default: test } = require('node:test');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin:true}));

const hostname = '192.168.1.100';

const port = process.env.PORT || 4000;;


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "gail@123",
    database : 'test',
    insecureAuth : true
    });

    con.connect();

    //GET API for GROUP
    app.post('/api/GetCategory', (req, res) => {
      const { Category} = req.body;
        const query = 'SELECT * FROM services where Category = ?';  
        // Execute the query
        con.query(query,[Category], (error, results) => {
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
    const { service} = req.body;
        // Execute the query
        // con.query('select * from services where service =  ?',[service], (error, results) => {
          con.query('select * from services ', (error, results) => {  
        if (error) {
            res.status(500).send(error);
          } else {
            console.log(results);
            res.json(results);
          }
        });
  });


  // LOGIN API
  app.post('/api/takeservice',async(req, res) => {

      const { S_Name, Gender,Age, Profession, Pincode,State,City,Area,SpecialNote,DocLink,VideoLink,LocationLink,AnySpecialGroup,Category,Charges_paid, MobileNo, Serviceid} = req.body;

      const dateTimeObject = new Date(); 
      try {     
        var OTP = Math.floor(100000 + Math.random() * 900000);
        if(Serviceid === "")
        {   
            // const MobileNo = '7987593871';  
            const currentDate = new Date(); 
            const currentYear = currentDate.getFullYear();
            const currentHour = currentDate.getHours();
            const currentMonth = currentDate.getMonth() + 1;
            const currentMinute = currentDate.getMinutes();
            const currentDay = currentDate.getDate();      
            const currentSecond = currentDate.getSeconds();   
            const till_date = date.addDays(dateTimeObject,30);
            const lastThreeDigits = MobileNo.slice(-3);
                
            Id = "SDK"+ currentYear + currentHour + currentMonth + currentMinute + currentDay + lastThreeDigits + currentSecond;
         console.log("Service ID :: ",Id);
                con.query('select * from services where Category =  ?',[Category], (error, result) => {
                  if (error) {
                    throw error;
                  } else {
                    if(result.length == "1")
                    {
                      Sector = result[0]['Sector'];
                      Service = result[0]['Service'];
                      Charges = result[0]['ChargePerDay'];      
                    con.query('INSERT INTO servicehdr (Serviceid,Sector,Service,Category,Charges,Charges_paid,Created_On,Valid_till,S_Status,Mobile) VALUES (?,?,?,?,?,?,?,?,?,?)',[Id,Sector,Service,Category,Charges,Charges_paid,dateTimeObject,till_date,"Save",MobileNo ], (err, result) => {
                      if (err) throw err;
                      else{         
                        con.query('INSERT INTO servicedtl (Serviceid,S_Name,Gender,Age,Profession,Country,State,City,Area,Pincode,SpecialNote,DocLink,VideoLink,LocationLink,AnySpecialGroup) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Id,S_Name,Gender,Age,Profession,"INDIA",State,City,Area,Pincode,SpecialNote,DocLink,VideoLink,LocationLink,AnySpecialGroup ], (err, result) => {
                          if (err) throw err;
                        res.json({ message: 'Inserted successfully'});
                        });   
                      }   
                    });
                    }
                  }
                });
        }
        else{
          con.query('select * from servicedtl where Serviceid = ?',[Serviceid], (error,result1) => {
            if (error) {
              throw error;
            } 
            else
                {
                  const updateQuery = 'UPDATE servicedtl SET S_Name = ? Gender = ?, Age = ?, Profession=?, Pincode =?, State=?, City=?, Area=?,SpecialNote=?,DocLink=?,VideoLink =?,LocationLink=?,AnySpecialGroup=? WHERE Serviceid = ?';                 
                  const params = [S_Name, Gender, Age,Profession,Pincode,State,City,Area,SpecialNote,DocLink,VideoLink,LocationLink,AnySpecialGroup, Serviceid];
                  con.query(updateQuery, params, (err, results) => {
                    res.json({ message: 'Updated successfully'});
                  });
                }             
          });        
        }
    } catch (error) {
      res.json({ message: 'Error calling URL:', error}); 
    }    
  });

  //GET API for GROUP
  app.get('/api/getallservices', (req, res) => {
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode,servicedtl.SpecialNote,servicedtl.DocLink,servicedtl.VideoLink,servicedtl.LocationLink,servicedtl.AnySpecialGroup,servicehdr.S_Status FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid ';
    // Execute the query
    con.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });

  //GET API for TAKE service in sell all
  app.get('/api/getTakeServiceDet', (req, res) => {
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid where servicehdr.Service ="Take" ';
    // Execute the query
    con.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });

   //GET API for GIVE service in sell all
   app.get('/api/getGiveServiceDet', (req, res) => {
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid where servicehdr.Service ="Give" ';
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

  //edit from cart
  app.post('/api/editFromCart',(req, res) => {
    const { Serviceid } = req.body;
    const query = 'SELECT servicehdr.Serviceid,servicehdr.Category, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.Age, servicedtl.Profession,servicedtl.SpecialNote,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode,servicedtl.SpecialNote,servicedtl.DocLink,servicedtl.VideoLink,servicedtl.LocationLink,servicedtl.AnySpecialGroup FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid WHERE servicehdr.Serviceid = ?';
    con.query(query,[Serviceid], (error, result) => {
      if (error) {
        throw error;
      } else {  
        res.json(result);
      }
    });  
  })

app.post('/api/getSeeAll', async (req, res) => {
  const { Mobile } = req.body;
  try {
      const result1 = await new Promise((resolve, reject) => {
          con.query('select distinct Category from servicehdr where Mobile = ?', [Mobile], (error, result1) => {
              if (error) {
                  reject(error);
              } else {
                  resolve(result1);
              }
          });
      });

      let List = [];
      for (const element of result1) {
          const results = await new Promise((resolve, reject) => {
              const query = 'SELECT servicehdr.Category, servicehdr.Serviceid,servicehdr.service, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode,servicedtl.SpecialNote,servicedtl.DocLink,servicedtl.VideoLink,servicedtl.LocationLink,servicedtl.AnySpecialGroup, servicehdr.Mobile FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid where servicehdr.S_Status ="Verified" and servicehdr.Category= ?';
              con.query(query, [element.Category], (error, results) => {
                  if (error) {
                      reject(error);
                  } else {

                      resolve(results);
                  }
              });
          });
          
          List.push(...results);
      }
      console.log("FINAL DATA", List);
      return res.json(List);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.post('/api/cartPay', (req,res)=>{
    const {serviceid,Charges_paid } = req.body;
    const query = 'update servicehdr set S_Status = "Paid" , Charges_paid = ? where serviceid = ?';
    con.query(query,[Charges_paid,serviceid],(error,resilts)=>{
      if(error){
        res.status(500).send(error);
      }
      else{
        res.json({ message: 'Updated successfully'});
      }
    })
  });

  app.post('/api/joinService',(req,res)=>{
    const{SenderId,ReceiverId,RequestType,Status,Mobile,Category} = req.body;
    const dateTimeObject = new Date(); 
    query1 = 'select serviceid,category from servicehdr where Mobile = ? and category = ?';
    con.query(query1,[Mobile,Category],(error,results)=>{
      if(error){res.status(500).send(error);}
      else{
        const senderid = results[0]['ServiceId'];
        query = 'insert into serviceflow(SenderId,ReceiverId,RequestType,RequestDate,Status) values(?,?,?,?,?)';
        con.query(query,[SenderId,ReceiverId,RequestType,dateTimeObject,Status],(error,results)=>{
          console.log(res.query);
          if(error){
            res.status(500).send(error);
          }
          else{
            res.json({ message: 'Inserted successfully'});
          }
        })
      }
    })  
  });

  app.get('/api/getJoinRequests',(req,res)=>{
    query = 'SELECT servicehdr.Serviceid,servicehdr.service, servicehdr.Charges, servicedtl.S_Name,servicedtl.Gender,servicedtl.State,servicedtl.City,servicedtl.Area,servicedtl.Pincode,servicedtl.SpecialNote,servicedtl.DocLink,servicedtl.VideoLink,servicedtl.LocationLink,servicedtl.AnySpecialGroup, servicehdr.Mobile  FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid INNER JOIN serviceflow ON servicehdr.Serviceid=serviceflow.Senderid where servicehdr.S_Status ="Verified"';
    con.query(query,(error,results)=>{
      console.log(res.query);

      if(error){
        res.status(500).send(error);
      }
      else{
        res.json({ message: 'Updated successfully'});
      }
    })
  });

  app.post('api/getCartAcknowledgement', (req,res)=>{
    const{SenderId,ReceiverId,RequestType,Status} = req.body;
    const dateTimeObject = new Date(); 
    query = 'update serviceflow set Status =?';
    con.query(query,[Status],(error,results)=>{
      console.log(res.query);
      if(error){
        res.status(500).send(error);
      }
      else{
        res.json({ message: 'Inserted successfully'});
      }
    })
  });

//ADMIN APIs

// ADMIN LOGIN API
  app.post('/api/AdminLogin',async(req, res) => {
    const { MobileNo} = req.body;
    const dateTimeObject = new Date(); 
    const OTP = Math.floor(100000 + Math.random() * 900000); 
    const message = 'One time password (OTP) is ' + OTP + ' for verification in Service APP. Do not share OTP for security reasons.';
    const encodedString = encodeURIComponent(message);

    try {
      const url = 'https://www.buckfy.in/api/mt/SendSMS?user=gailintr&password=Gail@123&senderid=GAILIN&channel=Trans&DCS=0&flashsms=0&number='+MobileNo+'&text='+ encodedString +'&route=04'; //Replace this with the URL you want to call
      const response = await axios.get(url);

      con.query('select * from AdminLogin where Mobile =  ?',[MobileNo], (error, result) => {
        if (error) {
          throw error;
        } else {
          if(result.length == "1")
          {     
            con.query('update AdminLogin set OTP=?,Verified_ON = ?,Created_On =? where Mobile = ? ',[OTP,dateTimeObject,dateTimeObject,MobileNo], (err, result) => {
              if (err) throw err;
              res.json({ success: true, message: 'OTP sent successfully!' });
            });
          }else{
            res.json({ message: 'You ar not an Admin!'});
          }      
        }
      }) 
  } catch (error) {
    res.json({ message: 'Error calling URL:', error}); 
  }    
    });

 // ADMIN VERIFY OTP
  app.post('/api/AdminVerifyOTP', (req,res) => {
  const { MobileNo,OTP} = req.body;

  con.query('select OTP from AdminLogin where Mobile =  ?',[MobileNo], (error, rows, result) => {
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

  //Admin dashboard services display
  app.get('/api/getAdminDashboardService', (req,res) => {
    const service = req.params.service;
    const query = 'SELECT servicehdr.Serviceid,servicedtl.S_Name,servicedtl.Age,servicedtl.Gender,servicedtl.profession,servicedtl.Pincode,servicehdr.Category,servicedtl.country,servicedtl.City,servicedtl.Area,servicedtl.State,servicedtl.SpecialNote,servicedtl.DocLink,servicedtl.VideoLink,servicedtl.LocationLink,servicedtl.AnySpecialGroup FROM servicehdr INNER JOIN servicedtl ON servicehdr.Serviceid=servicedtl.Serviceid where  servicehdr.S_Status ="Paid" ';
    con.query(query,[service],(error,results) =>{
      if(error){
        res.status(500).send(error);  
      }
      else{
        res.json(results);
      }
    })
  });


  app.post('/api/adminVerified', (req,res)=>{
    const {serviceid} = req.body;
    const query = 'update servicehdr set S_Status = "Verified" where Serviceid = ? ';
    con.query(query,[serviceid],(error,results) => {
      if(error){
        res.status(500).send(error);
      }
      else{
        res.json({ message: 'Verified successfully'});
      }
    })
  });

  app.post('/api/adminReject', (req,res)=>{
    const {serviceid} = req.body;
    const query = 'update servicehdr set S_Status = "Save" where Serviceid = ?';
    con.query(query,[serviceid],(error,results) => {
      if(error){
        res.status(500).send(error);
      }
      else{
        res.json({ message: 'Updated successfully' });
      }
    })
  });



  app.post('/api/clicks',(req,res)=>{
    const { Serviceid } = req.body;
    const query1 ='select Clicks from servicehdr where Serviceid =?'
    con.query(query1,[Serviceid], (error, result) => {
      if (error) {
        throw error;
      } else {  
        console.log('Clicks',result) ;
        const query = 'update servicehdr set Clicks = ? where  Serviceid =?';
        con.query(query,[result[0]['Clicks']+1,Serviceid], (error, result1) => {
          if (error) {
            throw error;
          } else {
            console.log('Clicks',result1) ;
             res.json(result1);
          }
        });
      }
    });
  });
 




  

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
