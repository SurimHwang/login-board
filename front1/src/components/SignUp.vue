<template>
    <div>
        <h1>Sign Up</h1>

        <div class="input_row">
        <label for="id">아이디</label>
            <input type="text" id="id" v-model="user.userid">
        </div>
        <div class="input_row">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="user.name">
        </div>
        <div class="input_row">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password">
        </div>
        <!--<button @click="signUp">가입하기</button>-->
        <br>
        <a @click="signUp" class="btn">Sign Up</a>
    </div>

</template>

<script>
export default {
  name: 'SignUp',
  
  data() {
    return {
      user: {
        userid: '',
        name: '',
        password: ''
      }
  }
  }
  , methods: {
  signUp: function(event) {
    
    this.$axios.post('http://localhost:3000/api/board/signUp', {
      user: this.user
      })
    .then(
      (res) => {
      if (res.data.success) {
        alert(res.data.message);
        this.$router.push('/login') 
      } else
        alert(error);
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
}
</script>

<style scoped>
</style>