<template>

  <div>
    <va-card style="width: 100%">

      <va-card-content>
        <va-data-table :items="orders2" :columns="columns" striped>
          <template #cell(actions)="{ rowIndex }">
            <va-button color="info" class="mr-4" @click="checkDetail(rowIndex)">详情</va-button>
          </template>
        </va-data-table>
      </va-card-content>
    </va-card>

  </div>

  <!-- 弹出框显示订单信息 -->
  <va-modal
    v-model="showModal3"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>订单详情</h2>
    </template>
    <slot>
      <div>
        <div class="row row-equal" style="margin-top: 10px;">
          <va-input
            class="mb-4"
            v-model="mealOrderId"
            label="订单号"
            placeholder="Null"

          >
            <template #prepend>
              <va-h1 style="width: 5rem">订单号</va-h1>
            </template>
          </va-input>

          <va-input
            class="mb-4"
            v-model="time"
            label="时间"
            placeholder="Null"

          >
            <template #prepend>
              <va-h1 style="width: 5rem;margin-left: 10px">时间</va-h1>
            </template>
          </va-input>

          <va-input
            class="mb-4"
            v-model="waiterId"
            label="开单人"
            placeholder="Null"
          >
            <template #prepend>
              <va-h1 style="width: 5rem;">开单人</va-h1>
            </template>
          </va-input>
        </div>

        <div class="va-table-responsive">
          <table class="va-table" style="width: 100%">
            <thead>
            <tr>
              <th>菜品编号</th>
              <th>菜品名称</th>
              <th>菜品单价</th>
              <th>菜品数量</th>
              <th>合计</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="meal in meals" :key="meal.id">
              <td>{{meal.id}}</td>
              <td>{{meal.mealName}}</td>
              <td>{{meal.singlePrice}}</td>
              <td>{{meal.number}}</td>
              <td>{{meal.totalPrice}}</td>
            </tr>
            </tbody>
          </table>
        </div>



        <va-input
          class="mb-4"
          v-model="totalPrice"
          label="价格合计"
          placeholder="Null"
          style="margin-top: 20px;margin-left: 500px"
        >
          <template #prepend>
            <va-h1 style="width: 5rem">价格合计</va-h1>
          </template>
        </va-input>
      </div>
    </slot>
  </va-modal>


</template>

