<!--
<template>
  <div class="tips">
    <div class="title" style="margin-top: 10px">
      <va-card>
        <va-card-content>
          <h1 style="font-size: large">写公告</h1>
          <va-card-actions align="between">
            <div style="width: 100%">
              <va-input
                class="mb-4"
                v-model="noticeTitleWrite"
              >
                <template #prepend>
                  <va-h1 style="width: 5rem">公告标题</va-h1>
                </template>
              </va-input>
              <va-input
                v-model="tipsContent"
                type="textarea"
                autosize
              />
            </div>
            <va-card class="flex xs12 lg2">
              <va-card-content>
                <va-h1 style="font-size: large">发送给:</va-h1>
                <div class="mb-4">{{ selection }}</div>
                <va-checkbox
                  v-model="selection"
                  array-value="manager"
                  style="margin-top: 5px"
                  label="管理员"
                />
                <va-checkbox
                  v-model="selection"
                  array-value="waiter"
                  style="margin-top: 5px"
                  label="前台服务人员"
                />
                <va-checkbox
                  v-model="selection"
                  array-value="kitchen"
                  style="margin-top: 5px"
                  label="后厨人员"
                />
                <va-button flat :rounded="false" size="large"
                  style="margin-top: 5px" @click="onsubmit">
                  发送
                </va-button>
              </va-card-content>
            </va-card>
          </va-card-actions>
        </va-card-content>
      </va-card>
    </div>

    <div class="recentTips" style="margin-top: 20px">
      <va-h1 style="font-size: large">近期公告</va-h1>
      <va-button style="font-size: large;" @click="more">更多</va-button>

      <div class="row row-equal">
        <div class="flex xs12 lg4" v-for="count in 3">
          <va-card>
            <va-card-title>
              {{notices.title}}
            </va-card-title>
            <va-modal v-model="tipsDetail" :message="tipsDetailMessage"
                      :overlay="false" ok-text="确定" cancel-text="取消"
                      no-outside-dismiss size="large">

              <div class="noticeDetail" style="width: 100%">
                <div class="title" style="width: 100%">
                  <va-input
                    class="mb-4"
                    v-model="noticeTitle"
                  >
                    <template #prepend>
                      <va-h1 style="width: 5rem">公告标题</va-h1>
                    </template>
                  </va-input>
                </div>
                <div class="row row-equal">
                  <div class="flex xs12 lg6">
                    <va-input
                      class="mb-4"
                      v-model="noticeOrder"
                    >
                      <template #prepend>
                        <va-h1 style="width: 3rem">发送者</va-h1>
                      </template>
                    </va-input>
                  </div>
                  <div class="flex xs12 lg6">
                    <va-input
                      class="mb-4"
                      v-model="noticeTime"
                    >
                      <template #prepend>
                        <va-h1 style="width: 2rem">时间</va-h1>
                      </template>
                    </va-input>
                  </div>
                </div>
                <div>
                  <va-input
                    class="mb-4"
                    v-model="noticeContent"
                    type="textarea"
                    autosize
                  >
                    <template #prepend>
                      <va-h1 style="width: 5rem">公告内容</va-h1>
                    </template>
                  </va-input>
                </div>
              </div>

            </va-modal>
            <va-card-actions align="stretch" vertical>
              <va-button @click="tipsDetail = !tipsDetail">详情</va-button>
            </va-card-actions>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'tips',
    data() {
      return {
        noticeTitleWrite: '',
        tipsContent: '',
        selection: ["manager"],
        tipsDetail: false,
        notices: {},

        noticeTitle: '',
        noticeOrder: '',
        noticeTime: '',
        noticeContent: '',
      }
    },
    methods: {
      getAll() {
        this.axios.get("/meal/list").then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      onselect() {
        this.axios.post("/meal/search", this.notices).then(res => {
          console.log(this.notices)
          this.meals = res.data.data
        })
      },
      more() {
        this.$router.push({name: 'tips-all'})
      }
    },
    created() {
      this.getAll();
    },
  }
</script>

<style lang="scss">
  .row-equal {
    height: 100%;
  }

  .flex {
    height: 100%;
  }
</style>
-->

