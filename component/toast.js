let _compData = {
  '_toast_.isHide': false,
  '_toast_.content': ''
}

let toastPannel = {
  show: function(data) {
    let self = this;
    this.setData({
      '_toast_.isHide': true,
      '_toast_.content': 'data'
    })
    setTimeout(function() {
      self.setData({ '_toast_.isHide': false})
    }, 3000)
  }
}

function ToastPannel() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;
  Object.assign(curPage, toastPannel);
  curPage.toastPannel = this;
  curPage.setData(_compData);
  return this;
}

module.exports = {
  ToastPannel
}
