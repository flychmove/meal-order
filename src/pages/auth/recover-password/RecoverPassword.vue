<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      class="mb-3"
      v-model="phone"
      :label="$t('手机号')"
      :error="!!phoneErrors.length"
      :error-messages="phoneErrors"
    />

    <div class="row row-equal">
      <va-input
        class="mb-3"
        v-model="testCode"
        :label="$t('验证码')"
        style="width: 70%"
        :error="!!codeErrors.length"
        :error-messages="codeErrors"
      />

      <va-button class="mb-4" size="medium" style="margin-left: 30px;max-width: 130px" @click="getTestCode"> 获取验证码 </va-button>
    </div>

    <va-input
      class="mb-3"
      v-model="password"
      type="password"
      :label="$t('输入新密码')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <va-input
      class="mb-3"
      v-model="newPassword"
      type="password"
      :label="$t('请再次确认密码')"
      :error="!!newPasswordErrors.length"
      :error-messages="newPasswordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button @click="onsubmit" class="my-0">{{ $t('修改密码并登录') }}</va-button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'recover-password',
    data () {
      return {
        phone: '',
        testCode: '',
        code:'',
        password:'',
        newPassword:'',
        phoneErrors: [],
        codeErrors: [],
        passwordErrors: [],
        newPasswordErrors: [],
        resetpass: {
          phone:'',
          password:''
        }

      }
    },
    methods: {
      onsubmit () {
        this.phoneErrors = this.phone ? [] : ['手机号不能为空']
        this.codeErrors = this.testCode ? [] : ['验证码不能为空']
        this.passwordErrors = this.password ? [] : ['新密码不能为空']
        this.newPasswordErrors = this.newPassword ? [] : ['确认密码不能为空']
        if (!this.formReady) {
          return
        }
        if (!/^[0-9]{11}$/.test(this.phone)) {
          this.$vaToast.init({ message: '输入手机不合法', color: 'warning',duration:2000 })
          return;
        }else if(this.testCode!==this.code){
          this.$vaToast.init({ message: '输入验证码错误', color: 'danger',duration:2000 })
          return;
        }else if(this.password!==this.newPassword){
          this.$vaToast.init({ message: '两次密码输入不相同', color: 'warning',duration:2000 })
          return;
        }else {
          //写修改密码请求
          this.resetpass.phone = this.phone;
          this.resetpass.password = this.password;
          console.log(this.password);
          this.axios.post("/resetpassword?phone=",this.resetpass).then(res=>{
            if(res.data.code===200){
              this.$vaToast.init({ message: '密码修改成功，登录成功', color: 'success',duration:2000 })
              this.$router.push({ name: 'statistics' })
            }else {
              this.$vaToast.init({ message: '密码修改失败，登录失败', color: 'danger',duration:2000 })
            }
          })
        }

      },
      getTestCode(){
        if (!/^[0-9]{11}$/.test(this.phone)) {
          this.$vaToast.init({ message: '输入手机不合法', color: 'warning',duration:2000 })
          return;
        }else {
          this.axios.post("/code/sendCode","+86"+this.phone).then(res=>{
            console.log(res.data.code)
            if(res.data.code===200){
              this.code=res.data.data
              this.$vaToast.init({ message: '验证码发送成功', color: 'success',duration:2000 })
            }else if(res.data.code===0){
              this.$vaToast.init({ message: res.data.message, color: 'warning',duration:2000 })
            }
          })
        }
      }
    },
    computed: {
      formReady () {
        return !(this.phoneErrors.length || this.codeErrors.length || this.passwordErrors.length || this.newPasswordErrors.length)
      },
    },
  }
</script>

<style lang="scss">
</style>
