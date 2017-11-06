$(function(){
	//1.换肤
	var color=["#3b589c","#bb3bda","#e31458","#0abfd0","#fbab0e","#b2d600"];
	$(".sky_button span").click(function(){
		console.log($(this).index())
		$(this).css("background-positionY",15).siblings().css("background-positionY",0)
		$(".nav_left .con_nav_left_title").css("background",color[$(this).index()])
		$(".nav").css("background",color[$(this).index()])
	})
	//2.选项卡
	$(".bottom_key>span").click(function(){
		$(this).children().css("display","block")
		//console.log($(this).siblings().children().css("display","none"))
		$(this).siblings().children().css("display","none").end().css("display","block")
		$(this).css("background","red").siblings().css("background","#ddd")
		var target = -$(".cbc_container .cbc_inline").eq($(this).index()).position().left
		$(".cbc_container").stop().animate({"left": target})
	})

	//3.淡入淡出轮播
	$(".ban_key span").mouseover(function(){
		clearInterval(timer)
		var index = $(this).index() 
		$(this).siblings().removeClass("active_span")
		$(this).addClass("active_span")
		fade(index)
	})
	$(".ban_key span").mouseout(function(){
		timer = setInterval(interval,3000)
	})
//
	/*function interval1(){	
		var index = $(".ban_key .active_span").index()
		if(index == $(".ban_key span").length-1){
			index = -1
		}
		index++
		console.log(index)
		$(".ban_key span").eq(index).trigger("mouseover")		
	}*/

	//淡入淡出
	function fade(index){
		$(".banner_center .active_img").fadeOut(function(){
			$(".banner_center .active_img").removeClass("active_img");
			$(".banner_center img").eq(index).fadeIn().addClass("active_img");
		})
	}
	function interval(){
			var index = $(".ban_key .active_span").index() 
			console.log(index)
			if( index == $(".ban_key span").length-1){
				$(".ban_key .active_span").removeClass("active_span");
				$(".ban_key span").eq(0).addClass("active_span")
				$(".banner_center img").eq(0).fadeIn().addClass("active_img");
			}else{
				$(".ban_key .active_span").removeClass("active_span").next().addClass("active_span")
			}

			/*$(".banner_center .active_img").fadeOut(function(){
				$(".banner_center .active_img").removeClass("active_img");				
				$(".banner_center img").eq(index+1).fadeIn().addClass("active_img");
			})*/

			$(".banner_center img").eq(index).fadeOut(function(){
				$(".banner_center .active_img").removeClass("active_img");
				if(index == $(".ban_key span").length-1){
					index = -1
				}
				$(".banner_center img").eq(index+1).fadeIn().addClass("active_img");
			})

			/*if(index == 4){
				$(".banner_center .active_img").fadeOut(function(){
					$(".banner_center .active_img").removeClass("active_img");
					$(".banner_center img").eq(0).fadeIn().addClass("active_img");
				})
			}else{
				$(".banner_center .active_img").fadeOut(function(){
					$(".banner_center .active_img").removeClass("active_img");
					$(".banner_center img").eq(index+1).fadeIn().addClass("active_img");
				})
			}*/
			
		}
	var timer = setInterval(interval,3000)
	
	
	
	

	
})