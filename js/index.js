//加载完毕事件，在该事件中写的js代码，就一定不会找不到
window.onload=function(){
	//顶部通栏
	headerScroll();
	//倒计时：每隔一秒改一次时钟上的显示，即用定时器
	cutDownTime();
	//轮播图
	banner();
}
//通栏方法
/*
	获取导航栏的高度
	在onscroll滚动事件中 去修改颜色
	0-1的透明度
	获取到滚动的距离
	滚动的距离/导航栏  得到0-1的浮点数
	滚动的距离 大于导航栏>1 如果透明度>1 变为1 
	
	通过js 修改顶部通栏的透明度即可
	opccity设置透明度的话 子元素也会变透明
	为了保证子元素能够正常显示 我们用rgba()来获取透明度

*/
function headerScroll(){
	//1.获取一些必须知道的参数
	/*
	导航栏的高度
	顶部的通栏（为了在onscroll事件中使用避免一直获取造成的性能浪费
	
	*/
	console.log('offsetTop'+document.querySelector('.jd_nav').offsetTop);//182:距离顶部的距离
	console.log('offsetHeight'+document.querySelector('.jd_nav').offsetHeight);//177元素自身的高度
	
	//需要获取的是从顶部到导航栏底部的距离182+177即可
	
	//获取导航栏
	var navDom=document.querySelector('.jd_nav');
	
	//需要获取的是从顶部到导航栏底部的距离
	var maxDistance=navDom.offsetHeight+navDom.offsetTop;
	console.log(maxDistance);
	//获取顶部的通栏
	var headerDom=document.querySelector('.jd_header');
	
	headerDom.style.backgroundColor='rgba(201,21,35,0)';
	//2.注册滚动事件 注册给谁
	
	window.onscroll=function(){
		//console.log('123');
		
		//获取滚动的距离
		//页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement。
		//页面没有DTD，即没指定DOCTYPE时，使用document.body
		//scrolltop是用来让元素向上翻的高度
		var scrollDistance=document.documentElement.scrollTop||document.body.scrollTop;
		//console.log(scrollDistance);
		
		//计算一个0-1的百分数
		var percent=scrollDistance/maxDistance;
		console.log(percent);
		
		if(percent>1){
			percent=1;
		}
		
		//根据百分数设置顶部通栏的透明度
		headerDom.style.backgroundColor='rgba(201,21,35,'+percent+')';
		
	}
	
	
}

/*
	倒计时方法：
	定义一个倒计时的总时间
	获取想要修改的li标签
	开启定时器
	判断是否时间没有了
	递减时间
	修改对应标签的显示
*/
/*
	易错点:dom元素修改显示时记得.innerHtml
	还有时分秒记得取整
*/
function cutDownTime(){
	
		//1.定义总时间
		//写时间时建议这样写
		var totalHour=3;
		
		//转化为秒
		var totalSec=3*60*60;
		
		//获取想要修改的所有的li标签
		//querySelectorAll querySelector这两个方法可以传入css,css3中的选择器
		//如果想自己封装一个类似jq的东西，可以在内部调用这两个方法
		var liArr=document.querySelectorAll('.main_content:nth-child(1) .content_top li');
		//console.log(liArr);
		
		//开启定时器
		//有了定时器id之后就能够干掉该id对应的定时器
		
		var timeId=setInterval(function(){
			
			//判断倒计时时间
			if(totalSec<=0){
				console.log('结束啦!你买不到了哦!');
				return;//后面代码可以不用执行了
			}
			
			//这里有一个小bug 虽然总时间是3个小时，但是用户看到的是2个小时59秒开始
			totalSec--;
			
			//当前的秒对应多少小时多少分多少秒
			var hour=Math.floor(totalSec/3600);
			var minute=Math.floor(totalSec%3600/60);//总秒数取余了3600秒之后剩下的秒数就是不足以一小时的，所以是取余3600，然而除以60取整数
			var sec=totalSec%60;//剩下的就是不足以凑成分钟的，所以取余，求得秒
			
			//修改dom元素显示
			
			//小时
			liArr[0].innerHTML=Math.floor(hour/10);//十位  41/10=4.1 所以要取整
			liArr[1].innerHTML=hour%10;
			
			liArr[3].innerHTML=Math.floor(minute/10);
			liArr[4].innerHTML=minute%10;
			
			liArr[6].innerHTML=Math.floor(sec/10);
			liArr[7].innerHTML=sec%10;
			
		},1000)
	
}

