window.onload = function(){
	$('.part').click(function(){
		for(var i = 0; i <$('.part').length();i++){
			if(getStyle($('.part').eq(i).child(1).first(),'height') !== 'auto'){
				$('.part').eq(i).child(1).animate({
					attr:'height',
					target: 0,
					t: 10,
					step: 10,
					type: 1,
				
				});
			}
		}
		$(this).child(1).show().animate({
			attr:'height',
			target: 120,
			t: 10,
			step: 10,
			//type: 1,	
		});

	})
	$('#start').hover(function(){
		$('#start span').css('display','block')
		$('#big').css('display','block')
	},function(){
		$('#start span').css('display','none')
		$('#big').css('display','none')
	})
	$('#start').mousemove(function(evt){
		var e = evt || window.event;
		
		var left = e.clientX - $(this).sef().offsetLeft- $('span').sef().offsetWidth/2;
		var top = e.clientY - $(this).sef().offsetTop- $('span').sef().offsetHeight/2;
		if(left <= 0){
			left = 0;
		}else if(left>= $(this).sef().offsetWidth-$('span').sef().offsetWidth){
			left = $(this).sef().offsetWidth-$('span').sef().offsetWidth
		}
		if(top <= 0){
			top = 0;
		}else if(top>= $(this).sef().offsetHeight-$('span').sef().offsetHeight){
			top = $(this).sef().offsetHeight-$('span').sef().offsetHeight
		}
		$('#start span').css('left',left+"px").css('top',top+"px")

		var percentX = left/($(this).sef().offsetWidth-$('span').sef().offsetWidth)
		var percentY = top/($(this).sef().offsetHeight-$('span').sef().offsetHeight)
		x = -percentX*($('#large').sef().offsetWidth-$('#big').sef().offsetWidth)
		y = -percentY*($('#large').sef().offsetHeight-$('#big').sef().offsetHeight)
		$('#large').css('left',x+"px").css('top',y+"px")
	})





}