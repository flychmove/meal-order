<template>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-3"
      v-model="ruleForm.name"
      type="name"
      :label="$t('用户名')"
      :error="!!usernameErrors.length"
      :error-messages="usernameErrors"
    />

    <va-input
      class="mb-3"
      v-model="ruleForm.password"
      type="password"
      :label="$t('密码')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <!--    <div class="auth-layout__options d-flex align&#45;&#45;center justify&#45;&#45;space-between">-->
    <!--      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('记住我')"/>-->
    <!--      <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>-->
    <!--    </div>-->

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

    <div>

    </div>
  </form>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        keepLoggedIn: false,
        usernameErrors: [],
        passwordErrors: [],
        ruleForm: {
          name: '',
          password: ''
        },
        agreedToTerms: false,
        agreedToTermsErrors: [],
      }
    },
    computed: {
      formReady () {
        return !this.usernameErrors.length && !this.passwordErrors.length && !this.agreedToTermsErrors.length
      },
    },
    methods: {
      onsubmit () {
        this.usernameErrors = this.ruleForm.name ? [] : ['用户名不能为空']
        this.passwordErrors = this.ruleForm.password ? [] : ['密码不能为空']
        this.agreedToTermsErrors = this.agreedToTerms ? [] : ['需要同意我们的协议']
        if (!this.formReady) {
          return
        }

        //alert('submit!');
        this.axios.post("/login", this.ruleForm).then(res =>{
          console.log(res)
          // console.log(res.data.status)
          // console.log(res.data)
          // console.log(res.data.code)

          if(res===500){
            // alert('用户名不存在')
            this.$vaToast.init({ message: '用户名不存在', color: 'danger',duration:2000 })
          }

          if(res.data.code===200){
            this.$vaToast.init({ message: '登录成功', color: 'success',duration:2000 })
            // alert('登录成功!');
            const jwt = res.data.data.token
            const userInfo = res.data.data
            this.$store.commit("SET_TOKEN",jwt)
            this.$store.commit("SET_USERINFO",userInfo)
            if(res.data.data.status ===0) {
              this.$store.commit("UPDATE_SIDEBAR",'管理员')
            }
            else if(res.data.data.status ===1) {
              this.$store.commit("UPDATE_SIDEBAR",'厨师')
            }
            else if(res.data.data.status ===2) {
              this.$store.commit("UPDATE_SIDEBAR",'服务员')
            }
            this.$router.push({ name: 'tables' })

          }else if(res.data.code===0|| res.code === 0){
            // alert('密码错误')
            this.$vaToast.init({ message: '密码错误', color: 'warning',duration:2000 })
          }
        })
        // console.log(this.$store.getters.getUser)
      } ,      // this.$router.push({ name: 'dashboard' })

    }

  }
</script>
