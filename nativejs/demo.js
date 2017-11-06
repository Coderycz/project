window.onload = function(){



$('.link li').hover(function(){
	var target = $(this).first().offsetLeft;
	var that =this;
	$('.huakuai').animate({
		attr: 'left',
		target: target,
		fn: function(){
			$('that').css('fontSize','28px')
		}
	})
},function(){
	
	$('.huakuai').animate({
		attr: 'left',
		target: 0
	})
})

/*$('#member').hover(function(){
		//$().getClass('member').css('background','url(arrow_state_blue_collapsed.png) no-repeat 110px center')
		$('#menber ul').show().animate({
			t: 10,
			mul: {
				o: 100,
				h: 120,
			}
		});
		//$(this).css('background','red url(img/arrow_state_blue_collapsed.png) no-repeat right center')
	},function(){
		$('#menber ul').animate({
			t: 10,
			type: 1,
			mul: {
				o: 0,
				h: 0
			},
			fn:function(){
				$('#menber ul').hide();
			}
		});
		
		//$(this).css('background','red url(img/arrow_state_blue_expanded.png) no-repeat right center')
		
		
	});*/

$('#menber').hover(function(){
		$('#menber ul').show().animate({
			t: 10,
			step: 20,
			type: 0,
			mul: {
				o: 100,
				h: 120,
			}
		});
},function(){
	$('#menber ul').animate({
		t: 10,
		mul: {
			o: 0,
			h: 0
		},
		fn:function(){
			$('#menber ul').hide();
		}
	});		
})


$('#share').hover(function(){
	$(this).animate({
		attr: 'x',
		target: 0,
		type: 0,
		t: 10
	});
},function(){
	$(this).animate({
		attr: 'x',
		type: 1,
		target: -240,
		t: 10
	});
})



//跳转到相应的锚点
$('#index ul li').click(function(e){
	/*$('#index ul li').css('backgroundColor','gray');
	$(this).css('backgroundColor','red');*/
	//取消默认事件
	stopDefault(e)
	var index = $(this).index();
	var target = $('#a'+index).first().offsetTop
	var step = (target-getScroll().top)/5
	//alert(target +' '+getScroll().top +" "+step)
	var timer = setInterval(function(){

		if(step == 0){ 
			getScroll().top=target
			clearInterval(timer)
		}else if(step > 0 && Math.abs(target-getScroll().top)<=step/10){
			getScroll().top=target	
			clearInterval(timer)
		}else if(step < 0 && getScroll().top-target<=Math.abs(step/10)){
			getScroll().top=target	
			clearInterval(timer)
		}else{
			document.documentElement.scrollTop =getScroll().top+step;
			document.body.scrollTop = getScroll().top+step;
		}	
		//console.log(target +' '+getScroll().top +" "+Math.abs(getScroll().top-target)+"  "+step)
	},50)
	
	
	
})
//回到顶部
$('#index span').click(function(){
	$('#index ul li').css('backgroundColor','gray')
	document.documentElement.scrollTop=0;
	document.body.scrollTop=0;
})
//获取导航条的position:fixed的top值和着色块
function positionColor(){
	var top = getScroll().top;
	var box = $('#index ul li');
	//导航条动态的改变位置，分界点在滚动条高度=网页主题部分开始的地方
	if(getScroll().top>=parseInt(getStyle($('header').first(),'height'))){
			$('#index').css('top',((getInner().height-parseInt(getStyle($('#index').first(),'height')))/2+'px'));	
	}else  //滚动条高度+屏幕高度-导航条高度-页头高度
	$('#index').css('top',(getInner().height-parseInt(getStyle($('#index').first(),'height'))+'px'));	
	
	
	for(var i = 0;i <$('#index ul li').length();i++){
		var j = i+1;
		
		//bug1  判断第一个节点是否满足着色   
		if(j == 1){
			box.css('backgroundColor','gray');
			$('#index ul li').eq(0).css('backgroundColor','red')
		}
		//bug2  防止数组越界
		if(j == $('#index ul li').length()){
			j = $('#index ul li').length()-1;
		}
		//offsetTop 当前元素到他父元素的距离这里简称父距 
		//下一节的父距-上一节的getstyle()/2(自身高度的一半)<=top（即浏览器的顶部到body顶部的距离）的时候  下面的一个被聚焦（导航条着色）
		if($('#a'+j).first().offsetTop-parseInt(getStyle($('#a'+j).first(),'height'))/2<= top){
			//console.log($('#a'+j).first().offsetTop-parseInt(getStyle($('#a'+j).first(),'height'))/2+"  "+top +" "+j)
			box.css('backgroundColor','gray');
			$('#index ul li').eq(j).css('backgroundColor','red')
		}
		
	}
}

$('#share').css('top',(getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px'));
$('#index').css('left',(1200+(getInner().width-1200)/2+'px'));
positionColor()     
window.onresize =function(){
	$('#index').css('left',(1200+(getInner().width-1200)/2+'px'));
}		   

//添加一个滚动条跟随事件
addEvent(window,"scroll",function(){
	$('#share').animate({
		attr: 'y',
		type: 1,
		target: getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
	})
	positionColor()
})



}