var subpages = ['html/news/news.html', 'html/game/game_recommend.html', 'html/strategy/strategy.html', 'html/play/play.html', 'html/user/me.html'];

var Index = 0;

//把子页的路径写在数组里面
var activeTab = subpages[Index];
//选项卡点击事件
var self;
mui.plusReady(function() {
//	var h1 = plus.webview.getLaunchWebview()
//
//	var height = document.documentElement.clientHeight || document.body.clientHeight;
//	window.onresize = function() {
//		var heightView = document.documentElement.clientHeight || document.body.clientHeight;
//		if(heightView < height) {
//			plus.webview.currentWebview().setStyle({
//				height: height
//			});
//			//			//修改父页面高度的时候，也要修改子页面的高度  因为子页面距离父页面底部始终是51px  所以这里只需要用父页面的高度减去51px,就是子页面的高度
//			//			plus.webview.getWebviewById('html/store/store.html').setStyle({
//			//				height: (height * 1 - 51)
//			//			});
//		} else {
//
//		}
//	}
	var h1 = plus.webview.getLaunchWebview()

	var height = document.documentElement.clientHeight || document.body.clientHeight;
	window.onresize = function() {
		if(plus.webview.getWebviewById('html/play/play.html')) {

			var heightView = document.documentElement.clientHeight || document.body.clientHeight;
			if(heightView < height) {
				//			plus.webview.currentWebview().setStyle({
				//				height: height
				//			});
				////			//修改父页面高度的时候，也要修改子页面的高度  因为子页面距离父页面底部始终是51px  所以这里只需要用父页面的高度减去51px,就是子页面的高度

				plus.webview.getWebviewById('html/play/play.html').setStyle({
					height: (heightView)
				});
				$('#footer').addClass('hidden')
			} else {
				$('#footer').removeClass('hidden')
				plus.webview.getWebviewById('html/play/play.html').setStyle({
					height: (height - 50)
				});
			}
		}
	}







	//	window.addEventListener('toIndex', function(event) {
	//		// mui.fire()传过来的额外的参数，在event.detail中；
	//		var detail = event.detail;
	//		// var param = detail.param;
	//		// 执行相应的ajax或者操作DOM等操作
	//		console.log(name)
	//	});
	//获取当前页面所属的Webview窗口对象
	self = plus.webview.currentWebview();
	var sub = plus.webview.create(
		subpages[0], //子页url
		subpages[0], //子页id
		{
			top: '0px', //设置距离顶部的距离
			bottom: '50px' //设置距离底部的距离
		}
	);
	self.append(sub);
	//	for(var i = 0; i < 4; i++) {
	//		//创建webview子页
	//		var sub = plus.webview.create(
	//			subpages[i], //子页url
	//			subpages[i], //子页id
	//			{
	//				top: '0px', //设置距离顶部的距离
	//				bottom: '50px' //设置距离底部的距离
	//			}
	//		);
	//		//如不是我们设置的默认的子页则隐藏，否则添加到窗口中
	//		if(i != Index) {
	//			sub.hide();
	//		}
	//		//将webview对象填充到窗口
	//		self.append(sub);
	//	}

	mui('.mui-bar-tab').on('tap', 'a', function(e) {

		var index = $(this).index();

		//获取目标子页的id
		var h = plus.webview.getWebviewById(subpages[index])

		document.getElementsByClassName("mui-icon")[1].classList.remove('game_active');
		document.getElementsByClassName("mui-icon")[0].classList.remove('news_active');
		document.getElementsByClassName("mui-icon")[2].classList.remove('strategy_active');
		document.getElementsByClassName("mui-icon")[3].classList.remove('play_active');
		document.getElementsByClassName("mui-icon")[4].classList.remove('me_active');
		this.children[0].classList.add(this.getAttribute('data-img'));
		//			console.log(this.getAttribute('data-img'))
		var targetTab = this.getAttribute('data-href');
		//		console.log(targetTab);
		if(targetTab == activeTab) {

			return;
		}
		if(!h) {
			var sub = plus.webview.create(
				subpages[index], //子页url
				subpages[index], //子页id
				{
					top: '0px', //设置距离顶部的距离
					bottom: '50px' //设置距离底部的距离
				}
			);
			self.append(sub);
		}
		//更换标题
		//	    title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
		//显示目标选项卡
		plus.webview.show(targetTab);
		//隐藏当前选项卡
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;

	});

	mui.back = function() {
		//首次按键，提示‘再按一次退出应用’
		//  var first;
		//  if(!first){
		//  	
		//      first = new Date().getTime();
		//      mui.toast('再按一次退出应用');
		//      setTimeout(function(){
		//          first = null;
		//      },1000);
		//  }else{
		//      if(new Date().getTime()-first<1000){
		//         plus.runtime.quit();
		//     }
		//}
		//  alert(e.keyType+"\n"+e.keyCode);
		return false;
	}
});