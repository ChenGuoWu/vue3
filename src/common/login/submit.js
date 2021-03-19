/*
 * @Author: your name
 * @Date: 2021-03-17 10:21:04
 * @LastEditTime: 2021-03-17 15:46:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-vue3\src\common\login\submit.js
 */
import {  ref,getCurrentInstance,   } from "vue";
import { useRouter } from "vue-router";
const useSubmitForm = (ruleForm,cabck) => {
    const router = useRouter();
    const checkedvue = ref("vue3"); 
    const {ctx}=getCurrentInstance()
    let updataLogin;
    const submitForm = () => {
      if (checkedvue.value == "vue3") {
        //存入store
         updataLogin=()=>{
          ctx.$store.commit('vue3/updata',ruleForm)
        }
        updataLogin()
        router.push({
          path: "list3",
        });
      }
      if (checkedvue.value == "vue2") {
        router.push({
          path: "list2"
        });
      }
    };
    return { submitForm, checkedvue };
  };
  export default useSubmitForm