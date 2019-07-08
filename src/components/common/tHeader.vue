<template>
  <div style="float: right;">
    <Dropdown class="userBox" slot='right' @on-click="clickItem">
      <Avatar icon="person"/>
      <a href="javascript:void(0)">
        {{projectName}}
        <Icon type="arrow-down-b"></Icon>
      </a>
      <Dropdown-menu slot="list">
        <Dropdown-item name="editPassword">修改密码</Dropdown-item>
        <Dropdown-item name="logout">退出登录</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
    <Modal
      v-model="passwordModal"
      title="修改密码"
      :loading="editPassLoading"
      @on-ok="editPass('editPassValidate')"
       @on-visible-change="handleReset('editPassValidate')">
      <Form :label-width="124" :rules="editPassRule" :model="pwd" ref="editPassValidate">
        <FormItem label="请输入密码：" prop="oldPwd" :label-width="150">
          <Input type="password" style="width:240px;" placeholder="请输入旧密码" v-model="pwd.oldPwd"></Input>
        </FormItem>
        <FormItem label="请输入新密码：" prop="newPwd" :label-width="150">
          <Input type="password" style="width:240px;" placeholder="请输入新密码" v-model="pwd.newPwd"></Input>
        </FormItem>
        <FormItem label="请再次确认新密码：" prop="newPwdC" :label-width="150">
          <Input type="password" style="width:240px;" placeholder="请再次确认密码" v-model="pwd.newPwdC"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "t-header",
    data(){
      return {
        projectName:sessionStorage.getItem('projectName'),
        passwordModal:false,
        editPassLoading:true,
        pwd:{
          projectId:sessionStorage.getItem('projectId'),
          oldPwd:"",
          newPwd:"",
          newPwdC:"",
        },
        editPassRule: {
          oldPwd: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '最少输入6个字符', trigger: 'change'}
          ],
          newPwd: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '最少输入6个字符', trigger: 'change'}
          ],
          newPwdC: [{required: true, message: '请再次输入新密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '最少输入6个字符', trigger: 'change'},
          {validator:this.validatePwd, trigger: 'blur'}
          ]
        },
      }

    },
    methods: {
      clickItem(name) {
       if(name == "editPassword"){
         this.passwordModal = true;
       }else {
        let params = {
          'service':this.Api.CASH_CMS_AUTHOR_AUTHOR_LOGINOUT,
          'data':{}
        };
        var I=this;
        this.$Modal.confirm({
          title:'退出登录',
          content:'确定要退出登录吗？',
          onOk(){
            this.$http.post(this.Api.CASH_CMS_AUTHOR_AUTHOR_LOGINOUT, params).then(res => {
              if (res.success) {
                I.$router.push({
                  path: '/login',
                })
              }
            })
            
          }
        })
       }
      },
      editPass(name) {
        let params = {
          'service':this.Api.CASH_CMS_AUTHOR_AUTHOR_UPDATEPWD,
          'data':this.pwd
        };
        this.$refs[name].validate((valid) => {
          if (!valid) {
            return this.changeLoading('editPass');
          }
          this.changeLoading('editPass');
          this.passwordModal = false;
          this.$http.post(this.Api.CASH_CMS_AUTHOR_AUTHOR_UPDATEPWD, params).then(res => {
            if (res.success) {
              this.$refs[name].resetFields();
              this.$Message.success(res.message);
              var I=this;
              setTimeout(function(){
                I.$router.push({
                  path: '/login',
                })
              },500)
            }
          })

        })
      },
      validatePwd (rule, value, callback){  //校验两次输入密码是否一致
       if (value!=this.pwd.newPwd){
            callback('两次输入不一致');
        } else {
            callback();
        }   
      },
      handleReset(name){
        this.$refs[name].resetFields();
      },
      changeLoading(type){  //改变modal的loading状态
        this[type+'Loading'] = false;
        this.$nextTick(() => {
          this[type+'Loading'] = true; 
        })
      }
    }
  }
</script>

<style scoped>

</style>
