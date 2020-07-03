function toUpdateLists(urlId) {
	$.ajax({
		url: "./php/getGoodsInfo.php",
		data: { urlId },
		dataType: "json",
	}).done((data) => {
		productInfos(data);
	});
}

function productInfos(data) {
	// pro-view-l左边proViewL
	proViewL(data);
	//大图片bigImg-box
	bigImgBox(data);
	// 右边信息infos_t
	infosT(data);
	//   infosB(data);
	//   colorList 右边图片
	colorList(data);
	//下面详细图片
	proDetails(data);
}
function proViewL(data) {
	//data.
	// <li><img src="img/detailed/96928142-1-3.jpg" alt="" /></li>

	var str = JSON.parse(data.leftImg);
	var html = str
		.map((item, idx) => {
			if (idx < 5) {
				return `<li>
								<img src="${item}" alt="" />
							</li>`;
			}
		})
		.join("");
	$(".pro-view-l ul").html(html);
}
function bigImgBox(data) {
	var str = data.imgScr;
	var html = `<img src="${str}" alt="" />`;

	$(".bigImg-box").html(html);
}
function infosT(data) {
	var html = `
					<p>${data.title}</p>
					<h3 class="goods-name">
					${data.goodsname}
					</h3>
					<p class="goods-sn" data-id=${data.goodID}>款号：${data.goodID}</p>
					<p class="goods-price">
					￥${data.goodsPrice} <span class="mktprice">￥${data.mktPrice}</span>
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
	$(".J_pro_infos_t").html(html);
}
function colorList(data) {
	var str = JSON.parse(data.rightImg);

	var html = str
		.map((item, idx) => {
			if (idx < 5) {
				return `<li class="color_code">
							<img
								class="imgs"
								src="${item}"
								alt=""
							/>
			 	</li>`;
			}
		})
		.join("");
	$(".color_list").html(html);
}
function proDetails(data) {
	var str = JSON.parse(data.goodsImg);
	var html = str
		.map((item, idx) => {
			return `<img src="${item}" alt="" />`;
		})
		.join("");
	$(".pro-details").html(html);
}
//加入购物车

function pushCart() {
	$(".addShoppingCart").click(function () {
		let goodsId = $(".goods-sn").attr("data-id") || "";
		let getuser = getCookie("user") || "";
		if (goodsId && getuser) {
			//发送请求，执行到购物车
			console.log(goodsId, getuser);
			$.ajax({
				url: "./php/addCart.php",
				data: { goodsId, getuser },
			}).done((data) => {
				console.log("返回值", data);
			});
		} else {
			alert("你好，你还没登录，登录后即可加入购物车");
			location.href = "./login.html";
		}
	});
}
function clickGooodsList() {
	$(".pro-container").on("click", ".pro-view-l img", function () {
		$(this)
			.parent()
			.css("border", "2px solid rgb(88, 88, 88)")
			.siblings("li")
			.css("border", "1px solid #eee");
		var bigSrc = $(".bigImg-box img").attr("src");
		var thisScr = $(this).attr("src");
		$(".bigImg-box img").attr("src", thisScr);
	});
}
function goodsfangdajing() {
	$(".pro-bigImg").on("mouseenter", ".zhe", function () {
		var img = $(".bigImg-box img").attr("src");
		$(".show-box").css("background-image", `url(${img})`);
	});
	$(".pro-bigImg").mouseenter(function () {
		$(".zhe,.show-box").show();
		let oMirrorBox = document.querySelector(".zhe");
		let oBox = document.querySelector(".pro-bigImg");
		let oShowBox = document.querySelector(".show-box");
		let boxOffsetLeft = oBox.offsetLeft;
		let boxOffsetTop = oBox.offsetTop;
		let mirrorWidth = oMirrorBox.offsetWidth;
		let mirrorHeight = oMirrorBox.offsetHeight;

		// 给box绑定onmousemove事件，在鼠标移动时，让mirror-box跟着鼠标走。
		oBox.addEventListener("mousemove", function (event) {
			let e = event || window.event;

			// 一、数据处理
			// 1、计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
			// 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
			let left1 = e.pageX - boxOffsetLeft - mirrorWidth / 2;
			let top1 = e.pageY - boxOffsetTop - mirrorHeight / 2;

			// 2、处理边界
			if (left1 < 0) {
				left1 = 0;
			} else if (left1 + mirrorWidth > 643) {
				left1 = 643 - mirrorWidth;
			}

			if (top1 < 0) {
				top1 = 0;
			} else if (top1 + mirrorHeight > 643) {
				top1 = 643 - mirrorHeight;
			}

			// 二、外观呈现
			// 1、移动放大镜
			oMirrorBox.style.left = left1 + "px";
			oMirrorBox.style.top = top1 + "px";

			$(".show-box").css(
				"background-position",
				`-${left1 * 2}px -${top1 * 2}px`
			);
			// 2、改变show-box的背景图片的位置
			//oShowBox.style.backgroundPosition = `-${left1 * 2}px -${top1 * 2}px`;
		});
	});
	$(".pro-bigImg").mouseleave(function () {
		$(".zhe,.show-box").hide();
	});
}

//放大镜效果
$(function () {
	var urlId = location.search.split("=")[1];
	toUpdateLists(urlId);
	pushCart();
	clickGooodsList();
	goodsfangdajing();
});
