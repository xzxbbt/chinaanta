$("#login-button").click(function () {
  userNameNull();
  passNull();
  loginButton();
});
function userNameNull() {
  if ($("#username").val() == "") {
    $(".tishi").html("用户名为空");
    $("#username").css({ border: " 1px solid #d71921" });
    return;
  } else {
    $("#username").css({ border: " 1px #ccc solid" });
  }
}
function passNull() {
  if ($("#pwd").val() == "") {
    $(".tishi").html("密码为空");
    $("#pwd").css({ border: " 1px solid #d71921" });
    return;
  } else {
    $("#pwd").css({ border: " 1px #ccc solid" });
  }
}
function loginButton() {
  console.log($("#username").val());
  console.log($("#pwd").val());

  $.post(
    "./../anta/php/loginCheck.php",
    { username: $("#username").val(), userpass: $("#pwd").val() },
    function (data) {
      console.log(data);
      if (data == "1") {
        confirm("登录成功");
        saveCookie("user", $("#username").val(), 3);
        $(".huiyuan").html(getCookie("user"));
      } else if (data == "0") {
        $(".tishi").html("账号或密码错误");
      }
    }
    // "json"
  );
}
