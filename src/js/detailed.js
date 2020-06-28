function productDetails(goodsId) {
  $.post(
    "./../anta/php/getGoodsInfo.php",
    { goodsId: goodsId },
    function (data) {
      productInfos(data);
    },
    "json"
  );
}
function productInfos(datas) {
  // console.log(datas);
  // pro-view-l左边proViewL
  proViewL(datas);
  //大图片bigImg-box
  bigImgBox(datas);
  // 右边信息infos_t
  infosT(datas);
  //   infosB(datas);
  //   colorList 右边图片
  colorList(datas);
  //下面详细图片
  proDetails(datas);
}
function proViewL(datas) {
  let htmlstr = "";
  htmlstr = ` 
        <li><img src="${datas.goodsImg}" alt="" /></li>
        <li><img src="${datas.beiyong2}" alt="" /></li>
        <li><img src="${datas.beiyong3}" alt="" /></li>`;
  $(".pro-view-l ul").html(htmlstr);
}
function bigImgBox(datas) {
  let htmlstr = "";
  htmlstr = ` <img src="${datas.goodsImg}" alt="" />`;
  $(".bigImg-box").html(htmlstr);
}
function infosT(datas) {
  let htmlstr = "";
  htmlstr = `
                  <p>${datas.goodsName}</p>
                <h3 class="goods-name">
                ${datas.goodsDesc}
                </h3>
                <p class="goods-sn">款号：${datas.goodsId}</p>
                <p class="goods-price">
                  ￥${datas.goodsPrice}<span class="mktprice">￥${datas.beiyong1}</span>
                </p>
                <div class="promos clearall">
                  <div class="promos-title">注销</div>
                  <div class="promos-content">
                    <a href="##" title="官方商城全场包邮">官方商城全场包邮</a>
                    <a href="##" title="10元无门槛">10元无门槛</a>
                    <a href="##" title="满200减20元">满200减20元</a>
                  </div>
                </div>
      `;
  $(".J_pro_infos_t").html(htmlstr);
}
function colorList(datas) {
  let htmlstr = "";
  htmlstr = `
      <li class="color_code">
             <img src="${datas.goodsImg}" alt="" />
      </li>
      <li class="color_code">
             <img src="${datas.beiyong2}" alt="" />
      </li>
      <li class="color_code">
             <img src="${datas.beiyong3}" alt="" />
      </li>`;
  $(".color_list").html(htmlstr);
}
function proDetails(datas) {
  let htmlstr = "";
  htmlstr = `
  < <img src="${datas.beiyong4}" alt="" />
  <img src="${datas.beiyong5}" alt="" />
  <img src="${datas.beiyong6}" alt="" /> 
  <img src="${datas.beiyong7}" alt="" />
  <img src="${datas.beiyong8}" alt="" /> `;
  $(".pro-details").html(htmlstr);
}

// $(".pro-view-l ul>li").click(function () {
//   console.log(this);
// });
//增加购物车
function addCart(goodsId) {
  let vipName = getCookie("user");
  $.post(
    "./../anta/php/addShoppingCart.php",
    {
      vipName: vipName,
      goodsId: goodsId,
      goodsCount: $("#selectNum").val(),
    },
    (data) => {
      if (data === "0") {
        alert("添加失败");
      } else {
        alert("添加成功");
      }
    }
  );
}
$(function () {
  var goodsId = location.search.split("=")[1];
  productDetails(goodsId);
  //增加到购物车
  $(".addShoppingCart").click(function () {
    addCart(goodsId);
  });
});
