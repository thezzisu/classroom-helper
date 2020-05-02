module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'cn.zhangzisu.classroom-helper',
        productName: 'Classroom Helper'
      }
    }
  }
}
