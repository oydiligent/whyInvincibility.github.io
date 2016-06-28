;(function ($) {
	//alert($);
	var Carousel=function(poster){
		//console.log(poster.attr("data-setting"));
		var self=this;

		//保存单个旋转木马对象
		this.poster=poster;
		this.posterItemMain=poster.find("ul.poster-list");
		this.nextBtn=poster.find("div.poster-next-btn");
		this.prevBtn=poster.find("div.poster-prev-btn");

		this.posterItems=poster.find("li.poster-item");
			//不太友好的实现偶数张图片
			if(this.posterItems.size()%2==0){
				this.posterItemMain.append(this.posterItems.eq(0).clone());
				this.posterItems = this.posterItemMain.children();
			};

		this.posterFirstItem=this.posterItems.first();
		this.posterLastItem=this.posterItems.last();
		this.rotateFlag=true;//用于解除点击旋转过快产生的bug

		//默认配置参数
		this.setting={
			"width":1000,   //幻灯片的宽度
			"height":270,   //幻灯片的高度
			"posterWidth":640,   //幻灯片第一帧的宽度
			"posterHeight":270,  //幻灯片第一帧的高度
			"scale":0.9,     //记录显示比例关系
			"speed":500,
			"autoPlay":false,
			"delay":5000,
			"verticalAlign":"middle"
		};
		$.extend(this.setting,this.getSetting());
		//console.log(this.setting);

		//设置配置参数值
		this.setSettingValue();
		this.setPosterPos();

		//绑定函数左旋转
		this.nextBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag=false;
				self.carouseRotate("left");   //这里不用this.carouseRotate();是为了防止事件漂移
			}
		});

		//绑定函数右旋转
		this.prevBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag=false;
				self.carouseRotate("right");   //这里不用this.carouseRotate();是为了防止事件漂移
			}
		});

		//是否开启自动播放
		if (this.setting.autoPlay) {
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			});
		};
	};


	Carousel.prototype={        //封装一个插件
		//自动播放
		autoPlay:function(){
			var self=this;
			this.timer=window.setInterval(function(){
				self.nextBtn.click();
			},this.setting.delay);
		},

		//旋转
		carouseRotate:function(dir){
			//alert("");
			var zIndexArr=[];
			if (dir==="left") {
				//alert("left");
				var _this_=this;
				this.posterItems.each(function(){
					var self=$(this),
					prev=self.prev().get(0)?self.prev():_this_.posterLastItem,
					width=prev.width(),
					height=prev.height(),
					zIndex=prev.css("zIndex"),
					opacity=prev.css("opacity"),
					left=prev.css("left"),
					top=prev.css("top");
					zIndexArr.push(zIndex);

					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){
							_this_.rotateFlag=true;
						});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			} else if (dir==="right") {
				//alert("right")
				var _this_=this;
				this.posterItems.each(function(){
					var self=$(this),
					next=self.next().get(0)?self.next():_this_.posterFirstItem,
					width=next.width(),
					height=next.height(),
					zIndex=next.css("zIndex"),
					opacity=next.css("opacity"),
					left=next.css("left"),
					top=next.css("top");
					zIndexArr.push(zIndex);

					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){
							_this_.rotateFlag=true;
						});
				});
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}
		},

		//设置剩余的帧的位置的关系
		setPosterPos:function(){
			var self=this;
			var sliceItems=this.posterItems.slice(1),
			sliceSize=sliceItems.size()/2,
			rightSlice=sliceItems.slice(0,sliceSize),
			level=Math.floor(this.posterItems.size()/2),
			leftSlice=sliceItems.slice(sliceSize);
			//alert(leftSlice.size());
			//alert(level);
			//设置右边帧的位置关系和宽高top
			var rw=this.setting.posterWidth,
			rh=this.setting.posterHeight,
			gap=((this.setting.width-this.setting.posterWidth)/2)/level;
			//alert(gap);
			var firstLeft=(this.setting.width-this.setting.posterWidth)/2;
			var fixOffsetLeft=firstLeft+rw;

			//设置右边的位置关系
			rightSlice.each(function(i){
				level--;
				rw=rw*self.setting.scale;
				rh=rh*self.setting.scale;
				var j=i;

				$(this).css({
					zIndex:level,
					width:rw,
					height:rh,
					opacity:1/(++j),
					left:fixOffsetLeft+(++i)*gap-rw,
					top:self.setVertucalAlign(rh),
				});
			});

			//设置左边的位置关系
			var lw=rightSlice.last().width(),
				lh=rightSlice.last().height(),
				oloop=Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
				$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:1/oloop,
					left:i*gap,
					top:self.setVertucalAlign(lh)
				});
				lw=lw/self.setting.scale;
				lh=lh/self.setting.scale;
				oloop--;
			});
		},


		//设置垂直排列对齐
		setVertucalAlign:function(height){
			var verticalType=this.setting.verticalAlign,
			top=0;
			if (verticalType==="middle") {
				top=(this.setting.height-height)/2;
			} else if(verticalType==="top"){
				top=0;
			} else if(verticalType==="bottom"){
				top=this.setting.height-height;
			}else{
				top=(this.setting.height-height)/2;
			}
			return top;
		},
		//设置配置参数值去控制基本宽度高度
		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height,

			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});

			//计算上下切换按钮宽度
			var w=(this.setting.width-this.setting.posterWidth)/2;
			//alert(this.posterItems.size()/2);
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},

		//获取人工配置参数
		getSetting:function(){

			var setting=this.poster.attr("data-setting");
			$.parseJSON(setting);
			if (setting&&setting!="") {
				return $.parseJSON(setting);
			} else {
				return {};
			}
			
		}
	};


	Carousel.init=function(posters){    //用来初始化所有集合
		var _this_=this;               //保存Carousel,this=Carousel
		posters.each(function(){        //循环这个集合
			new _this_($(this));
		});
	};
	window["Carousel"]=Carousel;    //全局注册
})(jQuery);