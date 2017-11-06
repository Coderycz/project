$(function(){
	var clone = $(".pics li").first().clone()
	var i = 0;
	$(".pics").append(clone)
	var length = $(".pics li").length;		//length = 6
	//自动轮播和向下滚动
	function autoplay(){
		i++
		if(i == length){
			i = 1
			$(".pics").css("top",0)
		}
		$(".pics").animate({top: -i*320},200)
		if(i== length-1){
			$(".circle li").eq(0).addClass("on").siblings().removeClass("on")
		}else{
			$(".circle li").eq(i).addClass("on").siblings().removeClass("on")
		}
	}

	//向下轮播
	$(".down").click(function(){
		autoplay()
	})

	//向上轮播
	$(".up").click(function(){
		i--
		if(i == -1){
			i = length-2
			$(".pics").css("top", -(i+1)*320)
		}
		console.log(i)
		$(".pics").animate({top: -i*320},200)
		$(".circle li").eq(i).addClass("on").siblings().removeClass("on")	
	})

	//自动轮播
	var t = setInterval(autoplay,3000)

	//点击小点选择图片
	$(".circle li").click(function(){
		i = $(this).index()
		$(this).addClass("on").siblings().removeClass("on")
		$(".pics").animate({top: -i*320},200)
	})

	//移入停止，移出启动
	$(".container").hover(function(){
		$("span").css("display","block")
		clearInterval(t)
	},function(){
		$("span").css("display","none")
		t = setInterval(autoplay,2000)
	})
})