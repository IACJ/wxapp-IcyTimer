// pages/timer/timer.js

var timer = require('./wxTimer.js');
console.log(timer)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalTime : 0,
    isTiming : false,
    checkOk : false,
    jobList:[{},{},{},],
    wxTimerList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })



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
    console.log('onShow calibration.')
    this.currentWxTimer && this.currentWxTimer.calibration()
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
    var jobList = this.data.jobList
    if (jobList.length <=1) {
      return
    }
    jobList.pop()
    this.setData({
      jobList: jobList
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
      totalTime: totalTime
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
    let totalTime = this.data.totalTime
    if (totalTime >= 1440) {
      wx.showToast({
        title: '总时长应小于1天',
        icon: 'none',
      })
      return 
    }

    this.doNextJob(0)

    this.setData({
      isTiming : true
    })
  },
  btnStop : function(e) {
    console.log(e)
    this.currentWxTimer.stop()
    this.setData({
      isTiming : false
    })
  },
  reSet : function(e) {
    console.log(e)
    let jobList = []
    jobList.push({},{},{})
    this.setData({
      jobList : jobList
    })
    this.updateTotalTime()
    this.updateCheckOK()
  },
  doNextJob: function(i) {
    let jobList = this.data.jobList

    if (i >= jobList.length) {
      wx.showToast({
        title: '完成所有任务！',
        icon: 'none',
      })
      wx.vibrateLong()
      setTimeout(wx.vibrateLong, 1000)
      setTimeout(wx.vibrateLong, 2000)
      setTimeout(wx.vibrateLong, 3000)
      setTimeout(wx.vibrateLong, 5000)
      that.dingDingDing()
      return
    }
    let inputTime = jobList[i].inputTime
    let timeStr = this.min2hms(inputTime)
    this.setData({
      i : i
    })
    
    let that = this
    this.currentWxTimer = new timer({
      beginTime: timeStr,
      complete: function(e) {
        console.log('完成任务'+(i+1))
        wx.showToast({
          title: '完成任务'+(i+1),
          icon: 'none',
          duration: 3000,
        })
        wx.vibrateLong()
        setTimeout(wx.vibrateLong, 1000)
        setTimeout(wx.vibrateLong, 2000)
        that.dingDingDing()
        that.doNextJob(i+1)
      }
    })
    this.currentWxTimer.start(this);
  },
  min2hms: function(min){
    let thatTime = new Date("1970/01/01 00:00:00").getTime();
    let thisTime = new Date(thatTime + 1000 * 60 * min);
    let thisTimeStr = thisTime.toString().substr(16, 8);//去掉前面的年月日就剩时分秒了
    return thisTimeStr
  },
  dingDingDing: function(){
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.obeyMuteSwitch = false
    innerAudioContext.src = '/voice/voice.mp3';//链接到音频的地址
    innerAudioContext.play()
  }
})