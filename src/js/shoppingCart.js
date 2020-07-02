//获取cookie
function getcookies(userID) {
	if (userID != "") {
		$(".cart-to-login").css("display", "none");
		//.siblings(".cart-empty")
		//.css("display", "none");
		getShoppingCart(userID);
	} else {
		$(".cart-to-login").css("display", "block");
	}
}

//获取购物车数据
function getShoppingCart(userID) {
	$.ajax({
		url: "./php/shoppingCart.php",
		data: { userID },
		dataType: "json",
	}).done((data) => {
		setCartData(data);
	});
}
//设置购物车数据
function setCartData(data) {
	console.log(data);
	var str = data
		.map((item, idx) => {
			return `  <tr class="goods-item" data-id="${item.goodID}">
		<td class="td-check">
		  <input type="checkbox" />
		</td>
		<td class="td-img">
		  <a href="shoppingCart.html">
			 <img
				src="${item.imgScr}"
				alt="${item.goodsname}"
			 />
		  </a>
		</td>
		<td class="td-infos">
		  <div class="td-infos-top clearall">
			 <div class="td-infos-top-l">
				<h5>${item.title}</h5>
				<p>颜色:纯净白;尺码:M</p>
			 </div>
			 <div class="td-infos-top-r">
				<span class="infos-price">￥${item.goodsPrice}</span>
				<span class="infos-mktprice">￥${item.mktPrice}</span>
			 </div>
		  </div>
		  <div class="td-infos-bot">
			 <div class="td-infos-bot-l">
				<span>数量：</span>
				<button class="num-minus">-</button>
				<input type="text" value="${item.num}" class="num-input" />
				<button class="num-plus">+</button>
			 </div>
			 <div class="td-infos-bot-r">
				<span class="delete-one">删除</span>
			 </div>
		  </div>
		</td>
	 </tr> `;
		})
		.join("");
	$(".cart-table").html(str);
	if ($(".cart-table").html() != "") {
		$(".cart-empty").css("display", "none");
	} else if ($(".cart-table").html() == "") {
		$(".cart-empty").css("display", "block");
	}
	cartFunction();
}
//设置购物车功能
function cartFunction() {
	//全选功能
	$(".checkbox-input").click(function () {
		if (this.checked == true) {
			$(".td-check input[type=checkbox]").prop("checked", this.checked);
			$(".checkbox-input").prop("checked", this.checked);
			totalAmount();
		} else {
			$(".td-check input[type=checkbox]").prop("checked", this.checked);
			$(".checkbox-input").prop("checked", this.checked);
			totalAmount();
		}
	});
	//商品选择按钮
	$(".td-check input[type=checkbox]").click(function () {
		$(".td-check input[type=checkbox]").each((idx, item) => {
			//console.log(item.checked);
			if (item.checked == true) {
				$(".checkbox-input").prop("checked", true);
			} else if (item.checked == false) {
				$(".checkbox-input").prop("checked", false);
				return false;
			}
		});
		totalAmount();
	});
	//增加按钮
	$(".num-plus").click(function () {
		var num = $(this).prev().val();
		num++;
		if (num > 100) {
			alert("商品不能多余于100件");
			return false;
		}
		var goodID = $(this).parents(".goods-item").data("id");
		$.ajax({
			url: "./php/setCratGoodsValue.php",
			data: { num, goodID },
			dataType: "json",
		}).done((data) => {
			if ((data.status = "success")) {
				$(this).prev().val(num);
			}
		});
		totalAmount();
	});
	//减少按钮
	$(".num-minus").click(function () {
		var num = $(this).next().val();
		num--;
		if (num < 1) {
			alert("商品不能少于零件");
			return false;
		}
		var goodID = $(this).parents(".goods-item").data("id");
		$.ajax({
			url: "./php/setCratGoodsValue.php",
			data: { num, goodID },
			dataType: "json",
		}).done((data) => {
			if ((data.status = "success")) {
				$(this).next().val(num);
			}
		});
		totalAmount();
	});
	//input修改自身数量
	$(".num-input").mouseleave(function () {
		var num = $(this).val();
		if (num < 1) {
			alert("商品不能少于1件");
			return false;
		} else if (num > 100) {
			alert("商品不能多余于100件");
			return false;
		}
		var goodID = $(this).parents(".goods-item").data("id");
		$.ajax({
			url: "./php/setCratGoodsValue.php",
			data: { num, goodID },
			dataType: "json",
		}).done((data) => {
			if ((data.status = "success")) {
				$(this).val(num);
			}
		});
		totalAmount();
	});
	//删除商品
	$(".delete-one").click(function () {
		var goodID = $(this).parents(".goods-item").data("id");
		if (confirm("你是否删除这件商品")) {
			$.ajax({
				url: "./php/deleteGoodslist.php",
				data: { userID, goodID },
				dataType: "json",
			}).done((data) => {
				if ((data.status = "success")) {
					alert("删除成功");
					top.location.reload();
				}
			});
		}
		totalAmount();
	});
}
//刷新金额
function totalAmount() {
	let num = 0;
	$(".goods-item").each((idx, item) => {
		//console.log($(item).find(".td-check input").prop("checked"));
		if ($(item).find(".td-check input").prop("checked") == true) {
			num +=
				parseFloat($(item).find(".num-input").val()) *
				parseFloat($(item).find(".infos-price").text().split("￥")[1]);
		}
	});
	$(".price").text("￥" + num);
}

let userID = getCookie("user");
$(function () {
	getcookies(userID);
	totalAmount();
});
