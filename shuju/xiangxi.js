var goods = document.querySelector(".pro-container");
var smali = [];
var smallList = Array.from(
	goods.querySelector(".small-list").querySelectorAll("li")
);
smallList.forEach((item, idx) => {
	smali.push(item.querySelector("img").getAttribute("src").split("?")[0]);
});

var color = [];
var colorList = Array.from(
	goods.querySelector(".color_list").querySelectorAll("li")
);
colorList.forEach((item, idx) => {
	color.push(item.querySelector("img").getAttribute("src").split("?")[0]);
});

var details = [];
var proDetails = Array.from(
	goods.querySelector(".pro-details").querySelectorAll("img")
);
proDetails.forEach((item, idx) => {
	details.push(item.getAttribute("src").split("?")[0]);
});

var obj = [];
var goodsContent = goods.querySelector(".J_pro_infos_t");
obj.push({
	imgScr: goods
		.querySelector(".bigImg-box")
		.querySelector("img")
		.getAttribute("src")
		.split("?")[0],
	title: goodsContent.children[0].innerText,
	goodsname: goodsContent.children[1].innerText,
	goodID: goodsContent.children[2].innerText.split("：")[1],
	goodsPrice: goodsContent.children[3].innerText.split("￥")[1],
	mktPrice: goodsContent.children[3]
		.querySelector(".mktprice")
		.innerText.split("￥")[1],
	leftImg: smali,
	rightImg: color,
	goodsImg: details,
});
JSON.stringify(obj);
