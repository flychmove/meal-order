<template>
  <div class="row row-equal">
    <div class="flex xs9">
    <va-card>
      <!--<va-card-title>全部公告</va-card-title>-->
      <va-card-content>
        <va-h1 style="font-size: large">全部公告</va-h1>
        <va-button class="mb-4" :rounded="false"  size="medium" @click="back" style="margin-left: 20px;margin-top: 20px">返回</va-button>
        <va-timeline v-bind:id="'a'+notice.id" vertical centered style="min-width: 300px;" v-for="notice in notices">

          <va-timeline-item color="primary" active >
            <template #after>
                  <span
                    class="title title--danger va-timeline-item__text"
                    :style="{color: theme.primary}"
                  >
                    {{ notice.birthdate}}
                  </span>
            </template>
            <template #before>
              <va-card
                stripe
                stripe-color="primary"
              >

                <va-card-title>{{ notice.title }}</va-card-title>
                <va-card-content>{{ notice.detail }}</va-card-content>
                <va-button flat icon="edit" @click="getData(notice.id)" />
                <va-button flat icon="delete" @click="getdeleteid(notice.id)" />
                <va-button flat @click="getTop(notice.id)" v-show="notice.top===0">
                  <i aria-hidden="true" notranslate="" class="va-icon entypo entypo-up-circled"></i>
                </va-button>
                <va-button flat @click="getNotTop(notice.id)" v-show="notice.top===1">
                  <i aria-hidden="true" notranslate="" class="va-icon entypo entypo-down-bold"></i>
                </va-button>
              </va-card>
            </template>
          </va-timeline-item>
        </va-timeline>
      </va-card-content>
    </va-card>
  </div>

    <div class="flex xs3">
      <va-affix :offset-top="100">
        <va-tree-root style="overflow: auto">
          <va-tree-category label="导航栏" style="height: 21rem">
            <va-tree-node class="jump" color="primary" @click="clickNum(notice.id)" v-for="notice in notices">
              {{notice.title.slice(0,9).padEnd(9,"&#8195")}}{{notice.birthdate.slice(0,10)}}
            </va-tree-node>
          </va-tree-category>
        </va-tree-root>
      </va-affix>
    </div>

    <va-modal v-model="tipsDetail"
              :overlay="false"
              hide-default-actions
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

<!--        <va-card class="flex xs12 lg12">-->
<!--          <va-card-content>-->
<!--            <va-h1 style="font-size: large">发送给:</va-h1>-->
<!--            <div class="mb-4">{{ selection }}</div>-->
<!--            <va-checkbox-->
<!--              v-model="selection"-->
<!--              array-value= "0"-->
<!--              style="margin-top: 5px"-->
<!--              label="管理员"-->
<!--            />-->
<!--            <va-checkbox-->
<!--              v-model="selection"-->
<!--              array-value="1"-->
<!--              style="margin-top: 5px"-->
<!--              label="前台服务人员"-->
<!--            />-->
<!--            <va-checkbox-->
<!--              v-model="selection"-->
<!--              array-value="2"-->
<!--              style="margin-top: 5px"-->
<!--              label="后厨人员"-->
<!--            />-->

<!--          </va-card-content>-->
<!--        </va-card>-->

        <div style="margin-top: 10px">
          <va-button class="mr-4" @click="cancelMeal">取消</va-button>
          <va-button class="mr-4" @click="submitEdit()">确定</va-button>
        </div>
      </div>

    </va-modal>
  </div>


</template>

<script>
  import { useGlobalConfig } from 'vuestic-ui'
  import SockJS from 'sockjs-client'
  import Stomp from 'webstomp-client'

  export default {
    name: 'tips-all',
    data() {
      return {
        nowtime: '',
        tipEditId:null,
        tipDeleteId:null,
        tipsContent: '',
        tipsDetail: false,
        notices: {},
        // selection: ["0"],
        noticeTitle: '',
        noticeOrder: '',
        noticeTime: '',
        noticeContent: '',
        birthdate:'',
        editNotice:{
          title:'',
          // eslint-disable-next-line @typescript-eslint/camelcase
          writer_id:null,
          birthdate:''
        },

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
      }
    },
    methods: {
      getAll() {
        this.axios.get("/notice/list").then(res => {
          console.log(res.data)
          this.notices = res.data.data
        })
      },
      back() {
        this.$router.push({name: 'tables'})
      },
      getdeleteid(id) {
        /*console.log(id);
        this.deleteMeal = !this.deleteMeal
        this.deleteId = id;*/
        this.axios.delete("/notice/"+id).then(res=>{
          this.$vaToast.init({ message: '删除成功', color: 'success',duration:2000 })
          console.log(res.data)
          this.getAll();
        })
      },
      getData(id) {

        this.axios.get("/notice/"+id).then(res=>{
          console.log(res.data)
          this.tipEditId = id;
          const tmp = res.data.data;
          this.tipsDetail = !this.tipsDetail
          this.noticeTitle = tmp.title
          this.noticeContent = tmp.detail
          this.birthdate = tmp.birthdate
          // for(let i=0;i<tmp.)
        })
      },
      getTop(id) {
        this.axios.get("/notice/setTop/"+id).then(res=>{
          console.log(res.data.data)
          this.getAll()
          console.log(res.data.data)
        })
      },
      getNotTop(id) {
        this.axios.get("/notice/setNotTop/"+id).then(res=>{
          console.log(res.data.data)
          this.getAll()
          console.log(res.data.data)
        })
      },
      submitEdit(){
        this.addNotice.notice.title = this.noticeTitle
        this.addNotice.notice.detail = this.noticeContent
        this.getNowFormatDate()
        this.addNotice.notice.birthdate = this.nowtime
        console.log(this.nowtime)
        this.axios.put("/notice/xiugai/"+this.tipEditId, this.addNotice).then(res => {
          if(res.data.code===200){
            console.log("提交成功")
            this.tipsDetail = false;
          }
          else {
            this.$vaToast.init({ message: '提交失败', color: 'danger',duration:2000 })
          }
        })
        location.reload()
      },
      cancelMeal() {
        this.tipsDetail = false;
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
      },
      clickNum(id) {
        document.querySelector('#a' + id).scrollIntoView()
      },
    },

    created() {
      this.getAll();
    },
    computed: {
      theme() {
        return useGlobalConfig().getGlobalConfig().colors
      }
    },
  }
</script>

<style scoped>
  .jump {
    cursor: pointer;
  }

  .jump :hover {
    background-color: #5b9bd23d;
  }
</style>
