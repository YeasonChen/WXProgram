// pages/products/products.js
const app = getApp()
Page({
  data: {
    fromSearch: false,      //是否来自搜索
    hiddenToast: true,      //是否隐藏Toast
    width: 0,
    height: 0,
    count: 0,
    cellHeight: 742,        //cell的高度，用于适配
    countArray: [],         //页面数据
    curPage: 1,             //当前页数,用于分页数据
    keyWord: '',            //查找的关键字
    isLoading: false,       //是否在加载中
    imageName: null ,       //用于适配显示的图片
    animationData: null     //Toast动画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({// 设置搜索的关键字
      keyWord: options.keyword
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        // 适配小屏幕时高度不够的情况
        var norCellHeight = 718;
        if (windowWidth < 375) {
          norCellHeight = 800;
        }
        var imageName = null;
        if (res.system.indexOf("iOS") >= 0) {
          imageName = "\"../../Image/netError@2x.png\"";
        } else {
          imageName = "\"../../Image/netError@3x.png\"";
        }
        // 根据是否来自搜索显示搜索框
        var fromSearch = false;
        if (options.fromSearch == '1') {
          fromSearch = true;
          windowHeight = res.windowHeight - 52;
        }
        that.setData({
          width: windowWidth,
          height: windowHeight,
          cellHeight: norCellHeight,
          fromSearch: fromSearch,
          imageName: imageName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '搜索中...',
    })
    this.getDataWithPage(this.data.keyWord, this.data.curPage)
  },

  /**
   * 商品详情
   */
  gotoDetail: function (event) {
    var string = '../detail/detail?productId=' + event.currentTarget.dataset.productid;
    wx.navigateTo({
      url: string
    })
  },

  /**
   * 返回搜索
   */
  gotoSearch: function () {
    wx.navigateBack()
  },

  /**
   * 上拉加载
   */
  searchScrollLower: function () {
    if (this.data.isLoading === false) {
      this.getDataWithPage(this.data.keyWord, this.data.curPage);
      this.setData({
        isLoading: true
      })
    }
  } ,

  getDataWithPage: function (keyWord, page) {
    var that = this;
    wx.request({
      url: app.globalData.apiHost + 'search?keyword=' + keyWord + '&p=' + page,
      success: function (res) {
        var d = res.data.body;
        if (d == undefined) {// 判断没有更多数据的时候
          if (that.data.curPage === 1) {//第一次加载就没有数据的情况
            wx.hideLoading();

            var animation = wx.createAnimation({
              duration: 1000,
              timingFunction: 'ease',
            })
            //显示动画
            that.animation = animation;
            animation.opacity(1, 0).step();
            that.setData({
              animationData: animation.export()
            })
            //隐藏动画
            setTimeout(function () {
              animation.opacity(0, 1).step();
              that.setData({
                animationData: animation.export()
              })
            }.bind(that), 2000)

            // 用于返回搜索页
            setTimeout(function () {
              wx.navigateBack();
            }.bind(that), 3000)
          }
        } else {
          wx.hideLoading();
          var count = that.data.count + res.data.body.length;
          var newArray = that.data.countArray.concat(res.data.body);
          that.setData({
            isLoading: false,
            hiddenToast: false,
            count: count,
            countArray: newArray,
            curPage: that.data.curPage + 1
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        that.setData({
          isLoading: false
        })
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
  }

})