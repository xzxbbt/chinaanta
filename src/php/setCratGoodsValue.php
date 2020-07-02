<?php
/* 1、连接数据库 */
include_once "./connectDB.php";

$num=$_REQUEST["num"];
$goodID=$_REQUEST["goodID"];



	$sql = "UPDATE cart SET num=$num WHERE goodID=$goodID";
	$result = mysqli_query($db, $sql);
	
	$arr = array("status"=>"success","msg"=> "修改成功");
	echo json_encode($arr);

 
?>
