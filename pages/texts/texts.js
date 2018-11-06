// pages/texts/texts.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textDatas: [],
    prev: "",
    buttonShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      success: function (backData) {
        console.log(backData);
        var datasCurrent = backData.data.data;
        console.log(datasCurrent);
        datasCurrent.content = datasCurrent.content.replace(/<\/p>/g, "\n").replace(/<p>/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        var userData = that.data.textDatas;
        var qian = datasCurrent.date.prev;
        var hou = datasCurrent.date.next;
        userData.push(datasCurrent);
        that.setData({
          textDatas: userData,
          prev: qian,
          next: hou,
          buttonShow: true          
        });
        //回到顶部
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
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
  onShareAppMessage: function (res) {
    return {
      title: '每日一文',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          duration: 2000
        })
      }
    }
  },

  prev: function (e) {
    console.log(e);
    var infoPrev = e.currentTarget.dataset.info;
    this.getDatas(infoPrev);
  },
  next: function (e) {
    console.log(e);
    var infoNext = e.currentTarget.dataset.info;
    if (infoNext != undefined) {
      this.getDatas(infoNext);
    }
  },
  
  getDatas: function (time) {
    var that = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/day?dev=1',
      data: {
        date: time
      },
      success: function (backData) {
        // console.log(backData);
        if (backData.statusCode == 404) {
          wx.showModal({
            title: '小可爱',
            content: '已经没有了哟',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else {
          var datasCurrent = backData.data.data;
          // console.log(datasCurrent);
          datasCurrent.content = datasCurrent.content.replace(/<\/p>/g, "\n").replace(/<p>/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
          var userData = that.data.textDatas;
          var qian = datasCurrent.date.prev;
          var hou = datasCurrent.date.next;
          userData[0] = datasCurrent;
          that.setData({
            textDatas: userData,
            prev: qian,
            next: hou,
            buttonShow: true
          });
          //回到顶部
          wx.pageScrollTo({
            scrollTop: 0
          })
        }
      }
    })
  }
})