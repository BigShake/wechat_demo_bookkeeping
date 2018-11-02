
Page({
  data: {
    text: "有只叫鱼骨头的猫",
    author: 18052018623
  },

  copyBtn: function () {
    wx.setClipboardData({
      data: this.data.text, 
      success: function (res) { 
        wx.showToast({ 
          title: '已复制' 
        })
      } 
    }) 
  },

   /** 
    * 图片预览方法
    * 此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦 
    * 当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！ 
  */ 
  previewImage: function(e) {
    wx.previewImage({
      urls: ["../icon/thanks.png"]
    }) 
  },
  
  gotoMyweichat: function(){
    wx.navigateTo({
      url: '../index/index'
    })
  }
})