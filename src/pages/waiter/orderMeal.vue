<template>
  <div class="form-wizard">
    <va-affix :offset-top="95">
      <va-card style="width: 100%">

        <va-card-content>

          <va-tabs
            stateful
            grow
          >
            <template #tabs>
              <va-tab
                label="全部"
                name="icon1"
                @click="change1"
              />

              <va-tab
                label="热菜"
                name="icon2"
                @click="change2"
              />
              <va-tab
                label="凉菜"
                name="icon3"
                @click="change3"
              />
              <va-tab
                label="饮品"
                name="icon4"
                @click="change4"
              />
              <va-tab
                label="小吃"
                name="icon5"
                @click="change5"
              />

            </template>
          </va-tabs>

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
                           flat @click="onselect">{{ $t('搜索') }}
                </va-button>
              </template>
            </va-input>
          </div>
        </va-card-content>
      </va-card>

      <div class="row row-equal" style="margin-top: 10px">
        <va-button style="margin-right: 0;" size="large" class="mb-4"
                   @click="selectTable = !selectTable">
          {{table}}
        </va-button>
      </div>


    </va-affix>

    <va-modal v-model="selectTable" :overlay="false"
              hide-default-actions
              size="large">
      <div class="select-table" style="width: 100%">
        <div style="margin-top: 10px" v-for="table in tableOccupant">
          <va-button class="mr-4" v-bind:disabled="table.isNull"  @click="selectTableN(table.number)">{{table.number}}号桌</va-button>
        </div>
      </div>
    </va-modal>


    <div class="row row-equal">
      <div class="flex xs12 lg2" v-for="meal in meals" :key="meal.id">
        <va-card>
          <va-image v-bind:src="meal.img"
                    @click="showMealDetail(meal.id)"/>
          <va-badge text="店长推荐" overlap v-show="meal.isGood">
          </va-badge>
          <va-card-title>
            {{meal.name}}{{" 价格"}}{{meal.price}}
          </va-card-title>

          <va-card-actions align="between">
            <va-button icon="minus" @click="handleMinus(meal)"></va-button>
            <va-input class="num" disabled>{{meal.num}}</va-input>
            <va-button icon="add" @click="handleAdd(meal)"></va-button>
          </va-card-actions>
        </va-card>
      </div>
    </div>

    <va-modal v-model="mealDetail" :overlay="false"
              hide-default-actions
              size="large">
      <div class="meal-detail" style="width: 100%">
        <div style="min-width: 600px">
          <va-input
            class="md-1"
            v-model="showMealQ.name"
          >
            <template #prepend>
              <p style="width: 4rem">菜品名称</p>
            </template>
          </va-input>
        </div>

        <div class="row row-equal" style="margin-top: 10px">
          <div class="flex xs12 lg7">
            <va-image v-bind:src="showMealQ.img"/>
          </div>
          <div class="flex xs12 lg5">
            <va-select class="mt-2" v-model="showMealQ.type" :options="options">
              <template #prepend>
                <p style="width: 2rem">类别</p>
              </template>
            </va-select>
            <va-checkbox class="mt-4" v-model="isHot" :label="label"/>
            <va-input
              class="md-1"
              v-model="showMealQ.price"
              style="margin-top: 10px"
            >
              <template #prepend>
                <p style="width: 2rem">价格</p>
              </template>
            </va-input>
          </div>
        </div>

        <div style="margin-top: 10px">
          <va-input
            class="mb-4"
            v-model="showMealQ.detail"
            type="textarea"
            autosize>
            <template #prepend>
              <p style="width: 2rem">描述</p>
            </template>
          </va-input>
        </div>
      </div>
    </va-modal>

    <va-affix :offset-bottom="0">
      <va-card style="width: 100%">
        <div>
          <va-button @click="this.showOrderList = !this.showOrderList">已点菜品</va-button>
          已点:{{this.$store.getters.getOrdersNum}} 小计:{{this.$store.getters.getOrdersPrice}}
          <va-button style="float: right" @click="submitOrderList">提交订单</va-button>
        </div>
      </va-card>
      <va-modal v-model="showOrderList" :overlay="false"
                hide-default-actions
                size="large">
        <div class="order-list row row-equal" style="width: 100%">
          <h1 class="display-2" style="width: 100%">
            已点菜品
          </h1>
          <div class="flex xs12 lg4" style="min-width: 300px;margin-top: 10px" v-for="order in saleCar.orderList">
            <va-card>
              <div>
                <h1 class="display-4">{{"菜品: "}}{{order.name}}</h1>
                <h1 class="display-6">{{"小计: "}}{{order.price*order.num}}</h1>
              </div>
              <div>
                <va-card-actions align="between">
                  <va-button icon="minus" @click="handleMinus(order)"></va-button>
                  <va-input class="num">{{order.num}}</va-input>
                  <va-button icon="add" @click="handleAdd(order)"></va-button>
                </va-card-actions>
              </div>
            </va-card>
          </div>
        </div>
      </va-modal>
    </va-affix>
  </div>

