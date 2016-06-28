$(function(){

		//导航条
		$(function (){
			$(".side_main li").bind("click",function (){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			})
		})


		//显示隐藏
		$(function (){
        	 $(".projects_item li").mouseover(function(){
        	 	$(".projects_item li p:eq("+$(this).index()+")").css("display","block");
        	 });
        	 $(".projects_item li").mouseout(function(){
        	 	$(".projects_item li p:eq("+$(this).index()+")").css("display","none");
        	 });
		})

	
		//留言功能
		$(function (){

			//进入页面显示当前时间
        	var ft=cusTime(new Date());    
        	$(".ct").text(ft);

        	//留言信息输入框鼠标事件
	        $(".txt").bind('focus',function(){      
	            if($(this).val()=="请输入留言信息"){
	                $(this).val("");
	            }
	            $(this).css('color','#000');
	        })	

	        $(".txt").bind('blur',function(){
	            if($(this).val()==""){
	                $(this).val("请输入留言信息");
	            }
	            $(this).css('color','#c8c8c8');
	        })

	        //留言者姓名输入框鼠标事件
       	 	$(".newname").bind('focus',function(){      
	            if($(this).val()=="请输入姓名"){
	                $(this).val("");
	            }
	            $(this).css('color','#000');
	        })	

	        $(".newname").bind('blur',function(){
	            if($(this).val()==""){
	                $(this).val("请输入姓名");
	            }
	            $(this).css('color','#c8c8c8');
	        })

	        //提交新留言
        	$("#submit").bind('click',function(){  	
        		//alert("qwq");
	            if(($(".txt").val()=="请输入留言信息")&&($(".newname").val()=="请输入姓名")){
	                $(".tip").text("留言信息和姓名不能为空！").attr("class","showtip");
	                $(".txt").focus();
	            } else if($(".txt").val()=="请输入留言信息"){
	                $(".tip").text("留言信息不能为空！").attr("class","showtip");
	                $(".txt").focus();
	            }else if($(".newname").val()=="请输入姓名"){
	                $(".tip").text("姓名不能为空！").attr("class","showtip");
	                $(".newname").focus();
	            }else{
	                var $newTxt=$(".txt").val();
	                var $newName=$(".newname").val();
	                var $newTime=$(".ct").html();               
	                var $newMsg="<ul><li class='msgcontent'>"
	                            +$newTxt
	                            +"</li><li class='msginfo'><span class='pubdate'>"
	                            +$newTime
	                            +"</span><span class='author'>"
	                            +$newName
	                            +"</span></li></ul>";
	                 $.ajax({
	                    url:"",
	                    data:$newMsg,    
	                    success:function(data){
	                        $(".msg").append($newMsg);  
	                        $(".txt").val("请输入留言信息");
	                        $(".newname").val("请输入姓名"); 
	                    }
	                })   
	            }	

	            $(".tip").ajaxStart(function(){
	            	//alert("qweq");
	                $(this).text("正在发送").attr("class","showtip");
	                
	            })	

	            $(".tip").ajaxStop(function(){
	                $(this).text("发送成功").attr("class","showtip");
	            })

	            //清空已输入的留言信息
        		$("#clear").bind('click',function(){       
            		$(".txt").val("请输入留言信息");
            		$(".newname").val("请输入姓名");
       			})	

	            //2秒后取消提示
	            setTimeout(function(){
	                $(".showtip").text("").attr("class","tip");
	            },2000)  
	        })
        
		})


		//定时刷新当前时间
    	setInterval(function(){
        	var ct=cusTime(new Date());     
        	$(".ct").text(ct);
    	},1000)

    	//自定义时间格式
    	function cusTime(date){             
	        var year=date.getFullYear();
	        var month=setDouble(date.getMonth()+1);
	        var day=setDouble(date.getDate());
	        var hour=setDouble(date.getHours());
	        var minute=setDouble(date.getMinutes());
	        var second=setDouble(date.getSeconds());
	        return(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second);
	    }	

	    //个位数加0补成十位数
	    function setDouble(num){            
	        num=(num<10)?("0"+num):num;
	        return num;
	    }

});