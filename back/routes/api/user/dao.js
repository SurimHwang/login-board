// const db = require('../../../config/db');
// const conn =  db.init();

// exports.signUp = (req,res) => {
//   const user = {
//     'userid': req.body.user.userid,
//     'name': req.body.user.name,
//     'password': req.body.user.password
//   };
//   conn.query('SELECT userid FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
//     if (row[0] == undefined){ //  동일한 아이디가 없을경우,
//       const salt = bcrypt.genSaltSync();
//       const encryptedPassword = bcrypt.hashSync(user.password, salt);
//       conn.query('INSERT INTO users (userid,name,password) VALUES ("' + user.userid + '","' + user.name + '","' + encryptedPassword + '")', user, function (err, row2) {
//         if (err) throw err;
//       });
//       res.json({
//         success: true,
//         message: 'Sing Up Success!'
//       })
//     }
//     else {
//       res.json({
//         success: false,
//         message: 'Sign Up Failed Please use another ID'
//       })
//     }
//    });
// }
