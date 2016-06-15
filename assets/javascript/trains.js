$(document).ready(function() {
  console.log('ready!');

  var currentDay = moment().format("YYYY-MM-DD");
  console.log(currentDay)

  var trainData = new Firebase("https://elizaur-train-time.firebaseio.com/");

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;
  var arrival = 0;
  var wait = 0;

  $("#submit").click(function() {

    trainName = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    console.log("Name: " + trainName)
    console.log("Destination: " + destination)
    console.log("First Train: " + firstTrain)
    console.log("Frequency: " + frequency)

    trainData.push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });

    $("input").val(null)
  });

  trainData.on('child_added', function(childSnapshot, prevChildKey) {

    var holyshitworkplease = currentDay + " " + childSnapshot.val().firstTrain
    console.log(holyshitworkplease)
    console.log(moment(holyshitworkplease).format("X"))

    var startTime = moment(holyshitworkplease).format("X")
    console.log("x-x-x-x-x")
    console.log(startTime)
    console.log(currentDay)
    console.log(childSnapshot.val().firstTrain)

    var currentTime = moment().format("X")

    console.log(moment.unix(currentTime).format("hh:mm"))

    var timeDifference = currentTime - startTime

    var minutes = Math.floor(timeDifference / 60)

    console.log(childSnapshot.val().frequency)

    var next = (minutes % childSnapshot.val().frequency)
    console.log(next)
    console.log(childSnapshot.val().frequency - next)

    var nextTime = childSnapshot.val().frequency - next;

    var trainDiv = $("<tr>");

    var nameTD = $("<td>");
    nameTD.append(childSnapshot.val().trainName);

    var destinationTD = $("<td>");
    destinationTD.append(childSnapshot.val().destination);

    var frequencyTD = $("<td>");
    frequencyTD.append(childSnapshot.val().frequency);

    var something = currentTime + (childSnapshot.val().frequency - next) * 60

    console.log("xxxxx")
    console.log(currentTime)
    console.log((childSnapshot.val().frequency - next) * 60)
    console.log("xxxxx")

    var nextTrainTD = $("<td>");
    nextTrainTD.append(moment().add(nextTime, 'minutes').format("hh:mm"));

    var minutesAwayTD = $("<td>");
    minutesAwayTD.append(childSnapshot.val().frequency - next)

    trainDiv.append(nameTD);
    trainDiv.append(destinationTD);
    trainDiv.append(frequencyTD);
    trainDiv.append(nextTrainTD);
    trainDiv.append(minutesAwayTD);

    $("#infoTable").append(trainDiv)

  }, function(errorObject) {

    console.log("Errors handled: " + errorObject.code);

  });
});

