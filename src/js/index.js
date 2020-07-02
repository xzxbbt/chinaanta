function indexOneList() {
	$.ajax({
		url: "./php/getGoodsList.php",
		dataType: "JSON",
	}).done((data) => {
		console.log(data);
		let str1 = data.map((item, idx) => {
			if (idx < 6) {
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
			}
		});

		$(".newgoods").html(str1);
		var str2 = data.map((item, idx) => {
			if (5 < idx && idx < 16) {
				item.rightImg = JSON.parse(item.rightImg);
				var result = "";
				var con = item.rightImg;
				con.forEach((ele, index) => {
					if (index < 4) {
						result += `<img src="${ele}" alt="" />`;
					}
				});
				return `<li>
				<a href="detailed.html?goodsId=${item.goodID}">
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
				</li> `;
			}
		});
		$(".hotGoods").html(str2);
	});
}
$(function () {
	indexOneList();
});

//轮播
class Sliders {
	constructor(data, dom) {
		this.dom = dom;
		this.data = data;
		this.Sliders = null;
		this.sliderBox = null;
		this.sliderControl = null;
		this.sliderNav = null;
		this.timer = null;
		this.index = 0;
		this.len = this.data.length;
		this.sliderBoxItemWidth = 1920;
	}
	init() {
		this.createUI(); //1、创建标签
		this.autoPlayer(); //3、自动播放
		this.addEventHandlerWithSlider();
		this.addEventHandlerWithControl();
		this.addEventHandlerWithSliderNavItem();
	}
	autoPlayer() {
		this.timer = setInterval(() => {
			this.next();
			this.selectSliderNavItem(this.index);
		}, 2000);
	}
	addEventHandlerWithSlider() {
		this.Sliders.mouseenter(() => clearInterval(this.timer));
		this.Sliders.mouseleave(() => this.autoPlayer());
	}
	addEventHandlerWithControl() {
		let self = this;
		/* 事件委托 */
		this.sliderControl.on("click", "span", function () {
			if (this.className == "prev") {
				self.prev();
			}
			if (this.className == "next") {
				self.next();
			}
			self.selectSliderNavItem(self.index);
		});
	}
	prev() {
		this.index--;
		if (this.index == -1) {
			this.index = this.len - 1;
		}
		this.sliderBox.css("left", -(this.index * this.sliderBoxItemWidth) + "px");
	}
	next() {
		this.index++;
		if (this.index == this.len) {
			this.index = 0;
		}
		this.sliderBox.css("left", -(this.index * this.sliderBoxItemWidth) + "px");
	}
	addEventHandlerWithSliderNavItem() {
		let self = this;
		this.sliderNav.children().each((idx, item) => {
			item.onclick = function () {
				console.log("+++");
				self.selectSliderNavItem(idx);
				self.index = idx;
				self.sliderBox.css(
					"left",
					-(self.index * self.sliderBoxItemWidth) + "px"
				);
			};
		});
	}
	selectSliderNavItem(idx) {
		this.sliderNav
			.children()
			.eq(idx)
			.addClass("active")
			.siblings()
			.removeClass("active");
	}
	createUI() {
		this.createSliderNav();
		this.createSliderBox();
		this.createSliderControl();

		this.Sliders = $("<div class='Sliders'></div>");
		this.Sliders.append(this.sliderBox);
		this.Sliders.append(this.sliderControl);
		this.Sliders.append(this.sliderNav);
		this.dom.append(this.Sliders);
	}
	createSliderBox() {
		this.sliderBox = $("<ul class='Sliders-box'></ul>");
		this.sliderBox.html(
			this.data
				.map((item) => `<li class="Sliders-box-item"><img src=${item}></li>`)
				.join("")
		);
	}
	createSliderControl() {
		this.sliderControl = $("<div class='Sliders-control'></div>");
		this.sliderControl.html(
			'<span class="prev"></span> <span class="next"></span>'
		);
	}
	createSliderNav() {
		this.sliderNav = $("<ol class='Sliders-nav'></ol>");
		this.sliderNav.html(
			this.data
				.map(
					(item, idx) => `<li class="Sliders-nav-item ${
						idx == 0 ? "active" : ""
					}">${idx + 1}</li>
				`
				)
				.join("")
		);
	}
}
new Sliders(
	[
		"https://anta-cn-web.obs.myhwclouds.com/theme/images/area/2020/0624/index-01.jpg",
		"https://anta-cn-web.obs.myhwclouds.com/theme/images/area/2020/0630/index-01.jpg",
		"https://anta-cn-web.obs.myhwclouds.com/theme/images/area/2020/0601/index-01.jpg",
	],
	$(".banner")
).init();