<script>
  import { defineComponent } from 'vue'

  const defaultItem = {
    id: null,
    tableId:null,
    time: null,
    isCompleted:"",
    writerId:"",
    actions:""
  }

  export default defineComponent({
    data () {

      const columns = [
        { key: 'id',label:'订单ID', sortable: true },
        { key: 'tableId', label:'桌号',sortable: true },
        { key: 'time',label:'时间', sortable: true },
        { key: 'isCompleted', label:'是否完成',sortable: true },
        { key: 'writerId', label:'开票人',sortable: true },
        { key: 'actions',label:'操作', width: 80 },
      ]
      return {
        orders:[],
        orders2:[],
        orderidInfo:1,

        meals:[
          {
            id: null,
            mealName: '',
            singlePrice: null,
            number:null,
            totalPrice:null
          }
        ],
        mealOrderId:null,
        time:null,
        tableId:1,
        waiterId:null,
        totalPrice:0,
        orderList:[],

        addOrderInfo:{
          mealOrder:{
            tableId:"",
            isCompleted:""
          },
          orderList:[
            {
              x:null,
              y:null
            }
          ]
        },
        showModal: false,
        showModal2: false,
        showModal3: false,
        columns,
        createdItem: { ...defaultItem },
        updateOrderInfo: {
          mealOrder:{
            tableId:"",
            isCompleted:"",
          },
          orderList:[{
            x:null,
            y:null
          }]
        }

      }
    },
    watch: {
      $route(to,from) {
        location.reload()
      }
    },
    computed: {
      isNewData () {
        return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
      },
    },


    methods: {
      getAll(){
        this.axios.get("/order/list").then(res =>{
          console.log(res.data)
          this.orders = res.data.data;
          for(let i=0;i<res.data.data.length;i++) {
            this.orders2[i] = res.data.data[i].mealOrder;
          }
          for(let i=0;i<this.orders2.length;i++){
            if(this.orders2[i].isCompleted===0){
              this.orders2[i].isCompleted='未完成'
            }else {
              this.orders2[i].isCompleted='已完成'
            }
          }
          for(let i=0;i<this.orders2.length;i++){
            this.axios.get("/user/"+this.orders2[i].writerId).then(res=>{
              // this.orders2[i].writerId=res.data.name
              console.log(res.data)
              this.orders2[i].writerId = res.data.data.name
            })
          }

        })
      },
      onchange(id) {
        console.log(id);
        this.showModal = !this.showModal
        this.orderidInfo = this.orders[id].mealOrder.id
        this.updateOrderInfo.mealOrder.tableId = this.orders[id].mealOrder.tableId
        this.updateOrderInfo.mealOrder.isCompleted = this.orders[id].mealOrder.isCompleted
        this.updateOrderInfo.orderList.x = this.orders[id].orderList.x
        this.updateOrderInfo.orderList.y = this.orders[id].orderList.y
      },
      onDelete(id){
        this.axios.delete("/order/"+id).then(res =>{
          if(res.data.code===200){
            // console.log("删除成功")
            this.$vaToast.init({ message: '删除成功', color: 'success',duration:2000 })
            // this.getAll();
            location.reload()
          }else {
            // console.log("删除失败")
            this.$vaToast.init({ message: '用户名不存在', color: 'danger',duration:2000 })
            // this.getAll();
            location.reload()
          }
        })
      },
      /**更新*/
      handleSubmit () {
        // alert('-- 提交成功 --')

        this.axios.put("/order/"+this.orderidInfo,this.updateOrderInfo).then(res =>{
          console.log("返回了");
          console.log(res.data);
          this.$vaToast.init({ message: '更新成功', color: 'success',duration:2000 })
        })
        this.showModal = !this.showModal
        location.reload();
      },
      /*搜索*/

      addClick(){
        this.showModal2 = !this.showModal2
      },

      addhandleSubmit(e){
        alert('-- 提交成功 --')
        this.axios.post("/order",this.addOrderInfo).then(res =>{
          console.log("返回了")
          console.log(res.data)
        })
        this.showModal2 = !this.showModal2
        location.reload();
      },
      checkDetail(id){
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null

        this.showModal3 = !this.showModal3
        this.tableId = this.orders[id].mealOrder.tableId
        for(let i=0;i<this.orders.length;i++){
          if(this.orders[i].mealOrder.id===this.orders[id].mealOrder.id){
            this.orderList=this.orders[i].orderList

            this.mealOrderId=this.orders[i].mealOrder.id;
            this.time=this.orders[i].mealOrder.time;
            this.waiterId=this.orders[i].mealOrder.writerId;
          }
        }

        for(let i=0;i<this.orderList.length;i++){
          this.axios.get("/meal/"+this.orderList[i].x).then(res=>{
            console.log(res.data.data)
            const meal1 = {
              id: this.orderList[i].x,
              mealName: res.data.data.name,
              // mealName: "11",
              singlePrice: res.data.data.price,
              number:this.orderList[i].y,
              totalPrice:res.data.data.price*this.orderList[i].y
            }
            this.meals.push(meal1)
            this.totalPrice += meal1.totalPrice
          })
        }
        /* console.log(this.meals);
         for (let i=0; i<this.meals.length; i++){
           this.totalPrice = this.totalPrice + this.meals[i].totalPrice
           // console.log("price"+this.totalPrice)
           // console.log("mealprice"+this.meals[i].totalPrice)
         }*/
        // console.log("price"+this.totalPrice)
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

  .mr-4{
    margin-top:20px;
  }

</style>


