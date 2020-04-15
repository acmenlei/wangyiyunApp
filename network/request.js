export default function request(options) {
  const BaseURL = 'http://localhost:3000'
  return new Promise( (resolve, reject) => {
    wx.request({
      url: BaseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: (res) => {
        resolve(res);
      },
      fail: (reason) => {
        reject(reason)
      }
    })
  })
}