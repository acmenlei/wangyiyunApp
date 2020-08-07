// components/recommedY/recommedY.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songData: {
      type:Array
    },
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelClickDetailPage(e) {
      const id = e.currentTarget.dataset.song_id
        wx.navigateTo({
          url: '../../pages/detail/detail?ids='+id
        });
        wx.setStorageSync('songs', this.properties.songData);
    }
  }
})