/*
 * 自动轮播:1.定义index 记录索引值  2.获取一些必须要知道的变量(单个元素的宽度  轮播图的(很长的宽度) 索引的li(数组))  
 * 3. 定时器(index++ 修改ul的位置  使用过度来实现动画效果(css3))
 */
//function banner(){
//	//方法一:不考虑过度效果直接切换
//	
//	//步骤一:index++
//	//步骤二:判断索引是否越界
//	//步骤三:修改轮播图ul的位置
//	
//	//获取屏幕的宽度变量
//	//因为图片，和ul的宽度都是屏幕的100%,所以可以直接这样获取
//	var imgWidth=document.documentElement.offsetWidth||document.body.offsetWidth;
//	console.log(imgWidth);//375
//	
//	//获取轮播图的ul
//	var moveUl=document.querySelector('.banner_images');
//	
//	/*
//	 * 考虑到动画效果之后
//	 */
//	moveUl.style.transition='all .3s';
//	//如果只写到这里会有bug，当我的索引加到最后一张的时候，按照需求是要迅速跳到第一张的
//	//但是由于默认有过渡效果，实现不了，所以我们要关闭过渡，瞬间切换
//	
//	var ulLiArr=document.querySelectorAll('.banner_images li');
//	
//	//获取索引的li标签
//	//小圆球的索引的li标签
//	var indexLiArr=document.querySelectorAll('.banner_index li');
//	
//	//定义index记录当前的索引值
//	//注意
//	var index=1;
//	
//	//要用定时器先清定时器
//	var timer=null;
//	
//	clearInterval(timer);
//	//开启定时器
//	timer=setInterval(function(){
//		
//		//索引++SS
//		index++;
//		
//		//判断是否越界
//		if(index>ulLiArr.length-1){//有8个小圆球，10张图片
//			//当index=ulLiArr.length-1说明无线轮播已经轮到了最后一张图，也就是src=l1的这样一张图，此时用户期待看到的
//			//是l2这张图
//			//在这里我们做了一个瞬间的切换，让index=1,实际上轮播到的最后一张图其实是和用户后来看到的第一张图一样，只不过一个是放在了索引的最后
//			//一个放在了索引为1的位置，但因为是瞬间切换，所以用户是看不出来
//			index=1;
//			moveUl.style.transition='';
//			//但是这里仍然有小bug,首先小圆圈的index会越界9-1=8，而且我这里把过渡直接关了之后，下次循环的时候过渡再也没有了
//		}
//		
//		//修改ul的位置
//		//->向右为正方向
//		
//		moveUl.style.transform='translateX('+index*imgWidth*-1+'px)';
//
////		此时有一个小bug就是我们第一张看到的图片是最后一张用于轮播的图，所以我们在css里面让他先移动了一张图的距离，但此时我们发现又有一个bug,
////		此时如果index的初始值仍然设置为0，那么他进来index加一变为1之后，发现moveUl.style.transform的值和现在的位置是一样的，他就不会动了，所以我们可以
////		看到定时器是等了大概3秒的程度才开始冻得，所以我们要先把index设置为1,这样他进来就会动
//
//		//修改小圆球的位置
//		//清空
//		for(var i=0;i<indexLiArr.length;i++){
//			indexLiArr[i].className='';
//		}
//		
//		//index是ul的索引1,2,3,4,5...9
//		//indexLiArr的索引从0开始0,1,2,3,4
//		
//		
//		indexLiArr[index-1].className='current';
//		
//		
//		
//	},4000)
//}

