function getTime() {
	var datetime = new Date();
	$("#clock").html(datetime.toLocaleTimeString());
	setTimeout(getTime, 1000);
}

$(document).onLoad = getTime();