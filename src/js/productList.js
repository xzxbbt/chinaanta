function goodsList() {
  $.get(
    "./../anta/php/getGoodsList.php",
    function (data) {
      addgoodsList(data);
    },
    "json"
  );
}
function addgoodsList(data) {
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
  $(".goodsList").html(htmlStr);
}
$(function () {
  goodsList();
});
