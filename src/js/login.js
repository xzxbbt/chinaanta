function login() {
	$("#login-button").click(function () {
		let userphone = $.trim($("#userphone").val());
		let password = $.trim($("#pwd").val());
		if (userphone.length == 0) {
			alert("请输入手机号");
			return;
		}

		if (password.length == 0) {
			alert("请输入密码");
			return;
		}

		let data = {
			userphone,
			password,
		};
		$.ajax({
			type: "post",
			url: "./php/login.php",
			data,
			dataType: "json",
			success: function (response) {
				console.log(response);
				if (response.status == "success") {
					saveCookie("user", userphone, 7);
					window.location.href = "index.html";
				} else {
					alert(response.msg);
				}
			},
		});
	});
}

$(function () {
	login();
});
