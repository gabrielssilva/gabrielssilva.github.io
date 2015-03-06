var callback_functions;
var popup_window;

function init(params) {
	callback_functions = params.callbacks;

	$("#login-button").click( function() {
		login(params)
	});
}

function login(params) {
	var client_id = params.client_id;
	var type = params.type;
	var url = "https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type;
	popup_window = window.open(url);
}

function on_redirect_success() { 
	popup_window.close();
	$("#login-button").addClass("hide");
	$("#label").removeClass("hide");
	callback_functions.success();
}

function on_redirect_error() { 
	popup_window.close();
	callback_functions.error();
}

$(document).onLoad = init({ "client_id":"e3381d94f8f1869", "type":"token", "callbacks": {
	success: function(object) {

		$.ajax({
         	url: "https://api.imgur.com/3/account/me",
         	dataType: "json",
         	headers: { "Authorization":"Bearer "+localStorage.getItem("access_token") },
        	type: "GET",
        	success: function(object) { 
        		user = object.data;
        		alert('Username: ' + user.url); 
        	}
     	});
	},
	error: function() {
		alert('error');
	}
}});