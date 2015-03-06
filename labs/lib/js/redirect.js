function redirect_init() {
	if (window.location.hash) {
		var url_params = location.hash.substring(1).split('&');
		var access_token_param = url_params[0].split('=');

		localStorage.setItem(access_token_param[0], access_token_param[1]);
		window.opener.on_redirect_success();
	} else {
		console.log('Error during Login');
		window.opener.on_redirect_error();
	}
}


$(document).onLoad = redirect_init();