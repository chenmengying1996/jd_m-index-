window.onload=function(){
	//左边的滑动效果
	left_scroll();
}
/*
 * 注意：要把html,body{height:100%} body{overflow:hidden;}这样屏幕就是不能滑动的，即使你的内容部分超过了父盒子
 * 的高度，你的页面也不能滑动，此时在你想滑动的元素上加上touch事件即可让他滑动
 * 1.获取一些必须知道的东西：
 * 		移动的dom元素  移动的左边的ul
 * 		移动的范围   获取移动的最大值(0:ul的顶端和左边的父盒子的顶端平齐)和最小值(父盒子的高度-ul的高度:负数)
 * 2.通过touch事件，进行滑动
 * 
 * 3.手指松开，ul会吸附回去  touchEnd事件
 */
function left_scroll(){
	
	//步骤1:获取必须知道的东西
	
	//获取移动的ul
	var moveUl=document.querySelector('.main_left ul');
	
	//ul父盒子的高度
	var parentHeight=document.querySelector('.main_left').offsetHeight;
	
	//ul的高度
	var ulHeight=moveUl.offsetHeight;
	
	//header的高度
	var headerHeight=document.querySelector('header').offsetHeight;
	
	//计算移动的范围
	var minDistance=parentHeight-ulHeight-headerHeight;//为了让第十五个li出来，继续往上移，所以要再减一个headerHeight
	
	var maxDistance=0;
	
	//定义变量，用来表示吸附的距离
	var delayDistance=100;
	
	/*console.log('最小值'+minDistance);//注意此时要约束.main_left的高度.main .list_container的高度
	console.log('最大值'+maxDistance);*/
	
	//2.通过touch事件修改ul的移动
	//定义一些变量记录距离
	
	//起始值
	var startY=0;
	
	//移动值
	var moveY=0;
	
	//总的移动距离，前一次
	var distanceY=0;
	
	//将重复的代码封装
	var startTransition=function(){
		moveUl.style.transition='all .3s';
		
	}
	
	var endTransition=function(){
		moveUl.style.transition='';
	}
	
	var setTransform=function(distance){
		moveUl.style.transform='translateY('+distance+'px)';
	}
	
	moveUl.addEventListener('touchstart',function(event){
		startY=event.touches[0].clientY;
	})
	
	moveUl.addEventListener('touchmove',function(event){
		
		moveY=event.touches[0].clientY-startY;
		
		//在移动之前先判断是否满足移动条件
		//设置滑动范围
		if((moveY+distanceY)>maxDistance+delayDistance){
			//修正
			moveY=0;
			distanceY=maxDistance+delayDistance;
		}else if((moveY+distanceY)<(minDistance-delayDistance)){//为什么是减法:因为往上动是负值，要比最小值还要小
			//修正
			moveY=0;
			distanceY=minDistance-delayDistance;
		}
		
		//在滑动ul的时候，关闭过渡
//		moveUl.style.transition='';
		endTransition();
		
//		moveUl.style.transform='translateY('+(moveY+distanceY)+'px)';//这里必须再加上distanceY，否则得到的moveUl的移动距离不合理	
		setTransform(moveY+distanceY);
		
	})
	
	moveUl.addEventListener('touchend',function(event){
		
		//修改移动的总距离(前一次)
		distanceY=distanceY+moveY;//此时可以看出来header的层级不够高
		
		//吸附回去，判断吸附方位
		if(distanceY>maxDistance){
			distanceY=maxDistance;
		}else if(distanceY<minDistance){
			distanceY=minDistance;
		}
		
//		moveUl.style.transition='all .3s';
		startTransition();
		
//		moveUl.style.transform='translateY('+distanceY+'px)';//这里不能加上moveY
		setTransform(distanceY);
		
	})
	
	//此时仍然有一个小bug,我的第十五个li拿不到，说明我的ul盒子需要再往上面走一点，此时我们可以取到header的高度，往上面再
	//走一个header的高度
	
	//在使用之前先获取
	//获取当前点击的li标签的索引值和每一个li标签的高度
	var liHeight=document.querySelector('.main_left ul li').offsetHeight;
	
	//再用之前为所有的li绑定data-index属性
	//js绑定自定义属性
	var liArr=document.querySelectorAll('.main_left ul li');
	for (var i=0;i<liArr.length;i++) {
		//dataset['index']如果html标签中已经有了data-index属性那么是赋值操作
		//如果html标签中没有data-index属性那么是添加该属性的操作
		liArr[i].dataset['index']=i;
	}
	
//	第二大部分：点击跳转
	//逻辑一：
	//绑定给ul即可
	//事件参数中是能够拿到触发该事件的dom元素的
	fox_tap(moveUl,function(e){
		console.log('触发了tap事件');
		
		//并不是jquery语法所以不能直接拿到li
		console.log(e);
		
		console.log(e.target);//拿到了a标签
		
		console.log(e.target.parentNode);//拿到了li标签
		
		//修改当前点击的li标签的class
		//排他
		
		for (var i=0;i<liArr.length;i++) {
			liArr[i].className='';
		}
		
		e.target.parentNode.className='current';
		
		//逻辑二：获取点击的li标签的索引值 让我们的ul移动索引值*li的高度的距离
			//索引值的获取可以在for循环中获取
			//或者索引值的获取还可以利用h5中的方法:为每一个li保存一个索引属性，点击li的时候获取该索引属性的值即可
			//<body data-index='1'>
			//获取dom.dataSet['index']
		//改变位置
		
		
		//知道当前点击的li标签的index的值
		var currentIndex=e.target.parentNode.dataset['index'];
		console.log('索引值为:'+e.target.parentNode.dataset['index']);
		
		//计算移动的距离
		var moveDistance=currentIndex*liHeight*-1;
		
		//对moveDistance进行修正
		//即给移动的距离一个范围
		if(moveDistance>maxDistance){//如果大于最大值将他改回来
			moveDistance=maxDistance;
		}else if(moveDistance<minDistance){//如果小于最小值将他改回来
			moveDistance=minDistance;
		}
		
		//开始移动
		startTransition();
		
		setTransform(moveDistance);
		
	})


}
