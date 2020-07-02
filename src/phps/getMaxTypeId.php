<?php
	header("Content-Type:text/html;charset=utf-8");
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("anta",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "select max(typeid) from goodsType";
	$result = mysql_query($sqlstr,$conn);//执行查询的sql语句后，有返回值，返回的是查询结果
	if(!$result){
		die("获取数据失败".mysql_error());
	}
	//查询行数
    $query_num =mysql_num_rows($result);
    //echo "行数：".$query_num;
	
	
	$query_row = mysql_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
	$str="";
	if($query_row){
		$str = $query_row[0];
	}
	
	//4、关闭数据库
	mysql_close($conn);
	
	//3、给客户端返回商品的json数组！
	echo $str;
?>
