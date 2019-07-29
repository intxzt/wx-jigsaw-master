// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootpath: 'https://www.easy-mock.com/mock/5d3e4bc97da00169ffec0a1a/',
    name: 'admin',
    password: '1234'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const ctx = wx.createCanvasContext('mycanvas')
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 10)
    ctx.lineTo(100, 100)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.draw()

  },
  modal: function(title, content) {
    wx.hideLoading()
    wx.showModal({
      title: title,
      content: content,
      success(res) {}
    })
  },
  myEventListener: function(e) {
    let that = this
    //console.log(e.detail.result)
    if (e.detail.result) {
      wx.showLoading({
        title: '登录中',
        wx: wx.request({
          url: that.data.rootpath + 'login/?name=' + that.data.name + '&password=' + that.data.password,
          success: res => {
            if (res.data.data.user.status) {
              that.modal('登陆成功', '')
            } else {
              that.modal('登陆失败', '用户名或密码错误')
            }
            //console.log(res.data.data.user.status)
          }
        })
      })
    }
  },
  onlost: function(e) {
    //console.log(e)
    if (e.target.id == "name") {
      this.setData({
        name: e.detail.value
      })
    } else if (e.target.id == "password") {
      this.setData({
        password: e.detail.value
      })
    }
    //console.log(this.data.name + "--" + this.data.password)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})