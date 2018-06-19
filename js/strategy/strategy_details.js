var userId = localStorage.getItem("userId") || 0;
var proId;
var strategyId;
$(function() {

	$('.news_review').click(function() {

		$('html, body').animate({
			scrollTop: $('#recommend').offset().top - parseInt(total_height + 36) + "px"
		}, 1000)
	})

	

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		strategyId = self.strategyId;
		var anchor = self.anchor;

		total_height = plus.navigator.getStatusbarHeight() + 45 + "px";

		window.addEventListener('reload', function() {
		    // mui.fire()传过来的额外的参数，在event.detail中；
		    window.location.reload();
		    // var param = detail.param;
		    // 执行相应的ajax或者操作DOM等操作
		});
		

		$.ajax({
			type: "get",
			url: config.data + "strategy/getStrategyById",
			async: true,
			data: {
				strategyId: strategyId,
				userId: userId
			},
			success: function(data) {
				if(data.state) {
					var str = data.strategy;
					
					if(str.comment_num > 99) {
						var comment_num = 99
					} else {
						var comment_num = str.comment_num
					}
					$('.news_reviewNum').text(comment_num);
					$('h4').text(str.title);
					$('.news_userInfo_img').css("background-image", "url(" + encodeURI(str.portrait) + ")");
					$('.news_userInfo_name').text(str.nick_name);
					$('.news_userInfo_date').text(str.add_time);
					$('.news_post_content_detail').html(str.detail);
					if (str.imgList) {
						var string = str.imgList;
						var result=string.split(",");
						var img='';
						for (var i = 0; i < result.length; i++) {
							img+=
								"<img src='" + config.img + encodeURI(result[i]) + "' width='100%' />"
						}
						$('.news_post_content_imgs').append(img)
					} else{
						
					}
					proId = str.user_id;
					if(str.collect > 0) {
						$('.news_collect').attr('data-collect', 1).addClass('collected')
					} else {
						$('.news_collect').attr('data-collect', 0)
					}
				} else {

				}
			}
		});
		$('.news_collect').click(function() {
			if (userId !== 0) {
				if($(this).attr('data-collect') == 1) {
					$('.news_collect').attr('data-collect', 0)
					unCollect(strategyId)
				} else {
					$('.news_collect').attr('data-collect', 1)
					collect(strategyId)
				}
			} else{
				mui.toast("请先登录")
			}
			
		})
		
		
		//	切换评论排序
		$('.time').click(function() {
			$(this).addClass('color_green');
			$('.hot').removeClass('color_green');
			$('.news_post_commentContents').children().remove();
			mui('.strategy_details').pullRefresh().refresh(true);
			page = 0;
			sort = "add_time";
			up()
		})
		$('.hot').click(function() {
			$(this).addClass('color_green');
			$('.time').removeClass('color_green');
			$('.news_post_commentContents').children().remove();
			mui('.strategy_details').pullRefresh().refresh(true);
			page = 0;
			sort = "comment_num";
			up()
		})
	
		//	切换评论排序结束

		//		点赞与取消点赞

		$('body').on('click', '.thumb', function() {
			var ts = $(this)
			if(ts.hasClass('unLike')) {
				
				ts.addClass('liked').removeClass('unLike');
				ts.next('.thumb_num').text(parseInt(ts.next('.thumb_num').text())+1)
			
				$.ajax({
					type:"get",
					url:config.data + "strategy/likeComment",
					async:true,
					data:{
						commentId:strategyId,
						userId:userId
					},
					success:function(data){
						if (data.state) {
							
						} else{
							
						}
					}
				});
			} else {
				
				ts.removeClass('liked').addClass('unLike');
				ts.next('.thumb_num').text(parseInt(ts.next('.thumb_num').text())-1) 
				$.ajax({
					type:"get",
					url:config.data + "strategy/unLikeComment",
					async:true,
					data:{
						commentId:strategyId,
						userId:userId
					},
					success:function(data){
						if (data.state) {
							
						} else{
							
						}
					}
				});
			}
		})

		//		点赞与取消点赞结束

		$('body').on('click', '.more_secondComment,.comment_img', function() {

			var commentId = $(this).attr('data-id')
			mui.openWindow({
				url: "strategy_allComments.html",
				id: "strategy_allComments.html",
				extras: {
					commentId: commentId,

				}
			})
		})

		//	滚动隐藏
		function scroll(fn) {
			var beforeScrollTop = document.body.scrollTop,
				fn = fn || function() {};
			window.addEventListener("scroll", function() {
				var afterScrollTop = document.body.scrollTop,
					delta = afterScrollTop - beforeScrollTop;
				if(delta === 0) return false;
				fn(delta > 0 ? "down" : "up");
				beforeScrollTop = afterScrollTop;
			}, false);
		}

		scroll(function(direction) {
			if(direction == "down") {
				$('.news_userInfo_reply').addClass('hidden')
			} else {
				$('.news_userInfo_reply').removeClass('hidden')
			}
		});

		//滚动隐藏结束

		$('.news_userInfo_replyInput').click(function() {
			if (userId !== 0) {
				mui.openWindow({
					url: "strategy_comment.html",
					id: "strategy_comment.html",
					extras: {
						strategyId: strategyId,
						proId: proId
	
					}
				})
			} else{
				mui.toast("请先登录")
			}
			
		})
		
		$('body').on('click','.news_post_commentContent',function(){
			mui.openWindow({
				url:"strategy_allComments.html",
				id:"strategy_allComments.html",
				extras:{
					commentId:$(this).attr('data-id')
				}
			})
		})

	})
})

//收藏
function collect(strategyId) {

	$('.news_collect').addClass("collected")

	$.ajax({
		type: "get",
		url: config.data + "strategy/collect",
		async: true,
		data: {
			targetId: strategyId,
			userId: userId,
			type: 2,
			sys: 2
		},
		success: function(data) {
			if(data.state) {
				mui.toast("收藏成功")
			} else {

			}
		}
	});
}

//收藏结束

//取消收藏
function unCollect(strategyId) {
	$('.news_collect').removeClass('collected')
	$.ajax({
		type: "get",
		url: config.data + "strategy/unCollect",
		async: true,
		data: {
			targetId: strategyId,
			userId: userId,
			type: 2,

		},
		success: function(data) {
			if(data.state) {
				mui.toast("取消收藏成功")
			} else {

			}
		}
	});
}

//取消收藏结束



