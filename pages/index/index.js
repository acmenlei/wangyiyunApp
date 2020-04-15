import request from '../../network/request'

Page({
  data:{
    banner:[],
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
      console.log(res);
      
      this.setData({
        banner:res.data.banners
      })
    })
  }
})