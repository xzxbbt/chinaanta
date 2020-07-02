// tab
$(".reg-title>div").click(function () {
  $(".reg-title>div").css({
    color: " #999",
    background: "#fbfbfb",
  });
  $(".reg-main>div").css("display", "none");
  let $a = $(this).index();
  $(".reg-title>div").eq($a).css({
    color: "white",
    backgroundColor: " rgb(34, 34, 34)",
  });
  $(".reg-main>div").eq($a).css({ display: "block" });
});
var tijiao = [0, 0, 0];
// 电话号码
$("#userphone").change(function () {
  //   console.log($(this).val());
  let reg = /^1[3456789]\d{9}$/;
  if (reg.test($(this).val())) {
    $(".error_prompt").text("");
    tijiao[0] = 1;
    //用户名是否重复
    checkUserAjax($("#userphone"), $(".error_prompt"));
    $("#userpass").change();
  } else {
    $(".error_prompt").text("输入的电话号码有误");
    tijiao[0] = 0;
  }
});
//用户名ajax
function checkUserAjax(dom1, dom2) {
  $.get("./../anta/php/checkUser.php", { username: dom1.val() }, function (
    data
  ) {
    if (data == "1") {
      dom2.text("该电话号码已被注册");
    } else if (data == "0") {
      dom2.text("该电话号码可用");
    }
  });
}
// 密码
$("#userpass").change(function () {
  let reg = /^[a-z0-9_-]{6,18}$/;
  if (reg.test($(this).val())) {
    $(".error_prompt").text("");
    tijiao[1] = 1;
    clickCheckbox();
  } else {
    $(".error_prompt").text("输入密码有误");
    tijiao[1] = 0;
  }
});
// 条款
$(".clause>input[type='checkbox']").click(function () {
  clickCheckbox();
});
function clickCheckbox() {
  if ($(".clause>input[type='checkbox']").prop("checked") == true) {
    tijiao[2] = 1;
    $(".error_prompt").text("");
  } else {
    $(".error_prompt").text("没有阅读条款");
    tijiao[2] = 0;
  }
}
// 注册提交
$("#phoneSubmit").click(function () {
  let count = 0;
  for (let i = 0; i < tijiao.length; i++) {
    count += tijiao[i];
  }
  if (count == 3) {
    // console.log(count + "注册成功");
    phoneSb();
  } else {
    $("#userphone").change();
  }
});
function phoneSb() {
  $.post(
    "./../anta/php/regSave.php",
    { username: $("#userphone").val(), userpass: $("#userpass").val() },
    function (data) {
      if (data == 1) {
        if (confirm("注册成功，是否进行登录？")) {
          open("login.html");
        } else {
          confirm("服务器出错");
        }
      }
    }
    // "json"
  );
}
