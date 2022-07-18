var express = require('express');
var router = express.Router();
const db = require('../config/db');
const conn =  db.init();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





// router.all('*',(req, res)=>{
// 	res.status(404).send({success:false, msg:`api unknown uri ${req.path}`});
// })

module.exports = router;
