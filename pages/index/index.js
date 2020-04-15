import request from '../../network/request'

Page({
  data:{
    banner:[],
    recommendData:[],
    songData:[],
    tabcontorl:['我的', '发现', '云村', '视频'],
    icon:[
      {class:'rili',name:'每日推荐'},
      {class:'gedan',name:'歌单'},
      {class:'paihangbang',name:'排行榜'},
      {class:'diantai',name:'电台'},
      {class:'zhibo',name:'直播'}
         ],
         currentIndex:1
  },
  onLoad(){
    /* 轮播图 */
    request({
      url:'/banner',
      data:{ type:1 }
    }).then( res => {
      this.setData({
        banner:res.data.banners
      })
    });
    /* 推荐歌单的内容 */
    request({
      url:'/personalized?limit=6',
      
    }).then(res => {
        this.setData({
          recommendData: res.data.result
        })
    });
    request({
      url:'/personalized/newsong'
    }).then(res => {
      this.setData({
        songData:res.data.result
      })
    })
  },
  /* 切换子页 */
  handelClick(e) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
  }
})