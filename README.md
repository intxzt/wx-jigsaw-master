# wx-jigsaw-master
微信小程序滑动验证组件

# 一些说明
- copy componments目录，然后按自定义组件方式(详见官方文档)使用，如
```
<jigsaw></jigsaw>
```
- 可自定义的样式属性有canvasWidth、canvasHeight以及监听事件bindmyevent
- canvasWidth、canvasHeight默认300*150，修改此值可能需要更新组件css样式
- 注意监听事件我只定义了一个返回值（e.detail.result）为布尔类型，**将在滑动验证成功时触发此事件**
- 调用了两个接口，easymock（登录假数据）和picsum.photos（获取图片），调试注意关闭域名检测
- 加载图片有点慢，因为要调wx.getImageinfo接口缓存图片，如果不缓存图片而直接canvas调网络图片真机不能正常显示。
- 滑块真机调试卡顿已解决（使用wxs响应事件），避免在频率刷新高的事件中使用this.setData

# 允许所有团体和个人修改和使用，转载请注明出处
```
//支持登录的用户及密码
"user": [
      {
        "name": "admin",
        "password": "1234"
      },
      {
        "name": "yousf",
        "password": "yousf"
      },
      {
        "name": "we",
        "password": "moximoxi"
      }
    ]
```
更多信息请查看 https://xuzhengtong.com/2019/07/30/wx%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91/wx%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%BB%91%E5%8A%A8%E9%AA%8C%E8%AF%81%E7%BB%84%E4%BB%B6/#more

