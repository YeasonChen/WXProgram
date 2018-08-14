// pages/search/search.js
const app = getApp()
Page({
  data: {
    value: '',
    marginRight: 5,
    iconLeft: 60,
    placeHolderLeft: 70,
    hiddenCancelBtn: false,
    focus: true,
    titles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiHost + 'hotKey',
      success: function (res) {
        var keyArray = res.data.body;
        var titleArray = [];
        for (var i = 0; i < keyArray.length; i++) {
            titleArray.push(keyArray[i].name);
        }
        that.setData({
          titles: titleArray
        })
      }
    })
  },

  /**
   * 搜索
   */
  confirm: function (event) {
    var string = '../products/products?keyword=' + event.detail.value + '&fromSearch=1';
    wx.navigateTo({
      url: string
    })
  },

  hotSearch: function (event) {
    var string = '../products/products?keyword=' + event.currentTarget.dataset.keyword + '&fromSearch=1';
    wx.navigateTo({
      url: string
    })
  },

  inputing: function (event) {
    this.setData({
      value: event.detail.value
    })
  },

  /**
   * 开始输入
   */
  beganInput: function () {
    this.setData({
      hiddenCancelBtn: false,
      focus: true,
      marginRight: 5,
      iconLeft: 60,
      placeHolderLeft: 70
    })
  },

  /**
   * 取消搜索按钮点击
   */
  cancelSearch: function () {
    this.setData({
      focus: false,
      hiddenCancelBtn: true,
      marginRight: 30,
      iconLeft: 170,
      placeHolderLeft: 190,
      value: '',
    })
  }
})
