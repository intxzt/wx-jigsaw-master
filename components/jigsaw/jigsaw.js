// components/jigsaw/jigsaw.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasWidth: Number,
    canvasHeight: Number
  },
  observers: {
    'canvasWidth,canvasHeight': function(w, h) {
      this.setData({
        canvas_width: w,
        canvas_height: h
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    movable_image: '/images/right_black.png',
    cover_image: '/images/refresh.png',
    url: '/images/4.jpg',
    cover_hidden: false,
    //canvas宽高建议比例2：1
    canvas_width: 300,
    canvas_height: 150,
    //图片滑块位置
    x: 0,
    y: 0,
    //初始化下方滑块位置
    _x: 0,
    //组件左方距离
    left: 0,
    //字体透明度
    opacity: 1,
    im_background: '#ffffff'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getRandomNumberByRange: function(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    },
    initImage: function() {
      const canvas = wx.createCanvasContext("first", this),
        block = wx.createCanvasContext("second", this),
        url = this.data.url,
        w = this.data.canvas_width, //画布宽高
        h = this.data.canvas_height,
        l = 42, // 滑块边长
        r = 9, // 滑块半径
        PI = Math.PI,
        L = l + r * 2 + 3, // 滑块实际边长
        //创建滑块位置
        x = this.getRandomNumberByRange(L + 10, w - (L + 10)),
        y = this.getRandomNumberByRange(10 + r * 2, h - (L + 10))
      this.setData({
        x: x,
        y: y
      })
      //console.log(L)
      canvas.drawImage(url, 0, 0, w, h)
      this.sharp(canvas, x, y, 'fill', l, r, PI);
      canvas.draw()

      this.sharp(block, x, y, 'clip', l, r, PI);
      block.fillStyle = 'rgba(255, 255, 255, 1)';
      block.drawImage(url, 0, 0, w, h)
      block.draw()
      //console.log(canvas._context.canvas.width)画布300*150不可变
      // console.log(x + "---" + y);
    },
    sharp: function(ctx, x, y, operation, l, r, PI) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.stroke();
      ctx[operation]();
      ctx.globalCompositeOperation = 'xor';
    },
    onTouchStart: function(e) {
      //console.log(e)
      this.setData({
        cover_image: '/images/refresh_b.png'
      })
    },
    onTouchEnd: function(e) {
      //console.log(e)
      this.setData({
        cover_image: '/images/refresh.png'
      })
      this.loadImage();
    },
    onStart: function(e) {
      this.setData({
        opacity: 0,
        movable_image: '/images/right_white.png',
        im_background: '#1296db',
        cover_hidden: true
      })
    },
    onEnd: function(e) {
      //console.log(e)
      //console.log(this.data._x)
      let that = this;
      const query = this.createSelectorQuery()
      query.select('#slider').boundingClientRect()
      query.exec(function(res) {
        const limit = Math.abs(res[0].left - that.data.left - that.data.x)
        if (limit < 3) {
          var myEventDetail = {
            "result": true
          } // detail对象，提供给事件监听函数
          that.triggerEvent('myevent', myEventDetail)
        } else {
          that.setData({
            _x: 0,
            opacity: 1,
            movable_image: '/images/right_black.png',
            im_background: '#ffffff',
            cover_hidden: false
          })
        }
      })
    },
    loadImage: function() {
      let that = this
      wx.showLoading({
        title: '图片加载中',
        mask: true,
        success: e => {
          wx.getImageInfo({
            src: 'https://picsum.photos/1200/600/',
            success: function(res) {
              //console.log(res)
              that.setData({
                url: res.path,
              })
              that.initImage();
              wx.hideLoading()
            }
          })
        }
      })
    }
  },
  ready() {
    let that = this;
    const query = this.createSelectorQuery()
    query.select('#slider').boundingClientRect()
    query.exec(function(res) {
      //console.log(res)
      that.setData({
        left: res[0].left
      })
      //console.log(that.data.left)
    })
    this.loadImage()
  },
})