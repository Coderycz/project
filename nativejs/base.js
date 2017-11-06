/*function getId(id){
	return document.getElementById(id)
};


var Base={
	getId:function(id){
		return document.getElementById(id)
	},
	getName:function(Name){
		return document.getElementsByName(Name)
	},
	getTagName:function(TagName){
		return document.getElementsByTagName(TagName)
	},
};*/
//前台调用防止覆盖
var $=function(args){
	return new Base(args)
};

//基础库
function Base(args){
	this.elements = [];
	if(typeof args == 'string'){
		//css模拟
		if(args.indexOf(' ')>-1){
			var elements = args.split(' ');
			var childElements = [];
			var node = [];
			for(var i = 0;i<elements.length;i++){
				if(node.length==0) node.push(document);
				switch (elements[i].charAt(0)){
					case'#':
					childElements = [];      //清理父节点，保证子节点有效（双#的情况）
					childElements.push(this.getId(elements[i].substring(1)));
					node = childElements;    //保存父节点
					break;

					case'.':
					childElements = [];
					for(var j = 0;j<node.length;j++){
						var temps = this.getClass(elements[i].substring(1),node[j]);
						for(var k = 0; k <temps.length;k++){
							childElements.push(temps[k]);
						}
					}
					node = childElements;
					break;
					
					default:
					childElements = [];
					for(var j = 0;j<node.length;j++){
						var temps = this.getTagName(elements[i],node[j]);
						for(var k = 0; k <temps.length;k++){
							childElements.push(temps[k]);
						}
					}
					node = childElements;
				

				}
			}
			this.elements = childElements;	
		}else{
			//find模拟
			switch (args.charAt(0)){
				case'#':
				this.elements.push(this.getId(args.substring(1)));
				break;

				case'.':
				this.elements = this.getClass(args.substring(1))
				break;
				
				default:
				this.elements = this.getTagName(args)

			}
		}
	

	}else if(typeof args == 'object'){
		if(args!= undefined){
			this.elements[0]=args;
		}	
	}



}
//找节点
Base.prototype.find= function(str){
	var childElements = [];
	for(var i=0;i<this.elements.length; i++){
		switch (str.charAt(0)){
			case'#':
				
				childElements.push(this.getId(str.substring(1)));
				
			break;
			case'.':
			
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for( var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				
			break;
			default:
				var temps = this.getTagName(str,this.elements[i]);
				for( var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
			
			

		}
	}
	this.elements = childElements;
	return this;
};
//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
}


Base.prototype.getId = function(id){
		
		return document.getElementById(id);
	};

Base.prototype.getTagName = function(tagName,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}	
	var tags = node.getElementsByTagName(tagName);
	for(var i=0;i<tags.length; i++){
		temps.push(tags[i]);
	};
	return temps;

	};

Base.prototype.getClass = function (className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var all =node.getElementsByTagName('*');
	for(var i = 0;i< all.length;i++){
		if(all[i].className==className){
			temps.push(all[i]);
		}

	}
	return temps;

};

//设置css
Base.prototype.css = function(attr,value){
	for(var i = 0; i<this.elements.length; i++){
	if(arguments.length == 1){
		//return this.elements[i].style[attr];
		return getStyle(this.elements[i],attr);
	}else if(attr =='opacity' && typeof this.elements[i].currentStyle!='undefined'){
		return this.elements[i].style.filter = 'alpha(opacity='+value*100+')';

	}
	this.elements[i].style[attr] = value;
}
	return this;
};

//添加class
Base.prototype.addClass = function (className){

	for(var i = 0; i< this.elements.length; i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className+=' '+className;
		}
		
	}
	return this;
};


Base.prototype.removeClass = function (className){

	for(var i = 0; i< this.elements.length; i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className =this.elements[i].className.replace(new RegExp("(\\s|^)"+className+'(\\s|$)'),' ');
		}
		
	}
	return this;
};

//获取某元素属性
Base.prototype.attr = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
			return this.elements[i].getAttribute(attr);
		} else if (arguments.length == 2) {
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
};

//获取某一个元素
Base.prototype.eq = function (num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this; 

};

//获取第一个元素
Base.prototype.first = function(){
	return this.elements[0];
}
Base.prototype.sef = function(){
	for(var i = 0; i< this.elements.length; i++){
		return this.elements[i];
	}
}
//获取最后一个元素
Base.prototype.last = function(){
	return this.elements[this.elements.length-1];
}

