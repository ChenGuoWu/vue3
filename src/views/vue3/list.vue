
<template>
  <div>store：{{username}}</div>
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
      ></el-switch>
      <el-select
        v-show="!isPaging"
        v-model="ManualNumber"

        filterable
        allow-create
        placeholder="请选择条数"
        @change="changeManualNumber"
        class="ManualSelect"
      >
        <el-option
          v-for="(item,index) in [10,50,100,200,300]"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="describe" label="描述" width="180"></el-table-column>
      <el-table-column prop="price_in" label="进货价格（原生）" width="230">
        <template #default="scope">
          <input v-model="scope.row.price_in" placeholder="请输入进货价格" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="售卖价格(element组件)" width="230">
        <template #default="scope">
          <el-input v-model="scope.row.price" placeholder="请输入售卖价格"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="select" label="下拉选项" width="230">
        <template #default="scope">
          <el-select v-model="scope.row.select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="upload" label="上传" width="180">
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
            <el-button size="small" type="primary">点击上传 {{scope.row.upload}}</el-button>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import listJson from "../../assets/json/list.json";
import { ref,reactive,computed} from "vue";
import { ElMessage ,ElConfirm} from 'element-plus'
import { onBeforeMount, onMounted,onBeforeUpdate, onUpdated, onBeforeUnmount,onUnmounted } from "vue";
import {useRouter, onBeforeRouteLeave,onBeforeRouteUpdate} from 'vue-router';
import { useStore } from 'vuex'
export default {
  name: 'list3',
  setup(){
    const router = useRouter();
    const isPaging=ref(true)
    const ManualNumber=ref(10)
    const store = useStore()
    
    let username = computed(() => store.state.vue3.username || localStorage.getItem('username'))
    const pager=reactive({  page: 1,
        rows: 10,
        total: 0})
    const fileList=reactive([
        {name: 'food.jpeg', 
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      ])
      const options=reactive([{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
      }])
      let tableData=reactive({list:[]})
      let listJsons=reactive(listJson)
      tableData.list = listJson.slice(0,10)

      //menth方法
      const rowClick=(id)=>{
      router.push({
        path: '/detail3',
        query: {id: id}
      });
    }
     const changeManualNumber=(data)=> {
     
      tableData.list = listJson.slice(0,data)
      
    }
    const changeSwitch=(data)=> {
      console.log(data);
      tableData.list = listJson.slice(0,10)
      pager.rows = 10;
      pager.page = 1;
    }
    const handleRemove=(file, fileList) =>{
      console.log(file, fileList);
    }
    const handlePreview=(file) =>{
      console.log(file);
    }
    const handleExceed=(files, fileList)=> {
      ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
    const beforeRemove=(file, fileList)=> {
      ElConfirm(`确定移除 ${ file.name }？`);
    }
    const handleSizeChange=(rows)=> {
      pager.rows = rows;
      console.log(`每页 ${rows} 条`,`当前页: ${pager.page}`);
      getData()
    }
    const handleCurrentChange=(val)=> {
      pager.page = val;
      getData()
      console.log(`每页 ${pager.rows} 条`,`当前页: ${val}`);
    }
    const getData=()=>{
      let start = pager.rows  * (pager.page- 1)
      let end = pager.rows*pager.page
      console.log(start,"-",end)
      tableData.list = listJson.slice(start,end)
    }
     onBeforeMount(() => {
      console.log("onBeforeMount");
      if( username.value ){
        localStorage.setItem( 'username', username.value )
      }
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onBeforeRouteUpdate((to, from) => {
      //当前组件路由改变后，进行触发
      console.log(to);
    });
    onBeforeRouteLeave((to, from) => {
      //离开当前的组件，触发
      alert("我离开啦");
    });
    return { ManualNumber,username, isPaging, pager, fileList ,options,tableData,listJsons,rowClick,changeManualNumber,changeSwitch,handleRemove,handlePreview,handleExceed,beforeRemove,handleSizeChange,handleCurrentChange,getData};
  }


}
</script>


<style lang="scss" scoped>
.switch {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid rgb(207, 207, 207);
  margin-bottom: 30px;
}
.pagination_box {
  margin-top: 20px;
}
.ManualSelect {
  margin-left: 30px;
}
</style>