function banner(){
	//方法一:不考虑过度效果直接切换
	
	//步骤一:index++
	//步骤二:判断索引是否越界
	//步骤三:修改轮播图ul的位置
	
	//获取屏幕的宽度变量
	//因为图片，和ul的宽度都是屏幕的100%,所以可以直接这样获取
	var imgWidth=document.documentElement.offsetWidth||document.body.offsetWidth;
	console.log(imgWidth);//375
	
	//获取轮播图的ul
	var moveUl=document.querySelector('.banner_images');
	
	/*
	 * 考虑到动画效果之后
	 */
	moveUl.style.transition='all .3s';
	//如果只写到这里会有bug，当我的索引加到最后一张的时候，按照需求是要迅速跳到第一张的
	//但是由于默认有过渡效果，实现不了，所以我们要关闭过渡，瞬间切换
	
	var ulLiArr=document.querySelectorAll('.banner_images li');
	
	//获取索引的li标签
	//小圆球的索引的li标签
	var indexLiArr=document.querySelectorAll('.banner_index li');
	
	//定义index记录当前的索引值
	//注意
	var index=1;
	
	//要用定时器先清定时器
	var timer=null;
	
	clearInterval(timer);
	//开启定时器
	timer=setInterval(function(){
		
		//索引++SS
		index++;
		
		//将过渡开启
		moveUl.style.transition='all 0.3s';
		
		
		moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
	},1000)
	
	//过渡结束事件用来修改index的值，并修改索引
	//那么我们为什么要用过渡结束事件呢？我们的意图是当轮播到最后一张的时候(也就是和第一张图片一样的那一张)，我们要等到最后一张稳定下来才能瞬间切换到第一张，否则用户就会看见我们的切换
	//所以我们要用过渡结束事件，知道他什么时候停下来
	//这个过渡结束事件是在上面的定时器中被触发的
	moveUl.addEventListener('transitionend',function(){
		console.log('过渡结束');
		
		//如果index太大了
		if(index>8){
			index=1;
			
			//关闭过渡
			moveUl.style.transition='';
			
			//ul瞬间跳到第一张图的位置，如果没有关闭过渡和瞬间跳到第一张图的位置这两句，它会过渡到第一张图
			moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
			
			//但是这里直接把过渡关了之后后面的过渡也给关了，所以要在定时器里面再开一次
			
		}else if(index<1){
			//跳到倒数第二张
			index=8;
			
			//关闭过渡
			moveUl.style.transition='';
			
			//ul瞬间跳到倒数第二张
			moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
			//此时索引是正确的，因为此时index=8 小圆球的索引8-1=7正好对上了
			
		}
		
		//修改索引li标签的class
		for(var i=0;i<indexLiArr.length;i++){
			indexLiArr[i].className='';
		}
		
		indexLiArr[index-1].className='current';
	})
	
	
	//注册三个touch事件
	
	//定义变量 记录开始的X
	var startX=0;
	
	//记录移动的X
	var moveX=0;
	
	//记录distanceX
	var distanceX=0;
	
	//触摸开始
	moveUl.addEventListener('touchstart',function(event){
		//关闭定时器
		clearInterval(timer);
		
		//关闭过渡效果
		moveUl.style.transition='';
		
		//记录开始值
		startX=event.touches[0].clientX;
	})
	
	//触摸中
	moveUl.addEventListener('touchmove',function(event){
		//计算移动的值
		moveX=event.touches[0].clientX-startX;
		
		//移动ul
		//默认的移动值是index*-1*imgWidth
		moveUl.style.transform='translate('+(moveX+(index*imgWidth*-1))+'px)';
		
		
	})
	
	//触摸结束
	//手指松开的时候判断移动的距离，进行吸附
	//由于不需要考虑正负，只需要考虑距离Math.abs()
	//吸附回的值是index*-1*imgWidth
	//如果移动的距离较大需要判断正负
	//index++;index--
	//index*-1*imgWidth
	moveUl.addEventListener('touchend',function(event){
		
		//定义最大的偏移值
		var maxDistance=imgWidth/2;
		
		//判断是否超过
		if(Math.abs(moveX)>maxDistance){
			
			//判断往左还是往右
			if(moveX>0){
				index--;
			}else{
				index++;
			}
			
			//为了好看将过渡效果开启
			moveUl.style.transition='all .3s';
			
			//因为这里写了过渡事件，所以他一定会触发过渡结束事件，在过渡结束事件里面判断了index>8的情况，所以还要判断
			//index<0的情况
			
			//吸附一整页
			moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
			
			
			
		}else {
			//如果进到这里了，说明没有超过我们定义的最大偏移值，吸附回去即可
			
			//为了好看，将过渡效果开启
			moveUl.style.transition='all .3s';
			//吸附回去
			moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
		}
		
		//记录结束值
		
		//开启定时器
		timer=setInterval(function(){
		
			//索引++SS
			index++;
				
			//将过渡开启
			moveUl.style.transition='all 0.3s';
				
				
			moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
		},1000)
	
	
	})
}

