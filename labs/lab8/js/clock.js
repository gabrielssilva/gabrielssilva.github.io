var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Tuesday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", 
			  "September", "October", "November", "December"];

function getTime() {
	var datetime = new Date();
	var hours = ("0" + datetime.getHours()).slice(-2);
	var minutes = ("0" + datetime.getMinutes()).slice(-2);

	$("#time").html(hours + ":" + minutes);
	setTimeout(getTime, 1000);
}

function setBodyClass(temp) {
	var body;

	if (temp >= 90) {
		body = "hot";
	} else if (temp >= 80) {
		body = "warm";
	} else if (temp >= 70) {
		body = "nice";
	} else if (temp >= 60) {
		body = "chilly";
	} else{
		body = "cold";
	}

	$("body").attr("class", body);
	$(".btn").attr("class", "btn btn-primary text-center "+body);
}

function getTemp(response, statusR, xhrR) {
	var key = "d69df464db9d945f61213160fde2dfd5";
	var position = response.loc;
	var city = response.city;
	var region = response.region;
	var url = "https://api.forecast.io/forecast/"+key+"/"+position+"?callback=?";

	$.getJSON(url, function(data, status, xhr) {
		var icon = "img/"+data.currently.icon+".png";
		var summary = data.currently.summary;
		var temperature = Math.round(data.currently.temperature);

		var datetime = new Date(data.currently.time * 1000);
		var date = weekdays[datetime.getDay()] + ", " + months[datetime.getMonth()] + " " + datetime.getDate();

		setBodyClass(temperature);
		$(".forecast-label.big").html(summary);
		$(".forecast-icon.big").attr("src", icon);
		$(".forecast-temp").html(temperature+"&deg;F");
		$("#date").html(date);
		$("#location").html(city + ", " + region);
		getWeekTemp(data);
	});
}

function getLocation() {
	$.getJSON("http://ipinfo.io/json", getTemp);
}

function getWeekTemp(data) {
	for(var i=1; i<=5; i++) {
		var datetime = new Date(data.daily.data[i].time * 1000);
		var day = weekdays[datetime.getDay()];
		var icon = "img/"+data.daily.data[i].icon+".png";
		var temperatureMin = Math.round(data.daily.data[i].temperatureMin);
		var temperatureMax = Math.round(data.daily.data[i].temperatureMax);


		$(".forecast-icon.small.day"+i).attr("src", icon);
		$(".forecast-label.small.day"+i).html(day+ ": " + temperatureMin+"/"+temperatureMax+" &deg;F");
	}
}

function init() {
	getTime();
	getLocation();
}

$(document).onLoad = init();