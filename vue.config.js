/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const gitRevision = require('git-revision')
const os = require('os')
const ciDetect = require('@npmcli/ci-detect')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'cn.zhangzisu.classroom-helper',
        productName: '课堂助手'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        GIT_HASH: JSON.stringify(gitRevision('hash')),
        GIT_BRANCH: JSON.stringify(gitRevision('branch')),
        BUILD_DATE: JSON.stringify((new Date()).toLocaleString()),
        BUILD_MACHINE: JSON.stringify(ciDetect() || os.hostname())
      })
    ]
  }
}