</template>

<script>
  export default {
    name: 'order-meal',
    data() {
      return {
        options1: ['热菜', '凉菜', '小吃', '饮品'],
        valueSingle: '热菜',
        meals: [],
        tableOccupant: [],
        table: "请选桌",
        searchInfo: "",
        selectTable: false,
        mealDetail: false,
        isHot: false,
        showOrderList: false,
        orderNum: 0,
        orderPrice: 0,
        label: '是否为热销菜',
        options: ['热菜', '凉菜', '小吃', '饮品'],
        showMealQ: {
          id: '',
          name: '',
          type: '',
          isGood: null,
          img: '',
          detail: '',
          price: null,
          stock: null,
        },
        addOrderInfo: {
          mealOrder: {
            tableId: 0,
            isCompleted: 0,
            time: '',
            writerId: 0
          },
          orderList: []
        },
        saleCar: {
          mealOrder: {
            tableId: 0,
            isCompleted: 0
          },
          orderList: []
        },
      }
    },
    methods: {
      getAll() {
        this.axios.get("/meal/list2").then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      getTableD() {
        this.axios.get("/order/list").then(res => {
          console.log("订单信息", res.data.data)
          const tmp = res.data.data
          for (let number = 1; number < 9; number++) {
            let exit = false
            for (let i = 0; i < tmp.length; i++) {
              if (tmp[i].mealOrder.isCompleted === 0 && tmp[i].mealOrder.tableId === number) {
                let repeat = false
                for (let j = 0; j < this.tableOccupant.length; j++) {
                  if (this.tableOccupant[j].tableId === number) {
                    repeat = true
                  }
                }
                if (repeat === false) {
                  let isNull = true
                  this.tableOccupant.push({number, isNull})
                }
                exit = true
                break
              }
            }
            if (exit === false) {
              let isNull =  false
              this.tableOccupant.push({number,isNull})
            }
          }
          console.log("桌子占用情况", this.tableOccupant)
        })
      },
      onselect() {
        this.axios.post("/meal/search", this.searchInfo).then(res => {
          if (res === 400) {
            this.axios.get("/meal/list2").then(res1 => {
              this.meals = res1.data.data
              for (let i = 0; i < this.saleCar.orderList.length; i++) {
                for (let j = 0; j < this.meals.length; j++) {
                  if (this.meals[j].id === this.saleCar.orderList[i].id) {
                    this.meals[j] = this.saleCar.orderList[i];
                  }
                }
              }
            })
          } else {
            console.log(this.searchInfo)
            this.meals = res.data.data
            for (let i = 0; i < this.saleCar.orderList.length; i++) {
              for (let j = 0; j < this.meals.length; j++) {
                if (this.meals[j].id === this.saleCar.orderList[i].id) {
                  this.meals[j] = this.saleCar.orderList[i];
                }
              }
            }
          }
        })
      },
      handleMinus(meal) {
        console.log(this.tmp)
        let option = this.saleCar.orderList.indexOf(meal)
        if (meal.num > 0) {
          meal.num--
          this.orderNum--
          this.orderPrice = this.orderPrice - meal.price
          this.$store.commit("UPDATE_ORDERSNUM", this.orderNum)
          this.$store.commit("UPDATE_ORDERSPRICE", this.orderPrice)
          if (this.saleCar.orderList === [] || this.saleCar === null) {
            this.$vaToast.init({message: '购物车为空', color: 'warning', duration: 2000})
          } else {
            for (let i = 0; i < this.saleCar.orderList.length; i++) {
              if (this.saleCar.orderList[i].id === meal.id) {
                this.saleCar.orderList[i] = meal;
              }
            }
            if (meal.num === 0) {//删除
              this.saleCar.orderList.splice(option, 1)
            }

          }
        } else {
          meal.num = 0
        }
        /*this.$store.commit("UPDATE_LIST", this.tmp)
        this.axios.put("http://localhost:8081/meal/" + meal.id, meal)*/
      },
      handleAdd(meal) {
        console.log(meal)
        meal.num++
        this.orderNum++
        this.orderPrice = this.orderPrice + meal.price
        if (this.saleCar === [] || this.saleCar === null) {
          this.saleCar.orderList.push(meal)
        } else {
          let index = 0
          for (let i = 0; i < this.saleCar.orderList.length; i++) {
            if (this.saleCar.orderList[i].id === meal.id) {
              this.saleCar.orderList[i] = meal;
              index = 1
            }
          }
          if (index === 0) {
            this.saleCar.orderList.push(meal)
          }
        }
        this.$store.commit("UPDATE_ORDERSNUM", this.orderNum)
        this.$store.commit("UPDATE_ORDERSPRICE", this.orderPrice)
      },
      submitOrderList() {
        if (this.saleCar.mealOrder.tableId === 0) {
          this.$vaToast.init({message: '请选择桌号', color: 'warning', duration: 2000})
        } else if(this.saleCar.orderList.length===0){
          this.$vaToast.init({message: '菜品不能为空', color: 'warning', duration: 2000})
        } else{
          for (let i = 0; i < Object.values(this.saleCar.orderList).length; i++) {
            if (this.saleCar.orderList[i].num > 0) {
              let x = this.saleCar.orderList[i].id
              let y = this.saleCar.orderList[i].num
              this.addOrderInfo.orderList.push({x, y})
            }
          }
          this.getNowFormatDate()
          this.addOrderInfo.mealOrder.writerId = sessionStorage.getItem("userInfo").id
          this.addOrderInfo.mealOrder.tableId = this.saleCar.mealOrder.tableId
          this.axios.post("/order", this.addOrderInfo).then(res => {
            console.log("返回值==========", res.data)
            if (res.data.code === 200) {
              this.$vaToast.init({message: '下单成功', color: 'success', duration: 2000})
              this.$router.push({ name: 'orderDetail' })
            }
          })
          this.getAll()
          this.table = "请选桌"
          this.saleCar.orderList = []
          this.saleCar.mealOrder.tableId = ''
          this.$store.commit("UPDATE_ORDERSNUM", 0)
          this.$store.commit("UPDATE_ORDERSPRICE", 0)
        }
        console.log(this.saleCar)
      },
      selectTableN(id) {
        this.table = id + "号桌";
        this.saleCar.mealOrder.tableId = id;
        this.selectTable = !this.selectTable;
      },
      showMealDetail(id) {
        console.log(id);
        this.axios.get("/meal/" + id).then(res => {
          console.log(res.data)
          this.showMealQ = res.data.data;
          if (this.showMealQ.isGood) {
            this.isHot = true
          } else {
            this.isHot = false
          }
          this.mealDetail = !this.mealDetail
        })
      },

      change1(){
        this.axios.get("/meal/list2").then(res => {
          console.log(res.data)
          this.meals = res.data.data
          for(let i=0;i<this.saleCar.orderList.length;i++) {
            for(let j=0;j<this.meals.length;j++) {
              if(this.meals[j].id === this.saleCar.orderList[i].id) {
                this.meals[j] = this.saleCar.orderList[i];
              }
            }
          }
          //this.$store.commit("UPDATE_LIST", this.meals)
        })
      },
      change2(){
        this.valueSingle = '热菜'
        this.axios.post("/meal/searchByType", this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
          for(let i=0;i<this.saleCar.orderList.length;i++) {
            for(let j=0;j<this.meals.length;j++) {
              if(this.meals[j].id === this.saleCar.orderList[i].id) {
                this.meals[j] = this.saleCar.orderList[i];
              }
            }
          }
          console.log(this.meals)

        })
      },
      change3(){
        this.valueSingle = '凉菜'
        this.axios.post("/meal/searchByType", this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
          for(let i=0;i<this.saleCar.orderList.length;i++) {
            for(let j=0;j<this.meals.length;j++) {
              if(this.meals[j].id === this.saleCar.orderList[i].id) {
                this.meals[j] = this.saleCar.orderList[i];
              }
            }
          }
          console.log(this.meals)

        })
      },
      change4(){
        this.valueSingle = '饮品'
        this.axios.post("/meal/searchByType", this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
          for(let i=0;i<this.saleCar.orderList.length;i++) {
            for(let j=0;j<this.meals.length;j++) {
              if(this.meals[j].id === this.saleCar.orderList[i].id) {
                this.meals[j] = this.saleCar.orderList[i];
              }
            }
          }
          console.log(this.meals)

        })
      },
      change5(){
        this.valueSingle = '小吃'
        this.axios.post("/meal/searchByType", this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
          for(let i=0;i<this.saleCar.orderList.length;i++) {
            for(let j=0;j<this.meals.length;j++) {
              if(this.meals[j].id === this.saleCar.orderList[i].id) {
                this.meals[j] = this.saleCar.orderList[i];
              }
            }
          }
          console.log(this.meals)

        })
      },

      /**
       * 获取当前时间
       * 格式YYYY-MM-DD
       */
      getNowFormatDate() {
        var date = new Date();
        var year = date.getFullYear(); //月份从0~11，所以加一
        var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
        for (var i = 0; i < dateArr.length; i++) {
          if (dateArr[i] >= 1 && dateArr[i] <= 9) {
            dateArr[i] = "0" + dateArr[i];
          }
        }
        this.addOrderInfo.mealOrder.time = year + '-' + dateArr[0] + '-' + dateArr[1] + 'T' + dateArr[2] + ':' + dateArr[3] + ':' + dateArr[4];
        console.log('strDate', this.addOrderInfo.mealOrder.time)
      }
    },
    created() {
      this.getAll();
      this.getTableD();
    },
    watch: {
      $route(to,from) {
        location.reload()
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
