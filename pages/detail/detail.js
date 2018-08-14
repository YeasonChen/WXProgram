// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    productData: null,
    imageName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '搜索中...',
    })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var imageName = null;
        if (res.system.indexOf("iOS") >= 0) {
          imageName = "\"../../Image/netError@2x.png\"";
        } else {
          imageName = "\"../../Image/netError@3x.png\"";
        }
        that.setData({
          imageName: imageName,
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    }),

    //请求数据
    wx.request({
      url: app.globalData.apiHost + 'detail?id=' + options.productId,
      success: function (res) {
        wx.hideLoading();
        that.setData({
          productData: res.data.body
        })
      },
      fail: function (res) {
        wx.hideLoading();
        if (that.data.imageName === "../../Image/netError@2x.png") {
          wx.showToast({
            title: '网络错误',
            mask: true,
            image: "../../Image/netError@2x.png"
          })
        } else {
          wx.showToast({
            title: '网络错误',
            mask: true,
            image: "../../Image/netError@3x.png"
          })
        }
      }
    })
  },
})

