<template>
  <div class="row row-equal" >

    <div class="flex xs12 lg3">
      <va-card style="max-width: 300px">
        <va-card-title>准备中</va-card-title>
        <va-card-content>
          <table class="va-table">
            <thead>
            <tr>
              <!--                <th>选择</th>-->
              <th>桌号</th>
              <th>名称</th>
              <th>数量</th>


            </tr>
            </thead>
            <tbody>
            <tr v-for="user in info" :key="user.id">
              <!--<td><input type="checkbox" :id=user.id name="newcheckbox" :checked="user.select" @click="user.select=!user.select"  /></td>-->
              <!--                <td> <va-checkbox v-model=user.select /></td>-->
              <td>{{user.tableId}}</td>
              <td>{{user.mealName}}</td>
              <td>{{user.mealNumber}}</td>


            </tr>
            </tbody>
          </table>
        </va-card-content>
      </va-card>
    </div>

    <!-- 左框 -->
    <div class="flex xs12 lg3">
      <va-card style="max-width: 300px;">
        <va-card-title>待取餐</va-card-title>
        <va-card-content>
          <table class="va-table">
            <thead>
            <tr>
              <th>选择</th>
              <th>桌号</th>
              <th>名称</th>
              <th>数量</th>


            </tr>
            </thead>
            <tbody>
            <tr v-for="user in info2" :key="user.id">
              <!--<td><input type="checkbox" :id=user.id name="newcheckbox" :checked="user.select" @click="user.select=!user.select"  /></td>-->
              <td> <va-checkbox v-model=user.select /></td>
              <td>{{user.tableId}}</td>

              <td>{{user.mealName}}</td>
              <td>{{user.mealNumber}}</td>
            </tr>
            </tbody>
          </table>
        </va-card-content>
      </va-card>
    </div>
    <!-- 添加/删除 -->
    <div style="margin-top: 50px">
      <va-card>
        <va-card-actions align="stretch" vertical>
          <va-button class="push" @click='push' >>>></va-button>
          <va-button class="del"  @click='del' > &lt;&lt;&lt; </va-button>
        </va-card-actions>
      </va-card>
    </div>

    <!-- 右框 -->
    <div class="flex xs12 lg3">
      <va-card>
        <va-card-title>已取餐</va-card-title>
        <va-card-content>
          <table class="va-table">
            <thead>
            <tr>
              <th>选择</th>
              <th>桌号</th>
              <th>名称</th>
              <th>数量</th>


            </tr>
            </thead>
            <tbody>
            <tr v-for="user in new_info" :key="user.id">
              <!--<td><input type="checkbox" :id=user.id name="newcheckbox" :checked="user.select" @click="user.select=!user.select"  /></td>-->
              <td> <va-checkbox v-model=user.select /></td>
              <td>{{user.tableId}}</td>
              <td>{{user.mealName}}</td>
              <td>{{user.mealNumber}}</td>


            </tr>
            </tbody>
          </table>
        </va-card-content>
      </va-card>
    </div>


  </div>
  <!--</va-parallax>-->
</template>

<script>
  export default {
    name: "meal-state",
    data(){
      return{
        // 原数据，左框数据
        info:[{
          mealNumber:null,
          mealName:null,
          tableId:null
        }],
        info2:[],
        // eslint-disable-next-line @typescript-eslint/camelcase
        new_info:[

        ],// 新数据，右框数据
        // eslint-disable-next-line @typescript-eslint/camelcase
        img :'http://images.wallpaperscraft.com/image/single/ocean_beach_aerial_view_134429_1280x800.jpg'
      }
    },
    methods:{// 添加数据

      getAll(){
        let orders=[]
        this.axios.get("/order/list").then(res =>{
          orders = res.data.data;
          this.axios.get("/orderList/list").then(res2 =>{
            const list = res2.data.data;
            let tableId = 1;

            for(let i=0;i<list.length;i++){
              if(list[i].iscompleted===0){
                for(let j=0;j<orders.length;j++){
                  if(orders[j].mealOrder.id === list[i].orderId){
                    tableId = orders[j].mealOrder.tableId
                  }
                }
                this.info.push({
                  id: list[i].id,
                  mealName: list[i].mealName,
                  // mealName: "11",
                  mealNumber: list[i].mealNumber,
                  tableId: tableId
                })
              }else if(list[i].iscompleted===1){
                for(let j=0;j<orders.length;j++){
                  if(orders[j].mealOrder.id===list[i].orderId){
                    tableId = orders[j].mealOrder.tableId
                  }
                }
                this.info2.push({
                  id: list[i].id,
                  mealName: list[i].mealName,
                  // mealName: "11",
                  mealNumber: list[i].mealNumber,
                  tableId: tableId
                })
              }
              else if(list[i].iscompleted===2){
                for(let j=0;j<orders.length;j++){
                  if(orders[j].mealOrder.id===list[i].orderId){
                    tableId = orders[j].mealOrder.tableId
                  }
                }
                this.new_info.push({
                  id: list[i].id,
                  mealName: list[i].mealName,
                  // mealName: "11",
                  mealNumber: list[i].mealNumber,
                  tableId: tableId
                })
              }
            }
          })
        })

      },

      push(){
        for(let i=(this.info2.length-1);i>=0;i--){
          if(this.info2[i].select){
            this.info2[i].iscompleted=2;
            this.info2[i].select = false;
            this.new_info.push(this.info2[i])
            //delete this.info[i];
            this.axios.put("/orderList/qiantaiedit/"+this.info2[i].id).then(res => {
              console.log(res.data);
            })
            this.info2.splice(i, 1);
          }
        }
        console.log(this.info2)
      },


      // 移除数据
      del(){

        for(let i=this.new_info.length-1;i>=0;i--){
          if(this.new_info[i].select){
            this.new_info[i].iscompleted=1;
            this.new_info[i].select = false;
            this.info2.push(this.new_info[i])
            //delete this.info[i];
            this.axios.put("/orderList/houchuedit/"+this.new_info[i].id).then(res => {
              console.log(res.data);
            })
            this.new_info.splice(i, 1);
          }
        }
      },
    },
    created(){
      this.getAll()
    }
  }
</script>

<style scoped>
  .transfer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .transfer>.list {
    width: 200px;
    height: 300px;
    border: 1px solid #000;
    list-style: none;
  }
  .content{
    font-size: 30px;
    margin: 0 20px;
  }
  .list>li{
    padding: 5px;
    box-sizing: border-box;
  }
</style>
