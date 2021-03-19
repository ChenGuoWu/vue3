/*
 * @Author: your name
 * @Date: 2021-03-16 11:11:23
 * @LastEditTime: 2021-03-17 14:35:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-vue3\src\store\index.js
 */
import { createStore } from 'vuex'
import vue2 from './modules2/index.js'
import vue3 from './modules3/index.js'
export default createStore({
  state: {
   name:123
  },
  mutations: {
    ceshi(state){
      state.name=123
    }
  },
  modules: {
    vue2, vue3
  }
})
