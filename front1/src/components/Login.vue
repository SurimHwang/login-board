<template>
    <div>
        <h1>Login</h1>

        <div class="input_row">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="user.userid">
        </div>
        <div class="input_row">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="user.password"><br>
        </div>
        <!--<button @click="login">로그인</button>
        <a href="/signUp">가입하기</a>
        <li><router-link to="/board/list">게시판</router-link></li>
        -->
        <br>
        <div>
        <a @click="login" class="btn">login</a><router-link to="/SignUp">&nbsp;&nbsp;sign up</router-link>
        </div>
    </div>
</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'login',
    
    data() {
        return {
            user: {
            userid: '',
            password: ''
            }
        }
    }
        ,methods: {
            // eslint-disable-next-line no-unused-vars
            login: function (event) {
                
                this.$axios.post('http://localhost:3000/api/board/login', {                
                user: this.user
                })
                .then(
                // eslint-disable-next-line no-unused-vars
                (res) => {  //로그인 성공
                    alert('로그인 성공');
                    this.$router.push({path:'./board/list',query:this.body}); 
                    //게시판리스트 페이지로 이동
                },
                // eslint-disable-next-line no-unused-vars
                (err) => { // error 를 보여줌
                    alert('Login failed! '+ err);
                })
                .catch(err => {
                alert(err);
                })
            }
            },
            
            }
           


</script>

<style>

</style>