// pages/timer/timer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalTimeStr : "0",
    isTiming : false,
    checkOk : false,
    jobList:[
      { id: 0, name: 'haha1' },
      { id: 1, name: 'haha2' },
      { id: 2, name: 'haha3' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  
  listPush: function(e) {
    console.log(e)
    var myList = this.data.jobList
    myList.push({})
    this.setData({
      jobList: myList
    })
    this.updateTotalTime()
    this.updateCheckOK()
  },
  listPop: function (e) {
    console.log(e)
    var myList = this.data.jobList
    myList.pop()
    this.setData({
      jobList: myList
    })
    this.updateTotalTime()
    this.updateCheckOK()
  },
  bindInput: function(e) {
    console.log(e)
    let id = e.currentTarget.id
    let value = e.detail.value
    let jobList = this.data.jobList
    jobList[id].inputTime = value
    console.log(jobList[id])
    this.setData({
      jobList : jobList
    })
    this.updateTotalTime()
    this.updateCheckOK()
  },
  updateTotalTime : function(){
    let totalTime = 0;
    let jobList = this.data.jobList
    jobList.forEach(function (currentValue, index, arr) {
      let inputTime = Number(currentValue.inputTime) || 0
      totalTime += inputTime
    })

    this.setData({
      totalTimeStr: totalTime
    })
  },
  updateCheckOK : function(e) {
    let checkOk = true
    let jobList = this.data.jobList
    jobList.forEach(function (currentValue, index, arr) {
      let inputTime = Number(currentValue.inputTime) || 0
      if (inputTime <= 0) {
        checkOk = false
      }
    })
    this.setData({
      checkOk: checkOk
    })
  },
  btnStart : function(e) {
    console.log(e)


    if (!this.data.checkOk) {
      wx.showToast({
        title: '每个任务应大于0min',
        icon:'none',
      })
      return 
    }


    this.setData({
      isTiming : true
    })
  },
  btnStop : function(e) {
    console.log(e)
    this.setData({
      isTiming : false
    })
  }
})