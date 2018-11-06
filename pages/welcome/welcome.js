const app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {
      avatarUrl: '/pages/icon/5.png'
    },
    text: "寻一方净土"
  },
  goToIndex() {
    wx.switchTab({
      url: '../post/post',
    });
  },
  onLoad() {

  },
  onReady() {
    setTimeout(() => {
      this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange((res) => {
      let angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (this.data.angle !== angle) {
        this.setData({
          angle: angle
        });
      }
    });
  },
  onShow() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
  }
});