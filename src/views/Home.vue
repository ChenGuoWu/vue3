<!--
 * @Author: guowu
 * @Date: 2021-03-16 11:11:23
 * @FilePath: \demo-vue3\src\views\Home.vue
-->
<template>
  <div class="home">
    <h2>欢迎登陆</h2>
    <el-form :model="ruleForm" label-width="100px">
      <el-form-item label="账号">
        <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:300px" @click="submitForm()">登陆</el-button>
        <!-- <el-button @click="resetForm()">重置</el-button> -->
      </el-form-item>
    </el-form>
    <div>
      <el-radio v-model="checkedvue" label="vue2" border></el-radio>
      <el-radio v-model="checkedvue" label="vue3" border></el-radio>
    </div>
  </div>
</template>

<script>

import useSubmitForm from "@/common/login/submit.js";
import useResForm from "@/common/login/rest.js";
export default {
  name: "Home",
  setup(props, context) {
   
    // 将响应式对象return出去，暴露给模板使用
    let { ruleForm, resetForm } = useResForm();
    let { submitForm, checkedvue } = useSubmitForm(ruleForm);
    return { submitForm, checkedvue, ruleForm, resetForm };
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 30%;
  margin: 0 auto;
}
::v-deep .el-form-item__label {
  text-align: left;
}
::v-deep .el-form-item__content {
  margin: 0 !important;
}
</style>