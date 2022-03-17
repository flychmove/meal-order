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


          <div class="search" style="width: 100%;margin-top: 20px">
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
        <va-button icon="add" style="margin-right: 0;" size="large" class="mb-4"
                   @click="addMeal = !addMeal">
        </va-button>

        <!--        <div style="max-width: 300px;margin-left: 30px;margin-top: 6px">-->
        <!--          <va-select-->
        <!--            class="mb-4"-->
        <!--            label="选择菜品"-->
        <!--            :options="options1"-->
        <!--            v-model="valueSingle"-->
        <!--          />-->
        <!--        </div>-->

        <!--        <va-button class="mb-4" :rounded="false" @click="checkChange" size="medium"> 切换 </va-button>-->

      </div>


    </va-affix>

    <va-modal v-model="addMeal" :overlay="false"
              hide-default-actions
              no-outside-dismiss size="large">
      <div class="add-meal" style="width: 100%">
        <div style="min-width: 600px">
          <va-input
            class="md-1"
            v-model="addmealQ.name"
          >
            <template #prepend>
              <p style="width: 4rem">菜品名称</p>
            </template>
          </va-input>
        </div>

        <div class="row row-equal" style="margin-top: 10px">
          <div class="flex xs12 lg7">
            <!--<va-file-upload v-model="addmealQ.img" type="gallery"
                            file-types="image/*"/>-->
            <input type="file" class="file">
          </div>
          <div class="flex xs12 lg5">
            <va-select class="mt-2" v-model="addmealQ.type" :options="options">
              <template #prepend>
                <p style="width: 2rem">类别</p>
              </template>
            </va-select>
            <va-checkbox class="mt-4" v-model="isHot" :label="label"/>
            <va-input
              class="md-1"
              v-model="addmealQ.price"
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
            v-model="addmealQ.detail"
            type="textarea"
            autosize>
            <template #prepend>
              <p style="width: 2rem">描述</p>
            </template>
          </va-input>
        </div>

        <div style="margin-top: 10px">
          <va-button class="mr-4" @click="cancelMeal2">取消</va-button>
          <va-button class="mr-4" @click="submitAddMeal">确定</va-button>
        </div>
      </div>
    </va-modal>






    <div class="row row-equal">
      <div class="flex xs12 lg4" v-for="meal in meals" :key="meal.id">

        <va-card>
          <va-image v-bind:src="meal.img"
                    @click="onchange(meal.id)"/>
          <va-badge text="店长推荐" overlap v-show="meal.isGood">
          </va-badge>
          <va-card-title>
            {{meal.name}}
          </va-card-title>

          <va-card-actions align="stretch" vertical>
            <va-button @click="getdeleteid(meal.id)">删除</va-button>
            <!--删除-->
            <va-modal v-model="deleteMeal" :message="deleteMessage"
                      hide-default-actions overlay-opacity="0.2"
                      no-outside-dismiss size="large" >
              <template #footer>
                <va-button @click="deleteMeal = !deleteMeal">
                  取消
                </va-button>
                <va-button @click="deletemeal(meal.id)">
                  确定
                </va-button>
              </template>
            </va-modal>
          </va-card-actions>
        </va-card>
      </div>
    </div>

    <!--   <va-pagination
         :visible-pages="7"
         v-model="value"
         :total="total"
         boundary-numbers
         :page-size="10"
       />
       Current value: {{ value }}-->
    <!--    <va-pagination
          v-model="value"
          :pages="pages"
          :visible-pages="4"
          @change="page(value)"
        />-->
    <!--分页-->
    <!--    <div class="page-bar">-->
    <!--      <ul>-->
    <!--        <li v-if="value>1"><a v-on:click="value&#45;&#45;,page(value)">上一页</a></li>-->
    <!--        <li v-if="value===1"><a class="banclick">上一页</a></li>-->
    <!--        <li v-for="index in 10" :key="index"  v-bind:class="{ 'active': value === index}">-->
    <!--          <a v-on:click="page(index)">{{ index }}</a>-->
    <!--        </li>-->
    <!--        <li v-if="value!==pages"><a v-on:click="value++,page(value)">下一页</a></li>-->
    <!--        <li v-if="value === pages"><a class="banclick">下一页</a></li>-->
    <!--        <li><a>当前第<i>{{value}}</i>页</a></li>-->
    <!--        <li><a>共<i>{{pages}}</i>页</a></li>-->
    <!--      </ul>-->
    <!--    </div>-->

    <div >
      <va-pagination
        :visible-pages="7"
        v-model="value2"
        :total="pages"
        boundary-numbers
        :page-size="1"
        @click="changePage"
        style="margin-left: 300px"
      />
      <!--      当前页: {{ value2 }}-->
    </div>

  </div>


  <va-modal v-model="mealDetail" :overlay="false"
            hide-default-actions
            no-outside-dismiss size="large">
    <div class="meal-detail" style="width: 100%">
      <div style="min-width: 600px">
        <va-input
          class="md-1"
          v-model="editmealQ.name"
        >
          <template #prepend>
            <p style="width: 4rem">菜品名称</p>
          </template>
        </va-input>
      </div>

      <div class="row row-equal" style="margin-top: 10px">
        <div class="flex xs12 lg7">
          <input type="file" class="file">
        </div>
        <div class="flex xs12 lg5">
          <va-select class="mt-2" v-model="editmealQ.type" :options="options">
            <template #prepend>
              <p style="width: 2rem">类别</p>
            </template>
          </va-select>
          <va-checkbox class="mt-4" v-model="editmealQ.isHot" :label="label"/>
          <va-input
            class="md-1"
            v-model="editmealQ.price"
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
          v-model="editmealQ.detail"
          type="textarea"
          autosize>
          <template #prepend>
            <p style="width: 2rem">描述</p>
          </template>
        </va-input>
      </div>

      <div style="margin-top: 10px">
        <va-button class="mr-4" @click="cancelMeal">取消</va-button>
        <va-button class="mr-4" @click="submitEdit()">确定</va-button>
      </div>
    </div>

  </va-modal>

