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
- 调用了两个接口，easymock（登录假数据）和picsum.photos（获取图片）
- 加载图片有点慢，因为要调wx.getImageinfo接口缓存图片，如果不缓存图片而直接canvas调网络图片不能正常显示。
- 滑块真机调试卡顿已解决（使用wxs响应时间），避免在频率刷新高的事件中使用this.setData

# 允许所有团体和个人修改和使用，转载请注明出处


