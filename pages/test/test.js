// pages/test/test.js

var timer = require('./wxTimer.js');
console.log(timer)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wxTimer = new timer({
      beginTime: "00:00:10"
    })
    wxTimer.start(this);
    // wxTimer.stop();

    //开启第一个定时器
    var wxTimer1 = new timer({
      beginTime: "00:00:10",
      name: 'wxTimer1',
      complete: function () {
        console.log("完成了")
      }
    })
    wxTimer1.start(this);

    //开启第二个定时器
    var wxTimer2 = new timer({
      beginTime: "00:01:11",
      name: 'wxTimer2',
      complete: function () {
        console.log("完成了")
      }
    })
    wxTimer2.start(this);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})