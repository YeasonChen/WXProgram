// pages/home/home.js

const app = getApp()

Page({
  data: {
    //屏幕宽高
     width: 375,
     height: 603,
     selectedId: 0,  //选中的index
     allData: null,     //主页所有的数据  
     contentArrayM: null,   //当前选中的右侧数据
     imageName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载框
    wx.showLoading({
      title: '加载中...',
    })

    //获取宽高
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
    });

    //获取主页信息
    wx.request({
      url: app.globalData.apiHost + 'hot',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          allData: res.data.body,
          contentArrayM: res.data.body.content[0]          
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
    
  gotoSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    }) 
  },

  typeDetail: function (event) {
    wx.navigateTo({
      url: '../products/products?keyword=' + event.currentTarget.dataset.keyword
    })
  },

  selectedMenu: function (event) {
    var curData = this.data.allData.content[event.currentTarget.dataset.index];
    this.setData({
      selectedId: event.currentTarget.dataset.index,
      contentArrayM: curData
    })
  }
})