var msg;
$(function(){
//	$('body').click(function(){
//		mui.openWindow({
//			url:"strategy_add.html"
//		})
//	})
	
	
	window.addEventListener('reload', function() {
		    // mui.fire()传过来的额外的参数，在event.detail中；
		    window.location.reload();
		    // var param = detail.param;
		    // 执行相应的ajax或者操作DOM等操作
		});



	$('body').on('click','.strategy_content',function(){
		var strategyId = $(this).attr('data-id');
		
		mui.openWindow({
			url:"../strategy/strategy_details.html",
			id:"../strategy/strategy_details.html",
			extras:{
				strategyId:strategyId,
				anchor: true
			}
		})
	})
	




	
	
	
	
	
	
})

