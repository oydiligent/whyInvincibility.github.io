<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>当前系统时间</title>
	<style type="text/css">
		.content1{
			background: gray;
			margin: 30px auto;
			width: 400px;
			height: 300px;
			font-size: 16px;
		}
	</style>
	<script type="text/javascript">
		window.onload=function(){
			showTime();
		}
		function checkTime(i){
			if (i<10) {
				return '0'+i;
			} else {
				return ''+i;
			}
		}
		function showTime(){
			var nowDate=new Date();
			//alert(nowDate);
			var year=nowDate.getFullYear();
			var month=nowDate.getMonth()+1;
			var date=nowDate.getDate();
			var d=nowDate.getDay();
			var h=nowDate.getHours();
			var m=nowDate.getMinutes();
			var s=nowDate.getSeconds();
			m=checkTime(m);
			s=checkTime(s);

			var weekday=new Array(7)
			weekday[0]="星期日"
			weekday[1]="星期一"
			weekday[2]="星期二"
			weekday[3]="星期三"
			weekday[4]="星期四"
			weekday[5]="星期五"
			weekday[6]="星期六"

			document.getElementById('show').innerHTML=year+"年"+month+"月"+date+"日"+weekday[d]+h+":"+m+":"+s;
			setTimeout(showTime,500)
		} 
	</script>

</head>
<body>
	<div class="content1">
		<div id="show">当前时间</div>
	</div>
</body>
</html>
