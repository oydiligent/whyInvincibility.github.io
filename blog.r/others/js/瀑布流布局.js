/*window.onload=function(){
	waterFall('main','box');
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]}
	window.onscroll=function(){
		if (checkScrollSlide) {
			var oParent=document.getElementById('main');
			//将数据块渲染到页面尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="img/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterFall('main','box');
		}
	}
}

function waterFall(parent,box){
	//将main下所有class为box的元素取出来
	var oParent=document.getElementById(parent);//parent不加‘’，因为它是变量
	var oBoxs=getByClass(oParent,box);
	//console.log(oBoxs.length);
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW=oBoxs[0].offsetWidth;//每一列的宽度
	//console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);//列数=页面宽度/每一列宽
	//console.log(cols);
	//设置main的宽
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';
	var hArr=[];
	for (var i = 0; i < oBoxs.length; i++) {
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			//apply对象的继承,minH=Math.min只能求一组数据，不能求数组中最小值，需用apply(null,hArr)继承求HArr中的值
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxs[index]+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array();//用来储存获取到所有class为box的元素
	var oElements=parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//最小值出现的索引index
function getMinhIndex(arr,val){
	for(var i in arr){
		if (arr[i]==val) {
			return i;
		}
	}
}

//检测是否具有具备加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}*/

$(window).on('load',function(){
	waterFall();
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]};
	$(window).on('scroll',function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				//console.log(value);
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterFall();
		}
	})
})

function waterFall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			//console.log(value);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})

}

function checkScrollSlide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}