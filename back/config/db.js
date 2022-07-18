const mysql = require('mysql');

const dbInfo = {
    host: "teraenergy.iptime.org",
    port: "13306",
    user: "mjy",
    password: "mjy2021",
    database: "mjy",
}

let dbcon = {
	init:function() {
		return mysql.createConnection(dbInfo);
	},
	conn:function(con) {
		con.connect(function(err){
		
			if(err) {
				console.log("mysql connection error :"+err);
				setTimeout(init, 2000);

			} else {
				console.log("mysql connection sucessfully");
			}
		})
	}
}

module.exports = dbcon; //모듈 등록