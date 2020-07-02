<?php

include_once "./connectDB.php";

$userID=$_REQUEST["userID"];

$sql="SELECT cart.*,datas.* from cart,datas where cart.goodID = datas.goodID and userPhone=$userID;";
mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);
?>