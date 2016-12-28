// JavaScript Document
(function($){
	$.fn.extend({
		
		/***图片渐大***/
		"bigger":function(add){
			var wd=this.width();
			var he=this.height();
			l=add/(wd/he)/2;
			this.find("img")
			.css({"position":"absolute","left":"50%","top":"50%","margin":-(he/2)+"px"+" 0 0 "+-(wd/2)+"px"});
			this.hover(function(){
				$(this).find("img").stop(true,true)
				.animate({"margin":"-="+l+"px 0 0 -="+add/2+"px","width":wd+add,"height":he+add/(wd/he)},200);				
			},function(){
				$(this).find("img").stop(true,true)
				.animate({"margin":"+="+l+"px 0 0 +="+add/2+"px","width":wd,"height":he},200);
			})
		},
		
		/***输入框***/
		"input":function(){
			var _this=this;
			var type=_this.attr('type');
			if(type=='text'){
				this.focus(function(){
					if($(this).val()==this.defaultValue){
						$(this).val("");	
					}
				}).blur(function(){
					if($(this).val()==""){
						$(this).val(this.defaultValue);
					}
				})	
			}
		},
		
		/***渐隐渐现***/
		"fade":function(sp1,sp2,nav){
			var _this=this;
			var len=_this.length;
			var page;
			_this.eq(0).siblings().css({'display':'none'});
			function move(){
				for(var i=0;i<len;i++){
					if(_this.eq(i).css('display')!='none'){
						page=i;
					}
				}
				_this.eq(page).fadeOut(sp2);
				if(page==len-1){
					page=-1;
				}
				_this.eq(page+1).css({'z-index':'10'}).fadeIn(sp2,function(){
					$(this).css({'z-index':'0'});
				})
				if(nav){
					$(nav).find('span').eq(page+1).addClass('cur').siblings().removeClass('cur');
				}
			}
			var timer=setInterval(move,sp1);	
			if(nav){
				_this.hover(function(){
					clearInterval(timer);
					timer=null;
				},function(){
					timer=setInterval(move,sp1);
				})
				$(nav).hover(function(){
					clearInterval(timer);
					timer=null;
				},function(){
					timer=setInterval(move,sp1);
				})
				for(var k=0;k<len;k++){
					if(k==0){
						$(nav).append('<span class="cur"></span>');
					}else{
						$(nav).append('<span></span>');
					}
				}
				$(nav).find('span').click(function(){
					var index=$(this).index();
					$(this).addClass('cur').siblings().removeClass('cur');
					_this.eq(index).css({'z-index':'10'}).fadeIn(sp2,function(){
						$(this).css({'z-index':'0'});
					}).siblings().fadeOut(sp2);
				})
			}
		},
		
		/***无缝轮播***/
		"sear":function(mr,mv,sp1,sp2,ok){ //mr:间隙; mv:移动距离; sp1:timer; sp2:移动时间; ok:是否悬停
			var _this=this;
			var wd=_this.outerWidth(true);
			var len=_this.length;
			if(mv==0){
				mv=wd;
			}
			for(var i=0;i<len;i++){
				_this.eq(i).css({'left':(wd+mr)*i+'px'});
			}	
			function move(){
				for(var i=0;i<len;i++){
					var left=-parseInt(_this.eq(i).css('left'));
					if(left>=wd+mr){
						_this.eq(i).css({'left':(wd+mr)*(len-1)});
					}
				}
				if(mv<10){
					_this.css({'left':'-='+mv+'px'});
				}else{
					_this.animate({'left':'-='+(mr+wd)+'px'});
				}
			}
			var timer=setInterval(move,sp1);
			if(ok==true){
				_this.parent().hover(function(){
					clearInterval(timer);
					timer=null;
				},function(){
					timer=setInterval(move,sp1);
				})
			}
		},
		
		/***轮播***/
		"slid":function(nav,speed){
			var wd=this.width();
			var len=this.find("li").length;
			var $ul=this.find("ul");
			$ul.width(len*wd);
			var $this=this;
			for(var i=0;i<len;i++){
				if(i==0){
					$(nav).append('<a href="javascript:;" class="cur"></a>');
				}else{
					$(nav).append('<a href="javascript:;"></a>');
				}
			}
			function slider(){
				var la=-parseInt($ul.css("left"));
				var lb=la/wd;
				if(lb==len-1){
					$ul.animate({"left":"0"},400);
					lb=-1;	
				}else{
					$ul.animate({"left":"-="+wd},400);
				}
				$(nav).find("a").eq(lb+1).addClass("cur").siblings().removeClass("cur");
			}
			var timer=null;
			setTimer();
			function setTimer(){
				timer=setInterval(slider,speed);
			}
			$(nav).find("a").click(function(){
				var dn=$(this).index();
				$(this).addClass("cur").siblings().removeClass("cur");
				$(".la ul").animate({"left":'-'+wd*dn},200);
			});
			$this.find("li").hover(function(){
				clearInterval(timer);
				timer=null;
			},function(){
				setTimer();
			})
			$(nav).find("a").hover(function(){
				clearInterval(timer);
				timer=null;
			},function(){
				setTimer();
			})
		},
		
		/***横向切换***/
		"swit":function(sp1,sp2,prev,next){
			var _this=this;
			var $li=_this.find('li');
			var wd=_this.outerWidth();
			var len=$li.length;
			if(len==1){
				return false;
			}
			for(var i=0;i<len;i++){
				$li.eq(i).css('left',wd*i+'px');
			}
			function move(){
				$li.animate({'left':'-='+wd+'px'},sp2,function(){
					for(var k=0;k<len;k++){
						var left=parseInt($li.eq(k).css('left'));
						if(left<=-wd){
							$li.eq(k).css({'left':wd*(len-1)+'px'});
						}
					}
				});
			}
			var timer=setInterval(move,sp1);
			$li.hover(function(){
				clearInterval(timer);
				timer=null;
			},function(){
				timer=setInterval(move,sp1);
			})
			$(prev).hover(function(){
				clearInterval(timer);
				timer=null;
			},function(){
				timer=setInterval(move,sp1);
			})
			$(next).hover(function(){
				clearInterval(timer);
				timer=null;
			},function(){
				timer=setInterval(move,sp1);
			})
			$(prev).click(function(){
				if(!$li.is(':animated')){
					$li.animate({'left':'-='+wd+'px'},sp2,function(){
						for(var k=0;k<len;k++){
							var left=parseInt($li.eq(k).css('left'));
							if(left<=-wd){
								$li.eq(k).css({'left':wd*(len-1)+'px'});
							}
						}
					})
				}
			})
			$(next).click(function(){
				if(!$li.is(':animated')){
					for(var j=0;j<len;j++){
						var left=Math.abs(parseInt($li.eq(j).css('left')));
						if(left>=wd*(len-1)){
							$li.eq(j).css({'left':-wd+'px'});
						}
					}
					$li.animate({'left':'+='+wd+'px'},sp2);
				}
			})
		}
	})
})(jQuery)

