/*
 * @Author: your name
 * @Date: 2021-03-17 11:38:30
 * @LastEditTime: 2021-03-17 15:12:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-vue3\src\store\modules3\index.js
 */
const vue3 = {
    namespaced: true,
    state: {
        username:'',
        password:'',
    },
    getters: {
     
    },
    mutations: {
        updata(state,value){
            console.log(value.username)
            state.username= value.username;
            state.password= value.password;
        }
    },
    actions: {
    
    }
  }
  
  export default vue3