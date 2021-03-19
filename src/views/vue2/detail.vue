<!--
 * @Author: yuanaohua
 * @Date: 2021-03-16 11:13:27
 * @FilePath: /demo-vue3/demo-vue3/src/views/vue2/detail.vue
-->
<template>
  <div class="detail">
   {{data}}
  </div>
</template>

<script>
import listJson from "../../assets/json/list.json";

export default {
  name: 'detail2',
  data() {
    return {
      data:{}
    }
  },
  mounted(){
    let id = Number(this.$route.query.id)
    listJson.map(item =>{
      if(item.id === id){
        this.data = item
      }
    })
  }
}
</script>