function productList() {
	$.ajax({
		url: "./php/getGoodsList.php",
		dataType: "JSON",
	}).done((data) => {
		console.log(data);
		let str1 = data.map((item, idx) => {
			item.rightImg = JSON.parse(item.rightImg);
			var result = "";
			var con = item.rightImg;
			con.forEach((ele, index) => {
				if (index < 4) {
					result += `<img src="${ele}" alt="" />`;
				}
			});
			return `
				         <li>
				               <a href="detailed.html? goodsId=${item.goodID}">
				                  <div class="Goods-main">
				                    <img src="${item.imgScr}" alt="" />
				                    <h3>${item.goodsname}</h3>
				                    <div class="Goods-img">
				                      <span><i class="iconfont icon-zuojiantou"></i></span>
				                       ${result}
				                      <span><i class="iconfont icon-youjiantou"></i></span>
				                    </div>
				                    <p>￥${item.goodsPrice} <span>￥${item.mktPrice}</span></p>
				                  </div>
				                </a>
				              </li>
	       `;
		});

		$(".goodsList").html(str1);
	});
}
//左边选择列表selectorList
function selectorList() {
	$(".selector-item").click(function () {
		$(this).find(".selector-tag").slideToggle(100);
		$(this).find(".selector-cate i").toggleClass("current");
	});
}
$(function () {
	//数据渲染productList
	productList();
	//左边选择列表selectorList
	selectorList();
});
