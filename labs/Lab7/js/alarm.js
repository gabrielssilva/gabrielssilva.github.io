function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function addAlarm() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			var hours = $("#hours option:selected").text();
			var mins = $("#mins option:selected").text();
			var ampm = $("#ampm option:selected").text();
			var time = hours+":"+mins+" "+ampm;
			var alarmName = $("#alarmName").val();
			var userID = response.authResponse.userID;

			Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");
			var AlarmObject = Parse.Object.extend("Alarm");
			var newAlarm = new AlarmObject();
			newAlarm.save({ "time": time, "name": alarmName, "uid": userID }, { success: function(object) {
					getAllAlarms(userID);
					hideAlarmPopup();
				}
			});
		}
	});
}

function insertAlarm(id, time, alarmName) {
	var newDiv = $("<div></div>");
	newDiv.addClass("flexable");
	newDiv.addClass("alarm-entry");

	var nameDiv = $("<div></div>");
	nameDiv.addClass("name");
	nameDiv.html(alarmName);

	var timeDiv = $("<div></div>");
	timeDiv.addClass("time");
	timeDiv.html(time);

	var button = $("<input/>");
	button.addClass("remove-button");
	button.attr("type", "button");
	button.attr("value", "X");
	button.attr("id", id);

	newDiv.append(nameDiv);
	newDiv.append(timeDiv);
	newDiv.append(button);

	$("#alarms").append(newDiv);
}

function removeAlarm(alarmId) {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");

			var AlarmObject = Parse.Object.extend("Alarm");
			var query = new Parse.Query(AlarmObject);
			query.get(alarmId, {
				success: function(result) {
					result.destroy({
						success: function() {
							getAllAlarms(response.authResponse.userID);
						}
					});
				}
			});
		}
	});
}

function getAllAlarms(userID) {
	$("#alarms").html("");

	Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.equalTo("uid", userID);
	query.find({
		success: function(results) {
			if (results.length == 0) {
				$("#alarm-header-title").html("No Alarms set");
			} else {
				$("#alarm-header-title").html("Alarms");
			}

			for(var i=0; i<results.length; i++) {
				insertAlarm(results[i].id, results[i].get("time"), results[i].get("name"));
			}
		}
	});
}


function statusChangeCallback(response) {
	if (response.status === 'connected') {
		getAllAlarms(response.authResponse.userID);
		$("#add-btn").removeClass("hide");
	} else {
		$("#add-btn").addClass("hide");
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}


function init() {
	$("#add-btn").click(showAlarmPopup);
	$("#cancel-btn").click(hideAlarmPopup);
	$("#set-btn").click(addAlarm);

	$('#alarms').on('click', '.remove-button', function() {
    	removeAlarm(this.id);
	});
}

$(document).onLoad = init();