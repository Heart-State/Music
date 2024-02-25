import Message from './message.js'
export default {
  install(app){
  // 如果你想挂载全局的属性，能够通过组件实例调用的属性 this.$message
     // 扩展一个实例方法
      app.config.globalProperties.$message = Message // 原型函数
  }
}
