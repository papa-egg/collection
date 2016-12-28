// JavaScript Document

$(document).ready(function(){
	
	//$('input').input();
	
	dropUp(3000);
	function dropUp(sp){
		var $li=$('#upd-con').find('li');
		var i =0;
		function move(){
			$li.eq(i).animate({'margin-top':'-40px'},300,function(){
				$(this).css({'margin-top':'0'}).appendTo($('#upd-con>ul'));
			});
			i++;
			if(i>$li.length-1){
				i=0;
			}
		}
		var timer=setInterval(move,sp);
		$('#upd-con>ul').hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(move,sp);
		})
	}
	
	
	//左右切换
	slider();
	function slider(){
		var width=parseInt($('#user').width());
		var $ul=$('#user>ul');
		var $li=$ul.find('li');
		var len=$('#user li').length;
		var wd=parseInt($li.width())+parseInt($li.css('margin-right'));
		$ul.width(len*wd);
		var page=Math.ceil(len/8);
		var span='';
		for(var i=0;i<page;i++){
			if(i==0){
				span+='<span class="cur"></span>';
			}else{
				span+='<span></span>';
			}
		}
		var count=0;
		$('#cur').append(span);
		$('#next').click(function(){
			if(count<page-1){
				$ul.animate({'left':'-='+wd*8},500);
				$('#cur>span').eq(count+1).addClass('cur').siblings().removeClass('cur');
				count++;
				
			}
		});
		$('#prev').click(function(){
			if(count!=0){
				$ul.animate({'left':'+='+wd*8},500);
				$('#cur>span').eq(count-1).addClass('cur').siblings().removeClass('cur');
				count--;
				
			}
		});
	}
})
