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
		
		//判断是否越界
		if(index>ulLiArr.length-1){//有8个小圆球，10张图片
			//当index=ulLiArr.length-1说明无线轮播已经轮到了最后一张图，也就是src=l1的这样一张图，此时用户期待看到的
			//是l2这张图
			//在这里我们做了一个瞬间的切换，让index=1,实际上轮播到的最后一张图其实是和用户后来看到的第一张图一样，只不过一个是放在了索引的最后
			//一个放在了索引为1的位置，但因为是瞬间切换，所以用户是看不出来
			index=1;
			moveUl.style.transition='';
			//但是这里仍然有小bug,首先小圆圈的index会越界9-1=8，而且我这里把过渡直接关了之后，下次循环的时候过渡再也没有了
		}
		
		//修改ul的位置
		//->向右为正方向
		
		moveUl.style.transform='translateX('+index*imgWidth*-1+'px)';

//		此时有一个小bug就是我们第一张看到的图片是最后一张用于轮播的图，所以我们在css里面让他先移动了一张图的距离，但此时我们发现又有一个bug,
//		此时如果index的初始值仍然设置为0，那么他进来index加一变为1之后，发现moveUl.style.transform的值和现在的位置是一样的，他就不会动了，所以我们可以
//		看到定时器是等了大概3秒的程度才开始冻得，所以我们要先把index设置为1,这样他进来就会动

		//修改小圆球的位置
		//清空
		for(var i=0;i<indexLiArr.length;i++){
			indexLiArr[i].className='';
		}
		
		//index是ul的索引1,2,3,4,5...9
		//indexLiArr的索引从0开始0,1,2,3,4
		
		
		indexLiArr[index-1].className='current';
		
		
		
	},4000)
}

//轮播图加了过渡事件之后
//对代码进行重构，添加进来了过渡结束知识点
//由于我们在修改ul的位置的时候会使用过渡
//当注册了过渡结束事件之后，每次过渡完毕，都会调用该事件
//将判断index是否越界，以及修改索引的代码迁移到过渡结束事件
//定时器逻辑  index++ 修改ul的位置->开始过渡
//过渡结束事件逻辑  判断index是否有效 进行修正
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
		moveUl.style.transform='translateX('+(index*imgWidth*-1)+'px)';
	},1000)
	
	//过渡结束事件用来修改index的值，并修改索引
	//那么我们为什么要用过渡结束事件呢？我们的意图是当轮播到最后一张的时候(也就是和第一张图片一样的那一张)，我们要等到最后一张稳定下来才能瞬间切换到第一张，否则用户就会看见我们的切换
	//所以我们要用过渡结束事件，之后他什么时候停下来
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
			
		}
		
		//修改索引li标签的class
		for(var i=0;i<indexLiArr.length;i++){
			indexLiArr[i].className='';
		}
		
		indexLiArr[index-1].className='current';
	})
}
