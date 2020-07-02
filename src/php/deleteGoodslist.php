<?php
/* 1、连接数据库 */
include_once "./connectDB.php";


$userphone=$_REQUEST["userID"];
$goodID=$_REQUEST["goodID"];



	$sql = "delete from cart where userPhone=$userphone and goodID=$goodID";
	$result = mysqli_query($db, $sql);
	
	$arr = array("status"=>"success","msg"=> "删除成功");
	echo json_encode($arr);

 
?>
