<template>
  <div class="login-form" style="width: 100%;height: 100%;display: flex;  align-items: center;justify-content: center;">
    <Form ref="formValidate" :model="loginForm" :rules="loginFormRule" :label-width="60"
          style="height: 210px;padding: 20px;border-radius: 10px;box-shadow: 0 2px 3px 2px rgba(255, 255, 255, .2);background: rgba(255,255,255,.8)">
      <h3 style="margin-bottom: 10px">收银后台管理系统</h3>
      <FormItem label="用户名" prop="username">
        <Input v-model="loginForm.username" placeholder="请输入用户名" style="width: 180px"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="loginForm.password" placeholder="请输入密码" style="width: 180px"></Input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleSubmit('formValidate')">
          登录
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginFormRule:{
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        const _this = this;
        _this.$refs[name].validate((valid) => {
          if (valid) {
            let params = {
              'service':this.Api.CASH_CMS_AUTHOR_AUTHOR_LOGIN,
              'data': {
                projectName: _this.loginForm.username,
                projectPwd:_this.loginForm.password
              }
            }
            _this.$http.post(_this.Api.CASH_CMS_AUTHOR_AUTHOR_LOGIN, params).then(res => {
              if (res.success) {
                sessionStorage.setItem("projectId",res.data.project_id);
                sessionStorage.setItem("projectName",res.data.project_name);
                _this.$router.push('/index')
              } else {
                _this.$Message.error(res.message);
              }
            })
          }
        })
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .login-form {
    background-image: url('../../assets/login.jpg')
  }
</style>
