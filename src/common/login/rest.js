import {  reactive, } from "vue";
const useResForm = () => {
    const ruleForm = reactive({ username: "", password: "" });
    const resetForm = () => {
      ruleForm.username = "";
      ruleForm.password = "";
    };
    return { ruleForm, resetForm };
  };
  export default useResForm