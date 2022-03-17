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



    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template #label>
          <span class="ml-1">
            {{ $t('我同意易点单使用协议') }}
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">
        {{$t('找回密码')}}
      </router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button @click="onsubmit" class="my-0">{{ $t('登录') }}</va-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      phone: '',
      testCode: '',
      code:'',
      agreedToTerms: false,
      phoneErrors: [],
      codeErrors: [],
      agreedToTermsErrors: [],
    }
  },
  methods: {
    onsubmit () {
      this.phoneErrors = this.phone ? [] : ['手机号不能为空']
      this.codeErrors = this.testCode ? [] : ['验证码不能为空']
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['需要同意我们的协议']
      if (!this.formReady) {
        return
      }
      if (!/^[0-9]{11}$/.test(this.phone)) {
        this.$vaToast.init({ message: '输入手机不合法', color: 'warning',duration:2000 })
        return;
      }else{
        if(this.testCode===this.code){
          this.$router.push({ name: 'statistics' })
        }else {
          this.$vaToast.init({ message: '输入验证码错误', color: 'danger',duration:2000 })
          return;
        }
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
      return !(this.phoneErrors.length || this.codeErrors.length || this.agreedToTermsErrors.length)
    },
  },
}
</script>

<style lang="scss">
</style>
