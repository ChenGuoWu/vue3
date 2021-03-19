<!--
 * @Author: yuanaohua
 * @Date: 2021-03-16 11:13:18
 * @FilePath: \demo-vue3\src\views\vue2\list.vue
-->
<template>
  <div class="list">
    <!-- 
      -  文字
      -  描述
      -  input(原生、UI框架)
      -  下拉
      -  上传 
    -->
    <div class="switch">
     <span>展示方式：</span> 
      <el-switch
        v-model="isPaging"
        active-color="#13ce66"
        inactive-color="#3c8cff"
        active-text="分页"
        inactive-text="不分页"
        @change="changeSwitch"
        >
      </el-switch>
       <el-select 
        v-show="!isPaging"
        v-model="ManualNumber" 
        placeholder="请选择条数" 
        filterable
        allow-create
        
        @change="changeManualNumber"
        class="ManualSelect"
        >
        <el-option
          v-for="(item,index) in [10,50,100,200,300]"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="tableData" 
      style="width: 100%">
       <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
       <el-table-column
        prop="describe"
        label="描述"
        width="180">
      </el-table-column>
       <el-table-column
        prop="price_in"
        label="进货价格（原生）"
        width="230">
         <template #default="scope">
          <input v-model="scope.row.price_in" placeholder="请输入进货价格" />
        </template>
      </el-table-column>
       <el-table-column
        prop="price"
        label="售卖价格(element组件)"
        width="230">
         <template #default="scope">
          <el-input v-model="scope.row.price" placeholder="请输入售卖价格"></el-input>
        </template>
      </el-table-column>
       <el-table-column
        prop="select"
        label="下拉选项"
        width="230">
        <template #default="scope">
          <el-select v-model="scope.row.select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
       <el-table-column
        prop="upload"
        label="上传"
        width="180">
         <template #default="scope">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传 {{scope.row.upload}} </el-button>
          </el-upload>
        </template>
      </el-table-column>
       <el-table-column prop="upload" label="详情" width="180">
        <template #default="scope">
            <el-button size="small" type="primary" @click="rowClick(scope.row.id)" >详情</el-button>
        </template>
      </el-table-column>
    </el-table> 
     <div class="pagination_box" v-show="isPaging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pager.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listJsons.length"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import listJson from "../../assets/json/list.json";

export default {
  name: 'list2',
   data() {
    return {
      isPaging:true,
      ManualNumber: 10,
      pager: {
        page: 1,
        rows: 10,
        total: 0
      },
      fileList: [
        {name: 'food.jpeg', 
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      ],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
      }],
      tableData: [],
      listJsons:listJson
    }
  },
  beforeCreate(){
    console.log("beforeCreate!!!")
  },
  created(){
    console.log("created!!!")
  },
  beforeMount(){
    console.log("beforeMount!!!")
  },
  mounted(){
    console.log("mounted!!!")
    this.tableData = listJson.slice(0,10)
    // let arr = []
    // for(var i=1;i <= 300;i++){
    //     arr.push({
    //       "id": i,
    //       "name": "card"+i,
    //       "describe": "blue",
    //       "price_in": "8000",
    //       "price": "10000",
    //       "select": "",
    //       "upload": ""
    //     })
    // }
  },
  beforeUpdate(){
    console.log("beforeUpdate!!!")
  },
  updated(){
    console.log("updated!!!")
  },
  activated(){
    console.log("activated!!!")
  },
  deactivated(){
    console.log("deactivated!!!")
  },
  // beforeDestroy(){
  //   console.log("beforeDestroy!!!")
  // },
  // destroyed(){
  //   console.log("destroyed!!!")
  // },
  errorCaptured(){
    console.log("errorCaptured!!!")
  },
  methods: {
    rowClick(id){
      console.log(id)
      this.$router.push({
        path: '/detail2',
        query: {id: id}
      });
    },
    resetManualNumber(data) {
    },
    changeManualNumber(data) {
      this.tableData = listJson.slice(0,data)
    },
    changeSwitch(data) {
      console.log(data);
      this.tableData = listJson.slice(0,10)
      this.pager.rows = 10;
      this.pager.page = 1;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSizeChange(rows) {
      this.pager.rows = rows;
      console.log(`每页 ${rows} 条`,`当前页: ${this.pager.page}`);
      this.getData()
    },
    handleCurrentChange(val) {
      this.pager.page = val;
      this.getData()
      console.log(`每页 ${this.pager.rows} 条`,`当前页: ${val}`);
    },
    getData(){
      let start = this.pager.rows  * (this.pager.page- 1)
      let end = this.pager.rows*this.pager.page
      console.log(start,"-",end)
      this.tableData = listJson.slice(start,end)
    },
  }
}
</script>


<style lang="scss" scoped>
.switch{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}
.pagination_box{
  margin-top: 20px;
}
.ManualSelect{
  margin-left: 30px;
}
</style>
