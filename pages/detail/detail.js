// pages/detail/detail.js
import request from '../../network/request';
let innerAudioContext =  wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songdetail:[],
    state: true,
    music_length: "",
    current: "",
    pauseState:"liebiaoxunhuan",
    State_number: 1,
    progress:0,
    songs:[],
    currentId: 0
  },
  
  onLoad: function (options) {
    this.setData({
      songs: wx.getStorageSync('songs')
    })
    // /* 初始化播放状态 */
    // this.currentPauseState();
    /* 初始化播放音乐 */
    this.initMusic(options.ids);
    /* 监听是否是播放状态 */
    innerAudioContext.paused ? this.resetInstance() : "";
    /* 监听音频是否播放结束 */
  },
  initMusic(id) {
    this.setData({currentId: id});
    request({
      url:'/song/detail?ids='+id
    }).then(res => {
      this.setData({
        songdetail: res.data.songs[0]
      })
      request({
        url:"/song/url?id="+this.data.songdetail.id
      }).then(res => {
        innerAudioContext.autoplay = true;
        innerAudioContext.src = res.data.data[0].url;
         /* 初始化音频长度 */
          innerAudioContext.onPlay(() => {
           setTimeout(() => {
            const minutes = parseInt(innerAudioContext.duration / 60);
            const seconds = parseInt(innerAudioContext.duration % 60);
            this.setData({
              music_length: `0${minutes}:${this.format(seconds)}`
            })
           }, 200);
          });
          /* 更新加载进度 */
          innerAudioContext.onTimeUpdate(() => {
            const minutes = parseInt(innerAudioContext.currentTime / 60);
            const seconds = parseInt(innerAudioContext.currentTime % 60);
            const progress = (innerAudioContext.currentTime / innerAudioContext.duration)*100 + '%';
            this.setData({
              current: `0${minutes}:${this.format(seconds)}`,
              progress: progress
            });
          });
          /* 播放结束进行下一首 */
          innerAudioContext.onEnded(() => {
            switch (this.data.State_number) {
              case 1:
                console.log('顺序播放');
                this.cardLoop(id);
                break;
              case 2:
                console.log('随机播放');
                this.randomPause();
                break;
              case 3:
                console.log('单曲循环');
                innerAudioContext.play();
                break;
              case 4: 
                this.randomPause();
                break;
            }
          });
      })
    })
  },
  /* 播放模式状态开关 */
  currentPauseState() {
    let value = '';
    switch (this.data.State_number) {
      case 1:
        value = 'liebiaoxunhuan';
        break;
      case 2:
        value = 'suijibofang';
        break;
      case 3:
        value = 'danquxunhuan';
        break;
      case 4:
        value = 'huaban';
        break;
    }
    this.setData({pauseState: value});
  },
  /* 播放模式 */
  changePauseModel() {
    this.setData({State_number: this.data.State_number+1})
    this.data.State_number > 4 ? this.setData({State_number: 1}) : '';
    this.currentPauseState();
  },
  /* 列表循环播放模式 */
  cardLoop(id) {
    const index = this.toggleHandel(id);
    index+1 > this.data.songs.length ? this.initMusic(this.data.songs[0].id) : this.initMusic(this.data.songs[index+1].id);
  },
  /* 随机播放模式 */
  randomPause() {
    const index = Math.ceil(Math.random(this.data.songs.length-1));
    this.initMusic(this.data.songs[index].id);
  },
  /* 上一首 */
  preMusic() {
    this.data.state ? '' :  this.setData({state: true});
    const index = this.toggleHandel(this.data.currentId);
    index-1 < 0 ? this.initMusic(this.data.songs[this.data.songs.length-1].id) : this.initMusic(this.data.songs[index-1].id);
  },
  /* 下一首 */
  nextMusic() {
    this.data.state ? '' :  this.setData({state: true});
    const index = this.toggleHandel(this.data.currentId);
    index+1 > this.data.songs.length - 1 ? this.initMusic(this.data.songs[0].id) : this.initMusic(this.data.songs[index+1].id);
  },
  toggleHandel(id) {
    let index = 0;
    this.data.songs.forEach((song, i) => {
      if(song.id == id) {
        return index = i;
      }
    });
    return index;
  },
  resetInstance() {
      innerAudioContext.destroy();
      innerAudioContext = wx.createInnerAudioContext();
  },
  /* 播放暂停切换 */
  HandelState() {
    this.data.state ? innerAudioContext.pause() : innerAudioContext.play();
    this.setData({
      state: !this.data.state
    })
  },
  /* 格式校正 */
  format(val) {
    return val >= 10 ? val : "0"+val;
  }
})