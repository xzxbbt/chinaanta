<?php
/* 1、连接数据库 */
include_once "./connectDB.php";

$userphone=$_REQUEST["userphone"];
$userpass=$_REQUEST["userpass"];


$sql="select * from user where userPhone='$userphone'";

$result = mysqli_query($db,$sql);
if(mysqli_num_rows($result) == 0)
{
	# 该用户不存在可以直接注册
	# 具体：向数据库中写入一行数据
	$sql = "INSERT INTO `user` (`userID`, `userPhone`, `userPassword`) VALUES (NULL, '$userphone', '$userpass')";
	$result = mysqli_query($db, $sql);
	
	$arr = array("status"=>"success","msg"=> "恭喜你，注册成功！");
	echo json_encode($arr);
}else{

  echo '{"status":"error","msg":"抱歉，该用户名已经被注册，请重新选择一个更优秀的名字！！"}';
}
 
?>