//返回元素的个数
Base.prototype.length = function(){
	return this.elements.length;
};


Base.prototype.opacity = function(num){
	for(var i = 0; i< this.elements.length; i++){
		this.elements[i].style.opacity = num/100;
		this.elements[i].style.filter = 'alpha(opacity='+num+')'
	}
	return this;

};

Base.prototype.index = function(){
	var child = this.elements[0].parentNode.children;
	for (var i = 0; i<child.length;i++){
		if(this.elements[0] ==child[i] )  return i;
	};

}


//设置触发事件
Base.prototype.click = function(fn){
	for(var i = 0; i<this.elements.length; i++){
	this.elements[i].onclick = fn;
}
	return this;
};
//鼠标移入移除
Base.prototype.hover = function(over,out){
	for(var i = 0;i< this.elements.length;i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	}
	return this;
};
Base.prototype.mousemove = function(move){
	for(var i = 0;i< this.elements.length;i++){
		this.elements[i].onmousemove=move;
	}
	return this;
};

//显示
Base.prototype.show = function(){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block'
	}
	return this;
};
//隐藏
Base.prototype.hide = function(){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none'
	}
	return this;
};
//找到下一个同级节点
Base.prototype.next = function(attr){
	for(var i = 0; i<this.elements.length; i++){
		this.elements[i] = this.elements[i].nextSibling;
		//alert(this.elements[i])
		if(this.elements[i] == null) throw new Error("找不到下一个同级节点")
		if(this.elements[i].nodeType == 3) this.next();
	}
	return this;
};
//
Base.prototype.child = function(num){
	for(var i = 0; i<this.elements.length; i++){
		this.elements[i] = childNodes(this.elements[i])[num];
		//alert(this.elements[i])
		/*if(this.elements[i] == null) throw new Error("找不到下一个同级节点")
		if(this.elements[i].nodeType == 3) this.child();*/
	}
	return this;
};
//找到上一个同级节点
Base.prototype.prev = function(attr){
	for(var i = 0; i<this.elements.length; i++){
		this.elements[i] = this.elements[i].previousSibling;
		//alert(this.elements[i])
		if(this.elements[i] == null) throw new Error("找不到上一个同级节点")
		if(this.elements[i].nodeType == 3) this.prev();
	}
	return this;
};
//鼠标移除
//改变文本
Base.prototype.html = function(attr){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 0){
		return this.elements[i].innerHTML;
	}
	this.elements[i].innerHTML = attr;
}
	return this;
};

//设置物体居中
Base.prototype.center = function(width,height){
	var left = (getInner().width-width)/2;
	var top = (getInner().height-height)/2;
	for(var i = 0; i<this.elements.length; i++){
	this.elements[i].style.top = top+'px';
	this.elements[i].style.left = left+'px' ;
}
	return this;
};

//锁屏功能
Base.prototype.lock = function(){
/*	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;*/
	for(var i = 0; i<this.elements.length; i++){
	this.elements[i].style.width = getInner().width+'px';
	this.elements[i].style.height = getInner().height+'px' ;
	this.elements[i].style.display= 'block';
	document.documentElement.style.overflow = 'hidden';
}
	return this;
};
// 解除锁屏

Base.prototype.unlock = function(){
	for(var i = 0; i<this.elements.length; i++){
	this.elements[i].style.display= 'none';
	document.documentElement.style.overflow = 'auto';
}
	return this;
};


//监听浏览器改变大小事件
Base.prototype.resize = function(fn){
	window.onresize = fn;
	return this;
}


Base.prototype.drag = function(){
	for(var i = 0; i<this.elements.length; i++){
	
	this.elements[i].onmousedown = function(e){
		var e = getEvent(e);
		var _this = this
		
		var diffX = e.clientX-_this.offsetLeft;
		var diffY = e.clientY-_this.offsetTop;



	document.onmousemove = function(e){
			var e = getEvent(e);
			var left = e.clientX-diffX;
			var top = e.clientY-diffY;
			if(left<0){
				left=0
			}else if(left> getInner().width-_this.clientWidth){
				left =  getInner().width-_this.clientWidth
			}
			if(top<0){
				top=0
			}else if(top> getInner().height-_this.offsetHeight){
				top = getInner().height-_this.offsetHeight
			}
			
			
		_this.style.left = left+ 'px';
		_this.style.top = top+ 'px';
	}
	document.onmouseup = function (){

		this.onmousemove=null;
		this.onmouseup=null;
};


};
}
	return this;
};


