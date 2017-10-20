export default class Share {
  wx; //js wx对象
  isFinish = false; //是否有完成配置
  wxSdkUrl = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
  shareApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']; //微信注册分享API

  finishCallback;

  writeScript() {
    return new Promise((resolve, reject) => {
      let s = document.createElement('script');
      s.src = this.wxSdkUrl;
      s.onload = () => resolve(window.wx)
      document.body.appendChild(s);
    });
  }

  /**配置 */
  config(signature) {
    if (!/micromessenger/.test(window.navigator.userAgent.toLowerCase())) return;

    if (!this.wx) {
      return this.writeScript().then((wx) => {
        this.wx = wx;
        return this.config(signature);
      });
    }

    return new Promise((resolve, reject) => {
      this.wx.ready(() => { //第一次微信配置
        this.isFirst = false;
        if (!this.wxError) { //配置完成
          console.log('wx config success')
          this.isFinish = true;
          this.finishCallback && this.finishCallback();
          resolve("ok");
        } else {
          reject("wx config error:" + this.wxError);
        }
      });

      this.wx.error(res => {
        this.wxError = res;
        console.warn(this.wxError);
      });
      this.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: signature.appId, // 必填，公众号的唯一标识
        timestamp: signature.timestamp, // 必填，生成签名的时间戳
        nonceStr: signature.nonceStr, // 必填，生成签名的随机串
        signature: signature.signature, // 必填，签名
        jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          'onMenuShareTimeline', //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
          'onMenuShareWeibo', // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
          'onMenuShareQZone', // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
          'hideMenuItems'
        ]
      });
    });
  }

  /**
   * 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   * @param {*} menuList 
   */
  hideMenuItems(menuList) {
    if (this.isFinish) {
      this.wx.hideMenuItems({
        menuList: menuList
      });
    }
  }

  /**
   * 分享参数，具体参数查看wechatApi
   * @param {*} params 
   */
  setShareParams(params) {
    return new Promise((resolve, reject) => {
      if (this.isFinish) {
        console.log('set share params')
        this.shareApiList.forEach((res, i) => {
          this.wx[res]({...params,
            link: typeof params.link === 'function' ? params.link(res, i, this.shareApiList) : (params.link || location.href)
          });
        });
      } else {
        this.finishCallback = ()=> {
            this.setShareParams(params)
        }
      }
    });
  }
}