<template>
  <div class="tips">
    <div class="title" style="margin-top: 10px">
      <va-card>
        <va-card-content>
          <h5 class="display-4">写公告</h5>
          <va-card-actions align="between">
            <div style="width: 80%">
              <va-input
                class="mb-4"
                v-model="noticeTitleWrite"
              >
                <template #prepend>
                  <h5 class="display-6"  style="margin-right: 20px">公告标题</h5>
                </template>
              </va-input>
              <va-input
                v-model="tipsContent"
                type="textarea"
                autosize

              >
                <template #prepend>
                  <h5 class="display-6"  style="margin-right: 20px">公告内容</h5>
                </template>
              </va-input>
            </div>
            <va-card class="flex xs12 lg2">
              <va-card-content>
                <va-h1 style="font-size: large">发送给:</va-h1>

                <va-checkbox
                  v-model="selection"
                  array-value= "0"
                  style="margin-top: 20px"
                  label="管理员"
                />
                <va-checkbox
                  v-model="selection"
                  array-value="1"
                  style="margin-top: 5px"
                  label="前台服务人员"
                />
                <va-checkbox
                  v-model="selection"
                  array-value="2"
                  style="margin-top: 5px"
                  label="后厨人员"
                />
                <va-button flat :rounded="false" size="large" style="margin-top: 5px;margin-left: 35px" @click="onsubmit">
                  发送
                </va-button>
              </va-card-content>
            </va-card>
          </va-card-actions>
        </va-card-content>
      </va-card>
    </div>

    <div class="recentTips" style="margin-top: 20px">
      <va-h1 style="font-size: large">近期公告</va-h1>
      <va-button class="mb-4" :rounded="false"  size="medium" @click="more" style="margin-left: 20px;margin-top: 20px">更多</va-button>

      <va-timeline align-top style="min-width: 600px;" class="timelines__horizontal-long__timeline">
        <va-timeline-item active  v-for="notice in notices2">
          <template #before>
            <div
              class="title text--center"
              :style="{color: theme.primary}"
            >
              {{notice.birthdate}}
            </div>
          </template>
          <template #after>
            <va-card
              stripe
              stripe-color="warning"
              class="mb-0"
            >
              <va-card-title>{{notice.title}}</va-card-title>
              <va-card-content>{{notice.detail}}</va-card-content>
            </va-card>
          </template>
        </va-timeline-item>
      </va-timeline>
    </div>
  </div>
</template>

<script>
  import { useGlobalConfig } from 'vuestic-ui'
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'

  export default {
    name: 'tips',
    data() {
      return {
        notices:[],
        notices2:[],
        nowtime:'',
        notice1:'',
        notice2:'',
        notice3:'',
        noticeTitleWrite: '',
        tipsContent: '',
        selection: [],
        tipsDetail: false,
        noticeTitle: '',
        noticeOrder: '',
        noticeTime: '',
        noticeContent: '',
        addNotice:{
          notice:{
            title:"",
            detail:"",
            // eslint-disable-next-line @typescript-eslint/camelcase
            writer_id:null,
            birthdate:''
          },
          list:[],
        },
        stompClient: null
      }
    },
    methods: {
      getAll() {
        this.axios.get("/notice/list").then(res => {
          console.log(res.data)
          this.notices = res.data.data
          this.notices2 = this.notices.slice(0,3)
          this.notice1=this.notices[0]
          this.notice2=this.notices[1]
          this.notice3=this.notices[2]
        })
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.addNotice.notice.writer_id = this.$store.getters.getUser.id
      },
      onsubmit() {
        this.addNotice.notice.title = this.noticeTitleWrite
        this.addNotice.notice.detail = this.tipsContent
        this.getNowFormatDate()
        this.addNotice.notice.birthdate = this.nowtime
        if(this.selection.length===0){
          this.$vaToast.init({ message: '需要选择身份', color: 'warning',duration:2000 })
          return
        }else {
          for(let i=0;i<this.selection.length;i++){
            this.addNotice.list[i] = parseInt(this.selection[i])
          }
          console.log(this.addNotice)
          this.stompClient.send('/app/hello',JSON.stringify(this.addNotice), {})
          this.axios.post("/notice/new", this.addNotice).then(res => {
            if(res.data.code===200){
              console.log("提交成功")
              // alert('提交成功!');
              this.$vaToast.init({ message: '提交成功', color: 'success',duration:2000 })
            }
          })
          this.noticeTitleWrite=""
          this.tipsContent=""
          this.selection = []
          location.reload()
        }

      },
      more() {
        this.$router.push({name: 'tips-all'})
      },
      initWebSocket () {
        this.connection()
      },
      connection () {
        //let WebSocket = require("ws");
        const socket = new SockJS('http://localhost:8081/chat')
        this.stompClient = Stomp.over(socket)
        this.stompClient.connect({}, (frame) => {
          this.stompClient.subscribe('/topic/notices', (notice) => {
            console.log(JSON.parse(notice.body))
            this.notices=[JSON.parse(notice.body),...this.notices]
            this.notices2=[JSON.parse(notice.body),...this.notices2]
            console.log(this.notices)
          })
        })
      },
      /**
       * 获取当前时间
       * 格式YYYY-MM-DD
       */
      getNowFormatDate() {
        var date = new Date();
        var year = date.getFullYear(); //月份从0~11，所以加一
        var dateArr = [date.getMonth() + 1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
        for(var i=0;i<dateArr.length;i++){
          if (dateArr[i] >= 1 && dateArr[i] <= 9) {
            dateArr[i] = "0" + dateArr[i];
          }
        }
        this.nowtime = year+'-'+dateArr[0]+'-'+dateArr[1]+'T'+dateArr[2]+':'+dateArr[3]+':'+dateArr[4];
        console.log('strDate',this.nowtime)
      }
    },
    created() {
      this.getAll();
    },
    mounted () {
      if ('WebSocket' in window) {
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    computed: {
      theme() {
        return useGlobalConfig().getGlobalConfig().colors
      }
    },
  }
</script>

<style lang="scss">
  .row-equal {
    height: 100%;
  }

  .flex {
    height: 100%;
  }
</style>