//同步动画mul，列队动画fn()
Base.prototype.animate=function(obj){
	for(var i = 0;i<this.elements.length;i++){
		var element=this.elements[i];
		var attr =  obj['attr'] =='x' ?'left':obj['attr'] =='y' ?'top':
					obj['attr'] =='w' ?'width':obj['attr'] =='h' ?'height':
					obj['attr'] =='o'?'opacity':
					obj['attr'] !=undefined ?obj['attr']:'left';
		var start = obj['start']!=undefined?obj['start']:
					attr == 'opacity'?parseFloat(getStyle(element,attr))*100:
										parseInt(getStyle(element,attr));
		var step = obj['step']!=undefined?obj['step']:70;
		var t = obj['t'] !=undefined?obj['t']:10;
		var speed = obj['speed']!=undefined?obj['speed']:6; 
		var type = obj['type'] == 0?'conshant':obj['type']==1?'buffer':'buffer';
		var alter = obj['alter'];
		var target = obj['target'];
		var mul = obj['mul'];       //同步运动的对象,只接收需要改变属性及其目标值

		if(obj['alter']!= undefined && obj['target'] == undefined){
			target = start + alter;
		}else if(obj['alter']== undefined && obj['target'] == undefined && obj['mul'] == undefined){
			alert('至少传入一个正确的增量值alter或者目标值target');
			return false;	
		}
	

		
		if(start>target) step = -step;
		

		//每点一下初始化一下开始坐标，
		if(attr == 'opacity'){
			element.style.opacity = parseInt(start)/100 ;
			element.style.filter = 'alpha(opacity='+parseInt(start)+')';

		}else element.style[attr] = start+'px';
		//关于attr 和target 如果不存在
		if(mul == undefined){
			mul = {};
			mul[attr] = target;

		}
		
		//清空定时器，防止越点越快
		clearInterval(element.timer)

		
		element.timer =setInterval(function(){	
			//flag初值为true，相当于所有同步动画已完成，当遍历到未完成动画的时候就将flag值设为false
			var flag = true;
			//遍历 同步动画 的各个元素及其目标值
			for(var i in mul ){
				attr = i =='x' ?'left':i =='y' ?'top':
					i=='w' ?'width':i =='h' ?'height':
					i =='o'?'opacity':
					i !=undefined ?i:'left';
				target = mul[i];
				


				if(type == "buffer"){
					step = attr =='opacity'?(target-parseFloat(getStyle(element,attr))*100)/speed: 
											(target-parseInt(getStyle(element,attr)))/speed;
					step = step>0?Math.ceil(step):Math.floor(step);
				}
				
				//document.getElementById('test').innerHTML += i+'--'+step+'--'+start+'--'+target+'--'+'<br>';	

				//透明度变化
				if(attr == 'opacity'){
					var temp = parseFloat(getStyle(element,attr))*100;
					element.style.opacity = parseInt(temp+step)/100;
					element.style.filter = 'alpha(opacity='+parseInt(temp+step)+')';

					if(step == 0){ 
						setOpacity();
					}	
					if(step > 0 && Math.abs(target-parseFloat(getStyle(element,attr))*100)<=step){
						setOpacity();
					}
					if(step < 0 && parseFloat(getStyle(element,attr))*100-target<=Math.abs(step)){
						setOpacity();
					}

						if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100)) flag = false;

				}else {//普通属性的变化
					
					if(step == 0){ 
						setTarget();
					}else if(step > 0 && Math.abs(target-parseInt(getStyle(element,attr)))<=step){
						setTarget();
					}else if(step < 0 && parseInt(getStyle(element,attr))-target<=Math.abs(step)){
						setTarget();
					}else{
						element.style[attr] = parseInt(getStyle(element,attr))+step+'px';
					}
					
					if(parseInt(target)!=parseInt(getStyle(element,attr))) flag = false;
				
				}
				
				 //document.getElementById('test').innerHTML += i+'--'+Math.abs(target-parseInt(getStyle(element,attr)))+'--'+parseInt(parseFloat(getStyle(element,attr))*100)+'--'+flag+'<br>';	
			}
			if(flag){
				clearInterval(element.timer);
				if(obj.fn != undefined) obj.fn();
			}
			
		},t)
		
		function setTarget(){
			element.style[attr] = target+'px';
			
		}
		function setOpacity(){
			element.style[attr] = parseInt(target)/100;
			element.style.filter = 'alpha(opacity='+parseInt(target)+')';
			
		}
	}
	return this; 

}

