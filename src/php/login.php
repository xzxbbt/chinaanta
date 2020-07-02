<?php
/* 1、连接数据库 */
include_once "./connectDB.php";

$userphone=$_REQUEST["userphone"];
$password=$_REQUEST["password"];


$sql="SELECT * FROM user where userPhone='$userphone'";
$result=mysqli_query($db,$sql);
if(mysqli_num_rows($result) == 0){
	echo '{"status":"error","msg":"该用户名不存在!"}';
}else{
	$sqls="SELECT * FROM user where userPhone='$userphone' and userPassword='$password'";
	$results = mysqli_query($db,$sqls);
	if(mysqli_num_rows($results) == 0){
		echo '{"status":"error","msg":"对不起，您的密码不正确！"}';
	}else{
		echo '{"status":"success","msg":"登录成功！！！"}';
	}
}
 
?>