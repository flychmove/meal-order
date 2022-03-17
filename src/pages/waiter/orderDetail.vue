<template>
  <div>
    <va-card style="width: 100%">
      <va-card-content>

        <va-tabs
          stateful
          grow
        >
          <template #tabs>
            <va-tab
              label="一号桌"
              name="icon1"
              @click="change1"
            />

            <va-tab
              label="二号桌"
              name="icon2"
              @click="change2"
            />
            <va-tab
              label="三号桌"
              name="icon3"
              @click="change3"
            />
            <va-tab
              label="四号桌"
              name="icon4"
              @click="change4"
            />
            <va-tab
              label="五号桌"
              name="icon5"
              @click="change5"
            />
            <va-tab
              label="六号桌"
              name="icon6"
              @click="change6"
            /><va-tab
            label="七号桌"
            name="icon7"
            @click="change7"
          />
            <va-tab
              label="八号桌"
              name="icon8"
              @click="change8"
            />


          </template>
        </va-tabs>

        <div class="row row-equal" style="margin-top: 10px">
          <h5 class="display-5" style="margin-left: 10px">订单详情</h5>
        </div>

        <div class="row row-equal" style="margin-top: 10px;margin-left: 30px;">
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
              <va-h1 style="width: 5rem;margin-left: 50px">时间</va-h1>
            </template>
          </va-input>

          <va-input
            class="mb-4"
            v-model="waiterId"
            label="开单人"
            placeholder="Null"

          >
            <template #prepend>
              <va-h1 style="width: 5rem;margin-left: 50px">开单人</va-h1>
            </template>
          </va-input>

        </div>

        <va-data-table :items="meals" :columns="columns" striped>
          <template #cell(actions)="{ rowIndex }">
          </template>
        </va-data-table>



        <va-input
          class="mb-4"
          v-model="totalPrice"
          label="价格合计"
          placeholder="Null"

          style="margin-left: 950px;margin-top: 20px"
        >
          <template #prepend>
            <va-h1 style="width: 5rem">价格合计</va-h1>
          </template>
        </va-input>

      </va-card-content>
    </va-card>

    <va-button color="info" class="mr-4" @click="click" v-bind:disabled=isNull style="margin-left: 540px;margin-top: 20px">
      收款
    </va-button>

  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  const defaultItem = {
    id: null,
    mealName: '',
    singlePrice: null,
    number:null,
    totalPrice:null
  }

  export default defineComponent({
    name: 'orderDetail',
    data() {
      const columns = [
        { key: 'id',label:'菜品编号', sortable: true },
        { key: 'mealName', label:'菜品名称',sortable: true },
        { key: 'singlePrice',label:'菜品单价', sortable: true },
        { key: 'number', label:'菜品数量',sortable: true },
        { key: 'totalPrice',label:'合计', sortable: true },
      ]
      return {
        orders:[],
        meals:[],
        isNull:false,
        options1: [ '一号桌', '二号桌', '三号桌', '四号桌'],
        valueSingle: '一号桌',
        mealOrderId:null,
        tableName:"一号桌",
        time:null,
        tableId:1,
        waiterId:null,
        totalPrice:null,
        orderList:[],
        columns,
        createdItem: { ...defaultItem },
        // titles:['一号桌','二号桌','三号桌','四号桌','五号桌','六号桌','七号桌','八号桌']
        value:0,
        update:{
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
    computed: {
      isNewData () {
        return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
      },
    },

    methods: {
      getAll(){
        let  len;
        this.axios.get("/order/list").then(res =>{
          console.log(res.data)
          this.orders = res.data.data;
          console.log(res.data.data)

          for(let i=0;i<this.orders.length;i++){
            if(this.orders[i].mealOrder.tableId===this.tableId){
              this.orderList=this.orders[i].orderList
              // console.log(this.orderList)
              // console.log(this.orderList[0])
              // console.log(this.orderList.length)
              len=this.orderList.length
              this.mealOrderId=this.orders[i].mealOrder.id;
              if(this.orders[i].mealOrder.isCompleted===0){
                this.isNull=false
                // console.log("isNull:"+this.isNull)
              }else if(this.orders[i].mealOrder.isCompleted===1){
                this.isNull=true
                console.log("isNull:"+this.isNull)
              }
              this.time=this.orders[i].mealOrder.time;
              this.axios.get("/user/"+this.orders[i].mealOrder.writerId).then(res=>{
                // this.orders2[i].writerId=res.data.name
                console.log(res.data)
                this.waiterId = res.data.data.name
              })

            }
          }
          this.getAll2(len);
        })


      },
      async getAll2(len) {
        console.log(len);

        for(let i=0;i<len;i++){
          await this.axios.get("/meal/"+this.orderList[i].x).then(res=>{
            console.log(res.data.data)

            this.meals.push({
              id: this.orderList[i].x,
              mealName: res.data.data.name,
              // mealName: "11",
              singlePrice: res.data.data.price,
              number:this.orderList[i].y,
              totalPrice:res.data.data.price*this.orderList[i].y
            })
          })

        }

        for (let i=0;i<this.meals.length;i++){
          this.totalPrice = this.totalPrice + this.meals[i].totalPrice
        }

        console.log(this.orderList[2]);
      },
      checkChange(){
        if(this.valueSingle==='一号桌'){
          this.tableId=1
        }else if(this.valueSingle==='二号桌'){
          this.tableId=2
        }else if(this.valueSingle==='三号桌'){
          this.tableId=3
        }else if(this.valueSingle==='四号桌'){
          this.tableId=4
        }
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.getAll()
      },
      change1(){

        this.tableId=1

        this.tableName='一号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },
      change2(){

        this.tableId=2

        this.tableName='二号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },
      change3(){

        this.tableId=3

        this.tableName='三号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },
      change4(){

        this.tableId=4

        this.tableName='四号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },
      change5(){

        this.tableId=5

        this.tableName='五号桌'
        // this.meals.splice(0,this.meals.length)
        this.meals = []
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },change6(){

        this.tableId=6

        this.tableName='六号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },change7(){

        this.tableId=7

        this.tableName='七号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },
      change8(){

        this.tableId=8

        this.tableName='八号桌'
        this.meals.splice(0,this.meals.length)
        this.totalPrice = 0
        this.mealOrderId=null
        this.time=null
        this.waiterId=null
        this.getAll()
      },


      click(){
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        // if(that.tableName==='一号桌'){
        //   that.tableId=1
        // }else if(that.tableName==='二号桌'){
        //   that.tableId=2
        // }else if(that.tableName==='三号桌'){
        //   that.tableId=3
        // }else if(that.tableName==='四号桌'){
        //   that.tableId=4
        // }else if(that.tableName==='五号桌'){
        //   that.tableId=5
        // }else if(that.tableName==='六号桌'){
        //   that.tableId=6
        // }else if(that.tableName==='七号桌'){
        //   that.tableId=7
        // }else if(that.tableName==='八号桌'){
        //   that.tableId=8
        // }
        that.update.mealOrder.tableId=that.tableId
        console.log(that.tableId)
        // console.log(this.tableId)
        that.update.mealOrder.isCompleted = 1
        that.update.orderList=that.orderList

        this.axios.put("/order/"+that.mealOrderId,that.update).then(res=>{
          if(res.data.code===200){
            this.$vaToast.init({ message: '付款成功', color: 'success',duration:2000 })
            this.$router.push({ name: 'mealState' })
          }
        })
      },
    },
    created() {
      this.getAll()
    },
  })
</script>

<style lang="scss">
  .table-example--slot {
    th {
      padding-top: 5px;
      padding-bottom: 5px;
      vertical-align: middle;
    }
  }
</style>
