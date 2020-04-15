import request from '../../network/request'

Page({
  data:{
    banner:[],
    recommendData:[],
    icon:[
      {class:'rili',name:'每日推荐'},
      {class:'gedan',name:'歌单'},
      {class:'paihangbang',name:'排行榜'},
      {class:'diantai',name:'电台'},
      {class:'zhibo',name:'直播'}
         ]
  },
  onLoad(){
    /* 轮播图数据请求 */
    request({
      url:'/banner',
      data:{ type:2 }
    }).then( res => {
      this.setData({
        banner:res.data.banners
      })
    });
    /* 推荐歌单的内容请求 */
    request({
      url:'/top/playlist',
      data:{
        order:'new',
        limit:6
      }
    }).then(res => {
      console.log(res);
        this.setData({
          recommendData: res.data.playlists
        })
    })
  }
})