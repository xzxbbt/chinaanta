<?php
    header("content-type:text/html;charset=utf-8");
    // 一、接收前端的数据
    $name = $_GET['username'];


    // 二、处理（连接数据库，进行查询）
    // 1、连接数据库
    $conn = mysqli_connect("anta","root","root","anta");

    // 2、执行sql语句
    // 执行查询语句的返回值是个表格
    $result = mysqli_query($conn,"select * from vip where username='{$name}'");

    // 3、关闭数据库
    mysqli_close($conn);


    // 三、响应结果
    // mysqli_fetch_all()函数：把结果进行转换
    $arr = mysqli_fetch_all($result, MYSQL_ASSOC);
 
    if(count($arr)==1){
        echo "1";  //用户名存在
    }else{
        echo "0"; //用户名不存在
    }

?>