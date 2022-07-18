var express = require('express');
var router = express.Router();
const api = require("./api"); //api router 호출

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("path="+req.path);
  next();
});

router.use("/api",api); //api router 적용
//router.use("/users", require("./users"));


//router.use("/users/login", require("./users"));
//router.use("/users/signUp", require("./users"));

router.all('/',(req,res)=>{
  res.send("{message:welcome}");
})

module.exports = router;