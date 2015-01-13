function getTime() {
	var datetime = new Date();
	document.getElementById("clock").innerHTML = datetime.toLocaleTimeString();
	setTimeout(getTime, 1000);
}

$(document).onLoad = getTime();