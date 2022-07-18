const bcrypt = require('bcrypt');
const db = require('../../../config/db');

const conn =  db.init();

exports.list = (req,res) => { //리스트 모듈
	let ipp = 10;
	let totalCount = 0;
	let block = 10;
	let total_page = 0;
	let page = 1;
	let start = 0;
	let end = ipp;
	let start_page = 1;
	let end_page = block;
	let where = "";

	body = req.query; //get

	if(body.keyword) where += ` AND subject like '%${body.keyword}%' `; 
	sql = ` SELECT  count(*) cnt FROM tb_board WHERE board_code = ? ${where} `;
	conn.query(sql,[body.board_code],(err,data)=>{
		if(err) throw err;
		totalCount = data[0].cnt;

		total_page = Math.ceil(totalCount/ipp);

		if(body.page) page = body.page;
		start = (page - 1) * 10;
		start_page = Math.ceil(page / block);
		end_page = start_page * block;
		
		if(total_page < end_page) end_page = total_page;

		let paging = {
			"totalCount":totalCount
			,"total_page": total_page
			,"page":page
			,"start_page":start_page
			,"end_page":end_page
			,"ipp":ipp
		}

		sql = ` SELECT * FROM tb_board WHERE board_code = ? ${where} ORDER BY num DESC LIMIT ?, ? `; 
		conn.query(sql,[body.board_code, start, end],(err,list)=> {
			if(err) throw err;

			res.send({success:true,list:list,paging:paging});
		}) 
	})
}

exports.add = (req,res) => { //등록 프로세스 모듈
	body = req.body; //전송된 데이터를 받는다.
	sql = " INSERT INTO  tb_board (board_code, subject, cont, id, regdate) values (?, ?, ?, ?,now()) ";
	conn.query(sql,
		[body.board_code
		, body.subject
		, body.cont
		, body.id]
		,(err,result)=>{
		if(err) throw err;

		res.send({success:true});
	})
}

exports.view = (req,res) => {
	body = req.query;
	num = req.params.num;
	sql = " SELECT * FROM tb_board WHERE board_code = ? AND num = ? ";
    
	conn.query(sql,[body.board_code, num],(err,view) => {
		if(err) throw err;
		
		res.send({success:true, view:view});
	})
}

exports.mod = (req,res) => { //수정 모듈
	body = req.body; //post
	sql = " UPDATE tb_board SET subject = ?, cont = ?, editdate = now() WHERE num = ? ";
	conn.query(sql,[body.subject, body.cont, body.num],(err,result) => {
		if(err) throw err;
		res.send({success:true});
	})
}

exports.delete = (req, res) => {   //삭제 모듈
	body = req.query;
	sql = " DELETE FROM tb_board WHERE num = ? ";
	conn.query(sql,[body.num],(err,result) => {
		if(err) throw err;
		res.send({success:true,result:result});
	})
}

exports.login = (req,res) => {
	const user = {
	  'userid': req.body.user.userid,
	  'password': req.body.user.password
	};
	//console.log(user.userid, user.password);
	conn.query('SELECT userid, password FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
	  if (row[0] !== undefined && row[0].userid === user.userid) {
		console.log(row[0]);
		bcrypt.compare(user.password, row[0].password, function (err, res2) {
		  if (res2) {
			res.json({ // 로그인 성공 
			  success: true,
			  message: 'Login successful!'
			})
		  }
		  else {
			res.json({ // 매칭되는 아이디는 있으나, 비밀번호가 틀린 경우            
			  success: false,
			  message: 'Login failed please check your password!' + err
			})
		  }
		})
	  }
	  if (err) {
		res.json({ // 매칭되는 아이디 없을 경우
		  success: false,
		  message: 'Login failed please check your id!'
		})
	  }
	})
	}

	  
	  
exports.signUp = (req,res) => {
	const user = { 
		'userid': req.body.user.userid,
		'name': req.body.user.name,
		'password': req.body.user.password
	};
	conn.query('SELECT userid FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
		if (row[0] == undefined){ //  동일한 아이디가 없을경우,
		const salt = bcrypt.genSaltSync();
		console.log(salt);
		const encryptedPassword = bcrypt.hashSync(user.password, salt);
		console.log(encryptedPassword);
		conn.query('INSERT INTO users (userid,name,password) VALUES ("' + user.userid + '","' + user.name + '","' + encryptedPassword + '")', user, function (err, row2) {
			if (err) throw err;
		});
		res.json({
			success: true,
			message: 'Sing Up Success!'
		})
		}
		else {
		res.json({
			success: false,
			message: 'Sign Up Failed Please use another ID'
		})
		}
		});
	
	};