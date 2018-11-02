//index.js
Page({
  data: {
  },
  previewImage: function(e) {
    wx.previewImage({
      urls: ["../icon/mywechat.png"]
    }) 
  }
})
