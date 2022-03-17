<template>
  <!--<va-parallax
    target=".base-layout__content"
    :src= img
  >-->
  <div class="row row-equal" >
    <!-- 左框 -->
    <div class="flex xs12 lg5">
      <va-card>
        <va-card-title>待完成菜品</va-card-title>
        <va-card-content>
          <table class="va-table">
            <thead>
            <tr>
              <th>选择</th>
              <th>数量</th>
              <th>名称</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in table" :key="user.id">
              <!--<td><input type="checkbox" :id=user.id name="newcheckbox" :checked="user.select" @click="user.select=!user.select"  /></td>-->
              <td> <va-checkbox v-model=user.select /></td>
              <td>{{user.mealNumber}}</td>
              <td>{{user.mealName}}</td>
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
    <div class="flex xs12 lg5">
      <va-card>
        <va-card-title>已完成菜品</va-card-title>
        <va-card-content>
          <table class="va-table">
            <thead>
            <tr>
              <th>选择</th>
              <th>数量</th>
              <th>名称</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in new_table" :key="user.id">
              <!--<td><input type="checkbox" :id=user.id name="newcheckbox" :checked="user.select" @click="user.select=!user.select"  /></td>-->
              <td> <va-checkbox v-model=user.select /></td>
              <td>{{user.mealNumber}}</td>
              <td>{{user.mealName}}</td>
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
    name: "main",
    data(){
      return{
        // 原数据，左框数据
        info:[
          // {
          //   select:false,
          //   id:null,
          //   orderId:null,
          //   mealId:null,
          //   mealNumber:null,
          //   mealName:'',
          //   iscompleted:null
          // },
        ],
        table:[

        ],
        // eslint-disable-next-line @typescript-eslint/camelcase
        new_table:[

        ],
        // eslint-disable-next-line @typescript-eslint/camelcase
        new_info:[
          // {
          //   select:false,
          //   id:null,
          //   orderId:null,
          //   mealId:null,
          //   mealNumber:null,
          //   mealName:'',
          //   iscompleted:null
          // },
        ],// 新数据，右框数据
        idList:[],
        // eslint-disable-next-line @typescript-eslint/camelcase
        img :'http://images.wallpaperscraft.com/image/single/ocean_beach_aerial_view_134429_1280x800.jpg'
      }
    },
    methods:{// 添加数据
      // push(){
      //   let that = this;
      //   let info = JSON.parse(JSON.stringify(that.info)); // 拷贝原数据, 深拷贝
      //   info.forEach((item, index )=>{
      //     // 执行 select 为true 的数据
      //     if (item.select){
      //       // eslint-disable-next-line @typescript-eslint/camelcase
      //       that.new_info = that.new_info.concat(item).sort((a,b)=>{ return a.id - b.id }); // 添加到新数据框, 排序
      //       delete info[index];    // 删除数据
      //       item.select = false;
      //     }
      //   })
      //   info = info.filter(function (val) { return val }); // 过滤 undefined
      //   that.info = info; // 更新原数据\
      // },

      getAll(){
        this.axios.get("/orderList/list").then(res =>{
          console.log(res.data)
          const list = res.data.data;
          for(let i=0;i<list.length;i++){
            if(list[i].iscompleted===0){
              this.info.push(list[i])
            }else {
              this.new_info.push(list[i])
            }
          }
          // this.table.push(this.info[0])
          if(this.info.length>0){
            for(let i=0 ; i<this.info.length ; i++){
              let j = 0
              for(;j<this.table.length ; j++){
                if(this.table[j].mealName===this.info[i].mealName){
                  this.table[j].mealNumber += this.info[i].mealNumber
                  break
                }
              }
              if(j===this.table.length){
                this.table.push(this.info[i])
              }
            }
          }
          console.log(this.info);


          // this.new_table.push(this.new_info[0])
          if(this.new_info.length>0){
            for(let i=0 ; i<this.new_info.length ; i++){
              let j = 0
              for(;j<this.new_table.length ; j++){
                if(this.new_table[j].mealName===this.new_info[i].mealName){
                  this.new_table[j].mealNumber += this.new_info[i].mealNumber
                  break
                }
              }
              if(j===this.new_table.length){
                this.new_table.push(this.new_info[i])
              }
            }
          }

          console.log(this.new_info);
        })
      },

      // push(){
      //   for(let i=0;i<this.info.length;i++){
      //     if(this.info[i].select){
      //       this.info[i].iscompleted=1;
      //       this.new_info.push(this.info[i])
      //       //delete this.info[i];
      //       this.info.splice(i, 1);
      //       this.axios.put("/orderList/houchuedit/"+this.info[i].id).then(res => {
      //         console.log(res.data);
      //       })
      //     }
      //   }
      //   console.log(this.info)
      // },

      push(){
        for(let i=(this.table.length-1) ; i>=0 ; i--){
          if(this.table[i].select){
            for(let j=this.info.length-1;j>=0;j--){
              if(this.table[i].mealName===this.info[j].mealName){
                this.idList.push(this.info[j].id)
              }
            }
            this.table[i].select=false
            this.new_table.push(this.table[i])
            this.table.splice(i,1)

          }
        }
        console.log(this.idList)
        this.axios.put("/orderList/houchuedit3",this.idList).then(res=>{
          console.log(res.data)
        })
        // location.reload()


        // for(let i=(this.table.length-1) ; i>=0 ; i--){
        //   if(this.table[i].select){
        //     for(let j=this.info.length-1 ; j>=0 ; j--){
        //       if(this.table[i].mealName===this.info[j].mealName){
        //         this.info[j].isCompleted=1
        //         this.new_info.push(this.info[j])
        //         // this.info.splice(j,1)
        //         this.axios.put("/orderList/houchuedit/"+this.info[j].id).then(res=>{
        //           console.log(res.data)
        //         })
        //       }
        //     }
        //   }
        // }
        // location.reload()
      },


      // 移除数据
      del(){
        // let that = this;
        // let info = JSON.parse(JSON.stringify(that.new_info)); // 拷贝原数据, 深拷贝
        // info.forEach((item, index )=>{
        //   // 执行 select 为true 的数据
        //   if (item.select){
        //     that.info = that.info.concat(item).sort((a,b)=>{ return a.id - b.id }); // 添加到新数据框, 排序
        //     delete info[index];    // 删除数据
        //     item.select = false;
        //   }
        // })
        // info = info.filter(function (val) { return val }); // 过滤 undefined
        // // eslint-disable-next-line @typescript-eslint/camelcase
        // that.new_info = info; // 更新原数据


        // for(let i=0;i<this.new_info.length;i++){
        //   if(this.new_info[i].select){
        //     this.new_info[i].iscompleted=0;
        //     this.info.push(this.new_info[i])
        //     //delete this.info[i];
        //     this.new_info.splice(i, 1);
        //   }
        // }

        for(let i=(this.new_table.length-1) ; i>=0 ; i--){
          if(this.new_table[i].select){
            for(let j=this.new_info.length-1;j>=0;j--){
              if(this.new_table[i].mealName===this.new_info[j].mealName){
                this.idList.push(this.new_info[j].id)
              }
            }
            this.new_table[i].select=false
            this.table.push(this.new_table[i])
            this.new_table.splice(i,1)

          }
        }
        console.log(this.idList)
        this.axios.put("/orderList/houchuedit4",this.idList).then(res=>{
          console.log(res.data)
        })

        // for(let i=this.new_table.length-1 ; i>=0 ; i--){
        //   if(this.new_table[i].select){
        //     for(let j=this.new_info.length-1 ; j>=0 ; j--){
        //       if(this.new_table[i].mealName===this.new_info[j].mealName){
        //         this.new_info[j].isCompleted=0
        //         this.info.push(this.new_info[j])
        //         // this.info.splice(j,1)
        //         this.axios.put("/orderList/houchuedit2/"+this.new_info[j].id).then(res=>{
        //           console.log(res.data)
        //         })
        //       }
        //     }
        //   }
        // }
        // location.reload()

      },
    },
    watch: {
      $route(to,from) {
        location.reload()
      }
    },
    /*    mounted(){
          //const that = this;
          let that = this
          // 给原始数据添加一个 select 字段，判断是否选中
          that.info.map((val,key)=>{ that.$set(val,'select',false) });
          that.new_info.map((val,key)=>{ that.$set(val,'select',false) });
        },*/
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
