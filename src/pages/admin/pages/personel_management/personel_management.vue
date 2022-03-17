

<template>

  <div >

    <va-card style="width: 100%">

      <va-card-content>
        <div class="search" style="width: 100%;">
          <va-input
            class="mb-4"
            v-model="searchInfo"
          >
            <template #prependInner>
              <va-icon
                name="search"
              />
            </template>


            <template #appendInner>
              <va-button style="margin-right: 0;width: 80px"
                flat @click="onsubmit">{{ $t('搜索') }}
              </va-button>
            </template>
          </va-input>
        </div>
        <va-data-table :items="users" :columns="columns" striped>
          <template #headerAppend>
            <tr class="table-example--slot">
              <th
                v-for="key in Object.keys(createdItem)"
                :key="key"
                colspan="1"
              >
                <va-input
                  :placeholder="null"
                  v-model="createdItem[key]"
                />
              </th>
              <th colspan="1">
                <va-button
                  @click="handleAddSubmit"
                  :disabled="!isNewData"
                >
                  添加
                </va-button>
              </th>
            </tr>
          </template>

          <template #cell(actions)="{ rowIndex }">
            <va-button flat icon="edit" @click="onchange(rowIndex)" />
            <va-button flat icon="delete" @click="onDelete(users[rowIndex].id)" />
          </template>
        </va-data-table>

        <va-modal
          v-model="showModal"
          hide-default-actions
          overlay-opacity="0.2"
        >
          <template #header>
            <h2>修改信息</h2>
          </template>
          <slot>
            <div>
              <va-form
                style="width: 300px;"
                tag="form"
              >
                <va-input
                  class="mt-3"
                  v-model="userInfo.name"
                  label="用户名"
                />

                <div style="width: 100%;margin-top: 20px">
                  <va-select
                    class="mb-4"
                    label="选择身份"
                    :options="options"
                    v-model="valueSingle"
                  />
                </div>

                <va-input
                  class="mt-3"
                  v-model="userInfo.phone"
                  label="手机号"
                />



              </va-form>
            </div>
          </slot>
          <template #footer>
            <va-button @click="handleSubmit">
              提交修改
            </va-button>
          </template>
        </va-modal>
      </va-card-content>
    </va-card>


  </div>


</template>

<script>
  import { defineComponent } from 'vue'

  const defaultItem = {
    name: '',
    status: '',
    phone:''
  }

  export default defineComponent({
    data () {

      const columns = [
        { key: 'name',label:'名字', sortable: true },
        { key: 'status',label:'身份', sortable: true },
        { key: 'phone',label:'手机号', sortable: true },
        { key: 'actions',label:'操作', width: 80 },
      ]
      return {
        options:['管理员','厨师','服务员'],
        valueSingle:'',
        users:[],
        useridInfo:1,
        userInfo:{
          name:"",
          status: "",
          phone:""
        },
        userAddInfo:{
          name:"",
          password:"",
          status: "",
          phone:""
        },
        showModal: false,
        columns,
        createdItem: { ...defaultItem },
      }
    },
    computed: {
      isNewData () {
        return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
      },
    },


    methods: {
      getAll(){
        this.axios.get("/user/list").then(res =>{
          console.log(res.data)
          this.users=res.data.data
          for(let i=0;i<this.users.length;i++){
            if(this.users[i].status===0){
              this.users[i].status="管理员"
            }else if(this.users[i].status===1){
              this.users[i].status="厨师"
            }else {
              this.users[i].status="服务员"
            }
          }

        })
      },
      onchange(id) {
        console.log(id);
        this.showModal = !this.showModal
        this.useridInfo = this.users[id].id
        this.userInfo.name = this.users[id].name
        this.userInfo.status = this.users[id].status
        this.userInfo.phone = this.users[id].phone
        this.valueSingle = this.users[id].status
      },
      onDelete(id){
        this.axios.delete("/user/"+id).then(res =>{
          if(res.data.code===200){
            // console.log("删除成功")
            this.$vaToast.init({ message: '删除成功', color: 'success',duration:2000 })
            this.getAll();
          }else {
            // console.log("删除失败")
            this.$vaToast.init({ message: '删除失败', color: 'danger',duration:2000 })
            this.getAll();
          }
        })
      },
      /**修改*/
      handleSubmit (e) {
        // alert('-- 提交成功 --')
        // if(this.userInfo.status!=='管理员'&&this.userInfo.status!=='厨师'&&this.userInfo.status!=='服务员'){
        //   this.$vaToast.init({ message: '输入身份不合法，请输入：管理员、厨师、服务员', color: 'warning',duration:2000 })
        //   return
        // }
        if (!/^[0-9]{11}$/.test(this.userInfo.phone)) {
          this.$vaToast.init({ message: '输入手机不合法', color: 'warning',duration:2000 })
          return;
        }else {
          if(this.valueSingle==="管理员"){
            this.userInfo.status="0"
          }else if(this.valueSingle==="厨师"){
            this.userInfo.status="1"
          }else if(this.valueSingle==="服务员"){
            this.userInfo.status="2"
          }
          this.axios.put("/user/"+this.useridInfo,this.userInfo).then(res =>{
            console.log("返回了");
            console.log(res.data);
            this.$vaToast.init({ message: '修改成功', color: 'success',duration:2000 })
          })
          this.showModal = !this.showModal
          location.reload()
        }
      },
      /*搜索*/
      onsubmit(){
        if(this.searchInfo===""){
          location.reload()
        }else {
          this.axios.post("/user/search",this.searchInfo).then(res=>{
            this.users = res.data.data
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].status===0){
                this.users[i].status="管理员"
              }else if(this.users[i].status===1){
                this.users[i].status="厨师"
              }else {
                this.users[i].status="服务员"
              }
            }
          })
        }
      },
      handleAddSubmit(e){
        if(this.createdItem.status!=='管理员'&&this.createdItem.status!=='厨师'&&this.createdItem.status!=='服务员'){
          this.$vaToast.init({ message: '输入身份不合法，请输入：管理员、厨师、服务员', color: 'warning',duration:2000 })
          return
        }
        if (!/^[0-9]{11}$/.test(this.createdItem.phone)) {
          this.$vaToast.init({ message: '输入手机不合法', color: 'warning',duration:2000 })
          return;
        }else {
          if(this.createdItem.status==="管理员"){
            this.createdItem.status="0"
          }else if(this.createdItem.status==="厨师"){
            this.createdItem.status="1"
          }else if(this.createdItem.status==="服务员"){
            this.createdItem.status="2"
          }
          this.userAddInfo.id = this.createdItem.id
          this.userAddInfo.name = this.createdItem.name
          this.userAddInfo.status = this.createdItem.status
          this.userAddInfo.phone = this.createdItem.phone
          this.userAddInfo.password=this.userAddInfo.phone
          this.axios.post("/user/new",this.userAddInfo).then(res =>{
            console.log("返回了")
            console.log(res.data)
            this.$vaToast.init({ message: '添加成功', color: 'success',duration:2000 })
          })
        }
        location.reload()
      },
      back(){
        location.reload()
      },
    },
    created() {
      this.getAll();
    }
  })
</script>

<style lang="scss" scoped>
  .table-example--slot {
    th {
      padding-top: 5px;
      padding-bottom: 5px;
      vertical-align: middle;
    }
  }
</style>


