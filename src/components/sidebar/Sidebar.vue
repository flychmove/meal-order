<template>
  <va-sidebar
    :width="width"
    :minimized="minimized"
    :minimizedWidth="minimizedWidth"
  >
    <menu-minimized v-if="minimized" :items="siderItem" />
    <menu-accordion v-else :items="siderItem" />
  </va-sidebar>
</template>

<script>
  import { useGlobalConfig } from 'vuestic-ui';
  import MenuAccordion from './menu/MenuAccordion.vue';
  import MenuMinimized from './menu/MenuMinimized.vue';

  import NavigationRoutes from './NavigationRoutes';
  import WaiterRoutes from './WaiterRoutes';
  import CookRoutes from './CookRoutes';

  export default {
    name: "app-sidebar",
    components: {
      MenuAccordion,
      MenuMinimized,
    },
    props: {
      width: { type: String, default: '16rem' },
      color: { type: String, default: "secondary" },
      minimized: { type: Boolean, required: true },
      minimizedWidth: {
        type: Boolean,
        required: false,
        default: undefined
      },
    },
    data() {
      return {
        siderItem: null,
        navigationItems: NavigationRoutes.routes,
        waiterItems: WaiterRoutes.routes,
        cookItems: CookRoutes.routes,
      };
    },
    computed: {
      computedClass() {
        return {
          "app-sidebar--minimized": this.minimized
        };
      },
      colors() {
        return useGlobalConfig().getGlobalConfig().colors
      },
    },
    methods: {
      getNav() {
        console.log(sessionStorage.getItem("sideBar"));

        if(sessionStorage.getItem("sideBar") === '厨师') {
          this.siderItem = this.cookItems;
        }
        if(sessionStorage.getItem("sideBar") === '服务员') {
          this.siderItem = this.waiterItems;
        }
        if(sessionStorage.getItem("sideBar") === '管理员') {
          this.siderItem = this.navigationItems;
        }
      }
    },
    created() {
      this.getNav();
    }
  };
</script>

<style lang="scss">
  .va-sidebar {
    .va-collapse__body {
      margin-top: 0 !important;
    }

    &__menu {
      padding: 2rem 0;
      &__inner {
        padding-bottom: 8rem;
      }
    }

    &-item {
      &-content {
        padding: 0.75rem 1rem;
      }

      &__icon {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .va-sidebar {
    flex-shrink: 0;
  }

  // .va-sidebar--minimized {
  //   width: auto !important;
  // }
</style>
