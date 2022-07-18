const router = require('express').Router();
const board = require('./board');  //board router 호출
// const usersl = require('./user/login');
// const userss = require('./user/signUp');
// const user = require('./user');

router.all('*',(req, res, next)=>{
	console.log("path="+req.path);
	next();
})

router.use("/board",board); //board router 적용
// router.use("/login",usersl); //users/login router 적용
// router.use("/signUp",userss); //users/signUp router 적용

// router.use("/user",user);


router.all('*',(req, res)=>{
	res.status(404).send({success:false, msg:`api unknown uri ${req.path}`});
})

module.exports = router;