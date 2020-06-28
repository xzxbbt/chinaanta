$(function () {
  if (getCookie("user") !== "") {
    console.log(getCookie("user"));
    $(".huiyuan").html(getCookie("user"));
  }
});
