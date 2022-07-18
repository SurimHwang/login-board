const router = require('express').Router();
const dao = require('./dao');

router.post("/login",dao.login);

router.post("/signUp", dao.signUp);

router.get("/",dao.list);

router.get('/:num',dao.view);

router.post("/",dao.add);

router.put('/',dao.mod);

router.delete('/',dao.delete); //삭제 모듈 추가

router.all('*',(req, res)=> {
	res.status(404).send({success:false, msg:'board unknown uri ${req.path}'});
})

module.exports = router;