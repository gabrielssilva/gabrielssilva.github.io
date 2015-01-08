function getTime() {
	var datetime = new Date();
	document.getElementById("clock").innerHTML = datetime.toLocaleTimeString();
	setTimeout(getTime, 500);
}

getTime();
setInterval(getTime, 500);