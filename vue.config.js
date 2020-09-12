module.exports = {
  lintOnSave:'warning',

  devServer:{
    compress:true, // 服务器压缩
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/'
}