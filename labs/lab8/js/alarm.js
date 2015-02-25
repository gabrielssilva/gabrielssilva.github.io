function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function addAlarm() {
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var time = hours+":"+mins+" "+ampm;
	var alarmName = $("#alarmName").val();

	Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");
	var AlarmObject = Parse.Object.extend("Alarm");
	var newAlarm = new AlarmObject();
	newAlarm.save({ "time": time, "name": alarmName }, { success: function(object) {
			getAllAlarms();
			hideAlarmPopup();
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
	Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");

	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.get(alarmId, {
		success: function(result) {
			result.destroy({
				success: function() {
					getAllAlarms();
				}
			});
		}
	});
}

function getAllAlarms() {
	$("#alarms").html("");

	Parse.initialize("RT7cnFXGzL1ORWU2aUdZcnIk6lwIFOq72eKC1YZq", "4sI2UrUOygjaRUhNAAAgLyODWq1PMHAx5UKLaAXy");
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
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


function init() {
	$("#add-btn").click(showAlarmPopup);
	$("#cancel-btn").click(hideAlarmPopup);
	$("#set-btn").click(addAlarm);

	$('#alarms').on('click', '.remove-button', function() {
    	removeAlarm(this.id);
	});

	getAllAlarms();
}

$(document).onLoad = init();
