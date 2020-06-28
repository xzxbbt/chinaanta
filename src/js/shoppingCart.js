function loginHidden() {
  let cookieValue = getCookie("user");
  if (cookieValue == "") {
    $(".cart-to-login").show();
    $(".cart-empty").show();
    $(".cart-main").hide();
  } else if (cookieValue !== "") {
    $(".cart-to-login").hide();
    $(".cart-empty").hide();
    $(".cart-main").show();
  }
}
function getShoppingCart(cb) {
  let cookieUser = getCookie("user");
  console.log(cookieUser);
  $.get(
    "./../anta/php/getShoppingCart.php",
    {
      vipName: cookieUser,
    },
    function (data) {
      console.log(data);
      let htmlStr = "";
      data.forEach((item) => {
        htmlStr += `<tr class="goods-item">
        <td class="td-check">
          <input type="checkbox" />
        </td>
        <td class="td-img">
          <a href="shoppingCart.html">
            <img
              src="${item.goodsImg}"
              alt="${item.goodsDsec}"
            />
          </a>
        </td>
        <td class="td-infos">
          <div class="td-infos-top clearall">
            <div class="td-infos-top-l">
              <h5>${item.goodsName}</h5>
              <p>颜色:纯净白;尺码:${item.beiyong9}</p>
            </div>
            <div class="td-infos-top-r">
              <span class="infos-price">￥${item.goodsPrice}</span>
              <span class="infos-mktprice">￥${item.beiyong1}</span>
            </div>
          </div>
          <div class="td-infos-bot">
            <div class="td-infos-bot-l">
              <span>数量：</span>
              <button class="num-minus">-</button>
              <input type="text" value="${item.goodsCount}" class="num-input" />
              <button class="num-plus">+</button>
            </div>
            <div class="td-infos-bot-r">
              <span class="delete-one">删除</span>
            </div>
          </div>
        </td>
      </tr>`;
      });
      $(".cart-table").html(htmlStr);
      cb();
    },
    "json"
  );
}
// .td-check input[type=checkbox]
function addEvent() {
  $(".checkbox-input").click(function () {
    $(".td-check input[type=checkbox]").prop("checked", this.checked);
    $(".checkbox-input").prop("checked", this.checked);
  });
}
$(function () {
  // 登录隐藏
  loginHidden();
  //获取购物车
  getShoppingCart(addEvent);
});
