import { createStore } from 'vuex'
import Vue, {createApp} from 'vue'
import Vuex from 'vuex'
import App from "@/App.vue";



export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',

  state: {
    isSidebarMinimized: false,
    userName: 'Vasili S',
    token: '',
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    userInfo: JSON.parse(<string > sessionStorage.getItem("userInfo")),
    name:'WJC',
    sideBar: '管理员',
    orderNum:0,
    orderPrice:0,
    noticeUnRead:0,
  },
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    changeUserName(state, newUserName) {
      state.userName = newUserName
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    update_noticeUnRead(state,num) {
      state.noticeUnRead = num;
      sessionStorage.setItem("noticeUnRead",num)
    },
    UPDATE_ORDERSPRICE:(state, orderPrice) => {
      state.orderPrice = orderPrice
      sessionStorage.setItem("orderPrice",orderPrice)
    },
    UPDATE_ORDERSNUM:(state, orderNum) => {
      state.orderNum = orderNum
      sessionStorage.setItem("orderNum",orderNum)
    },
    UPDATE_SIDEBAR:(state, sideBar) => {
      state.sideBar = sideBar
      sessionStorage.setItem("sideBar",sideBar)
    },
    SET_TOKEN:(state, token) => {
      state.token = token
      localStorage.setItem("token",token)//保存到本地缓存
    },
    SET_USERINFO:(state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))//保存本次会话（用户登录）缓存
    },
    REMOVE_INFO:(state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    }
  },
  getters: {//get
    getUser: state => {
      return state.userInfo
    },
    getSideBar: state => {
      return state.sideBar
    },
    getOrdersNum: state => {
      return state.orderNum
    },
    getOrdersPrice: state => {
      return state.orderPrice
    },
    getNoticeUnRead:state => {
      return state.noticeUnRead
    },
  },
  actions: {
  },
  modules: {
  }
})
