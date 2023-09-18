const db_con = require('../model/db');
var express = require('express');
var router = express.Router();
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');       

// db_con.connect((err) => {
//     if (err) throw (err) => {
//       console.log("Database Connection Failed !!!", err);
//       return;
//     }
  
//     console.log("We are connected to Mark database");
  
//     // This query will be used to select columns
//     let query = 'SELECT * FROM tbl_users';
  
//     db_con.query(query, (err, rows) => {
//         if(err) throw err;
  
//         console.log(rows);
//     });
// });

// ... (other imports and code)

router.post('/login', loginValidation, (req, res, next) => {
  db_con.query(
    `SELECT * FROM tbl_users WHERE Username = ${db_con.escape(req.body.username)} AND Password = ${db_con.escape(req.body.password)} `,
    (err, result) => {
     
      if (err) {
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      //check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        ( bResult) => { // Define bErr as a parameter here
          // wrong password
          // if (bErr) {
          //   return res.status(401).send({
          //     msg: 'Email or password is incorrect!'
          //   });
          // }
          
           if (bResult) {
            const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secret', { expiresIn: '1h' });
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

module.exports = router;
