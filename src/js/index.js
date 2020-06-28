function newGoods() {
  $.get(
    "./../anta/php/getGoodsListNew.php",
    { typeId: "001", count: "6" },
    function (data) {
      addNewGoods(data);
    },
    "json"
  );
}
function addNewGoods(data) {
  let htmlStr = "";
  data.forEach((item) => {
    htmlStr += `
             <li>
                <a href="detailed.html?goodsId=${item.goodsId}">
                  <div class="Goods-main">
                    <img src="${item.goodsImg}" alt="" />
                    <h3>${item.goodsDesc}</h3>
                    <div class="Goods-img">
                      <span><i class="iconfont icon-zuojiantou"></i></span>
                      <img src="${item.beiyong2}" alt="" />
                      <img src="${item.beiyong3}" alt="" />
                      <span><i class="iconfont icon-youjiantou"></i></span>
                    </div>
                    <p>￥${item.goodsPrice} <span>￥${item.beiyong1}</span></p>
                  </div>
                </a>
              </li>
            `;
  });
  $(".newgoods").html(htmlStr);
}
function hotGoods() {
  $.get(
    "./../anta/php/getGoodsList.php",
    function (data) {
      addhotGoods(data);
    },
    "json"
  );
}
function addhotGoods(data) {
  let htmlStr = ` <div class="goods-ads">
  <img src="img/index-ads-02.jpg" alt="" />
</div>`;
  data.forEach((item) => {
    htmlStr += `
             <li>
                <a href="detailed.html?goodsId=${item.goodsId}">
                  <div class="Goods-main">
                    <img src="${item.goodsImg}" alt="" />
                    <h3>${item.goodsDesc}</h3>
                    <div class="Goods-img">
                      <span><i class="iconfont icon-zuojiantou"></i></span>
                      <img src="${item.beiyong2}" alt="" />
                      <img src="${item.beiyong3}" alt="" />
                      <span><i class="iconfont icon-youjiantou"></i></span>
                    </div>
                    <p>￥${item.goodsPrice} <span>￥${item.beiyong1}</span></p>
                  </div>
                </a>
              </li>
            `;
  });
  $(".hotGoods").html(htmlStr);
}
$(function () {
  newGoods();
  hotGoods();
});
