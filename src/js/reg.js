//tab切换
function tab() {
	$(".reg-title>div").click(function () {
		var index = $(this).index();
		$(this)
			.css({ color: "white", "background-color": "rgb(34, 34, 34)" })
			.siblings()


			
			.css({ color: " #999", background: "#fbfbfb" });
		$(".reg-main>div")
			.eq(index)
			.css("display", "block")
			.siblings()
			.css("display", "none");
	});
}
function reg() {
	let options = {
		userphone: {
			reg: `/^1[3-9]\\d{9}$/.test(val)`,
			msg: "手机号码不规范！",
		},
		userpass: {
			reg: `/^[a-zA-Z0-9]{6,18}$/.test(val)`,
			msg: "密码不规范！",
		},
		imageCode: {
			reg: "imgCodeTarget == val",
			msg: "输入的验证码不正确！！！",
		},
	};
	$(".phone-main form input").blur(function () {
		let action = this.id;
		let val = $.trim($(this).val());
		if (eval(options[action].reg)) {
			$(".error_prompt").text("");
			$(this).css("border", "1px #ccc solid");
		} else {
			$(".error_prompt").text(options[action].msg);
			$(this).css("border", "1px solid red");
		}
	});

	let imgCodeTarget;
	let captcha = new Captcha({
		lineNum: 10,
		dotNum: 3,
		fontSize: 40,
		length: 4,
		content: "0123456798abcdefghijklmnopqrstuvwsyz",
	});

	captcha.draw(document.querySelector("#captcha"), (r) => {
		imgCodeTarget = r;

		/* 当用户点击图形变化验证码的时候需要重新校验 */
		//$("#imageCode").trigger("blur");
	});
	//$(#im)
	$("#captcha").click(function () {
		$("#imageCode").val("");
	});

	/* 注册按钮的点击事件 */
	$("#phoneSubmit").click(function () {
		/* 001-检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
		$("#userphone,#userpass,#imageCode").trigger("blur");
		if ($(".error_prompt").length != 2) {
			console.log("请问提示的信息呢1");
			return;
		}

		/* 002-检查用户是否勾选了用户协议*/
		if (!$("#protocol").is(":checked")) {
			console.log("请问提示的信息呢2");
			alert("请阅读并同意用户协议！");
			return;
		}

		/* 003-发送网络请求把注册相关的信息提交给服务器 */
		let data = {
			userphone: $.trim($("#userphone").val()),
			//username: $.trim($("#usernameID").val()),
			//password: md5($.trim($("#passwordA").val())).substr(0, 10),
			userpass: $.trim($("#userpass").val()),
		};

		$.ajax({
			data,
			type: "post",
			dataType: "json",
			url: "./php/register.php",
			success(response) {
				// console.log(response);
				/* 如果注册成功，那么就先提示用户然后再跳转 */
				console.log(response);
				if (response.status == "success") {
					console.log("正确");
					alert(response.msg);
					window.location.href = "index.html";
				} else {
					console.log("错误");
					alert(response.msg);
				}
			},
		});
	});
}
$(function () {
	tab();
	reg();
});
