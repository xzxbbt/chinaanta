<?php
include_once "./connectDB.php";

$goodID = $_REQUEST["goodsId"];
$userphone = $_REQUEST["getuser"];



$sql = "SELECT * FROM cart where userPhone=$userphone and  goodID=$goodID";
$result = mysqli_query($db,$sql);
$num = mysqli_num_rows($result);



if($num == 0){
	$sql = "INSERT INTO cart " .
	  "(id,userPhone,goodID,num)" .
	  "VALUES " .
	  "(NULL,'$userphone','$goodID',1)";
 
 }elseif($num == 1){
	$sql = "UPDATE cart SET num = num +1 WHERE goodID = '$goodID' AND userPhone = '$userphone'";
 }
 
 $retval = mysqli_query($db,$sql);
 
 if (!$retval) {
	die('添加到购物车失败: ' . mysqli_error($conn));
 }
 echo "添加成功";
 
?>