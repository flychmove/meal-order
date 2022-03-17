<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    position="bottom"
    :offset="[0, 13]"
  >
    <template #anchor>
      <span class="profile-dropdown__anchor">
        <slot/>
        <va-icon
          class="px-2"
          :name="isShown ? 'angle_up' :'angle_down'"
          :color="theme.primary"
        />
      </span>
    </template>
    <va-dropdown-content class="profile-dropdown__content">
      <va-list-item
        v-for="option in options"
        :key="option.name"
      >
        <router-link
          :to="{name: option.redirectTo}"
          class="profile-dropdown__item" @click.native="choice(option.name)"
        >
          {{ $t(`${option.name}`) }}
        </router-link>
        <!--<div @click="choice(option.name)">{{ $t(`${option.name}`) }}</div>-->
      </va-list-item>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
  import { useGlobalConfig } from 'vuestic-ui'

  export default {
    name: 'profile-section',
    data () {
      return {
        isShown: false,
        options:
          [
            {
              name: '管理员页',
              redirectTo: 'statistics',
            },
            {
              name: '后厨页',
              redirectTo: 'main',
            },
            {
              name: '前台服务员页',
              redirectTo: 'orderMeal',
            },
            {
              name: '退出',
              redirectTo: 'login',
            },
          ],
      }
    },
    props: {

    },
    methods: {
      choice(op) {
        if(op ==='管理员页') {
          this.$store.commit("UPDATE_SIDEBAR",'管理员');
          //location.reload();
          //this.router.push({name:'statistics'})
        }
        if(op ==='后厨页') {
          this.$store.commit("UPDATE_SIDEBAR",'厨师');
          //location.reload();
          //this.router.push("/cook/main")
        }
        if(op ==='前台服务员页') {
          this.$store.commit("UPDATE_SIDEBAR",'服务员');
          //location.reload();
          //this.router.push({name:'orderMeal'})
        }
        if(op==='退出'){
          this.axios.get("/logout").then(res=>{
            console.log(res);
            if(res.data.code===200){
              alert('退出成功!')
            }
          });
          this.router.push("/login")
        }
        console.log(this.$store.getters.getSideBar);
        //this.$router.go(0);
      }
    },
    computed: {
      theme() { return useGlobalConfig().getGlobalConfig() },
    },

    created() {
      if(this.$store.getters.getUser.status===0){
        this.options=[{
          name: '管理员页',
          redirectTo: 'statistics',
        },
          {
            name: '后厨页',
            redirectTo: 'main',
          },
          {
            name: '前台服务员页',
            redirectTo: 'orderMeal',
          },
          {
            name: '退出',
            redirectTo: 'login',
          },]
      }else if(this.$store.getters.getUser.status===1){
        this.options=[
          {
            name: '后厨页',
            redirectTo: 'main',
          },
          {
            name: '退出',
            redirectTo: 'login',
          },]
      }else if(this.$store.getters.getUser.status===2){
        this.options=[
          {
            name: '前台服务员页',
            redirectTo: 'orderMeal',
          },
          {
            name: '退出',
            redirectTo: 'login',
          },]
      }
    }

  }
</script>

<style lang="scss">

  .profile-dropdown {
    cursor: pointer;

    .va-dropdown-popper__anchor {
      display: flex;
      justify-content: flex-end;
    }

    &__content {
      width: 8rem;
    }

    &__item {
      display: block;
      color: var(--va-gray);

      &:hover,
      &:active {
        color: var(--va-primary);
      }
    }

    .va-dropdown__anchor {
      display: inline-block;
    }
  }
</style>