</template>

<script>

  export default {
    name: 'form-wizard',
    /*    components: {
          MealDetail,
        },*/
    data() {
      return {
        options1: [ '热菜', '凉菜', '小吃', '饮品'],
        value: 1,
        value2: 1,
        valueSingle: '热菜',
        meals: {},
        searchInfo: "",
        addMeal: false,
        mealDetail: false,
        editId:null,
        deleteId:null,
        deleteMeal: false,
        deleteMessage: "是否确定删除该菜品?",
        isHot: false,
        label: '是否为热销菜',
        options: ['热菜', '凉菜', '小吃', '饮品'],
        addmealQ:{
          name:'',
          type:'',
          isGood:null,
          img:'',
          detail:'',
          price:null,
        },
        editmealQ:{
          name:'',
          type:'',
          isGood:null,
          isHot: false,
          img:'',
          detail:'',
          price:null,
        },
        pages: null,
        total: null,
      }
    },
    methods: {
      getAll(value) {
        this.axios.get("/meal/list?currentPage="+value).then(res => {
          console.log(res.data)
          this.pages = res.data.data.pages
          this.total = res.data.data.total
          this.meals = res.data.data.records
        })
      },
      onselect() {
        this.axios.post("/meal/search", this.searchInfo).then(res => {
          if(res===400) {
            this.getAll(1);
          }
          console.log(this.searchInfo)
          this.meals = res.data.data
        })
      },
      getdeleteid(id) {
        console.log(id);
        this.deleteMeal = !this.deleteMeal
        this.deleteId = id;
      },
      deletemeal(id) {
        this.axios.delete("/meal/"+ this.deleteId ).then(res=> {
          console.log("删除成功");
          console.log(res.data);
          this.deleteMeal = !this.deleteMeal;
          let x = this.meals.length
          for(let i=this.meals.length-1;i>=0;i--) {
            if(this.meals[i].id===id) {
              console.log(i);
              this.meals.splice(i,1)
            }
          }
        })
      },
      submitAddMeal() {
        const formData = new window.FormData()
        formData.append('file', document.querySelector('input[type=file]').files[0])
        this.axios.post('/api/file/uploadImg',formData).then(res=> {
          console.log("指向了");
          this.addmealQ.img = res.data.data;
          if(this.isHot) {
            this.addmealQ.isGood = 1;
          }
          else {this.addmealQ.isGood = 0;}
          this.axios.post("/meal/",this.addmealQ).then(res=>{
            console.log(res.data)

          })
        })

        this.addMeal = false;
        this.getAll(1);
      },
      submitEdit() {
        const formData = new window.FormData()
        formData.append('file', document.querySelector('input[type=file]').files[0])
        this.axios.post('/api/file/uploadImg',formData).then(res=> {
          console.log("指向了");
          console.log(res.data)
          this.editmealQ.img = res.data.data;
          this.axios.put("/meal/"+this.editId,this.editmealQ).then(res=>{
            console.log(res.data)
            this.$vaToast.init({ message: '修改成功!', color: 'success',duration:2000 })
          })
        })

        this.mealDetail = !this.mealDetail;
        this.getAll(1);
      },
      onchange(id) {
        console.log(id);
        this.axios.get("/meal/"+id).then(res=>{
          console.log(res.data)
          const tmp = res.data.data;
          this.mealDetail = !this.mealDetail
          this.editId = tmp.id
          this.editmealQ.name = tmp.name
          //this.editmealQ.img = this.meals[id].img
          this.editmealQ.detail = tmp.detail
          this.editmealQ.type = tmp.type
          this.editmealQ.price = tmp.price
          if(tmp.isGood===1) {
            this.editmealQ.isHot = true;
          }
          else{
            this.editmealQ.isHot = false;
          }
        })

      },
      change1(){
        this.axios.get("/meal/list?currentPage="+1).then(res => {
          console.log(res.data)
          this.pages = res.data.data.pages
          this.total = res.data.data.total
          this.meals = res.data.data.records
        })
      },
      change2(){
        this.valueSingle = '热菜'
        this.axios.post("/meal/searchByType",this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      change3(){
        this.valueSingle = '凉菜'
        this.axios.post("/meal/searchByType",this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      change4(){
        this.valueSingle = '饮品'
        this.axios.post("/meal/searchByType",this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      change5(){
        this.valueSingle = '小吃'
        this.axios.post("/meal/searchByType",this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },

      cancelMeal(){
        this.mealDetail = !this.mealDetail
      },
      cancelMeal2(){
        this.addMeal = !this.addMeal
      },
      checkChange(){
        this.axios.post("/meal/searchByType",this.valueSingle).then(res => {
          console.log(res.data)
          this.meals = res.data.data
        })
      },
      page(value) {
        this.axios.get("/meal/list?currentPage="+value).then(res => {
          console.log(res.data)
          this.pages = res.data.data.pages
          this.total = res.data.data.total
          this.meals = res.data.data.records
        })
      },
      changePage(){
        console.log(this.value2)
        this.axios.get("/meal/list?currentPage="+this.value2).then(res => {
          console.log(res.data)
          this.pages = res.data.data.pages
          this.total = res.data.data.total
          this.meals = res.data.data.records
        })
      }
    },
    created() {
      this.page(1);
    }

  }
</script>

<style lang="scss">
  .row-equal {
    height: 100%;
  }

  .flex {
    height: 100%;
  }
  .page-bar{
    margin:40px auto;
    margin-top: 150px;

  }
  ul,li{
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style: none
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #5D6062;
    cursor: pointer;
    margin-right: 20px;
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banclick{
    cursor:not-allowed;
  }
  .page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #e96463;
    border-color: #E96463;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>
