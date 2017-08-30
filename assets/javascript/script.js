var config = {
    apiKey: "AIzaSyCbNhI2XV28Djz_8M7s9jnUPPxTBva6RvU",
    authDomain: "train-schedule-94103.firebaseapp.com",
    databaseURL: "https://train-schedule-94103.firebaseio.com",
    projectId: "train-schedule-94103",
    storageBucket: "train-schedule-94103.appspot.com",
    messagingSenderId: "359053286968"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("#addTrain").on('click', function(event) {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = moment($("#firstTrain").val()).format("hh:mm A");
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().on("child_added", function(snapshot) {

    // console.log(snapshot.val());

    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainFirstTrain = snapshot.val().firstTrain;
    var trainFrequency = snapshot.val().frequency;

    var currentTime = moment();


    var difference = moment().diff(moment(firstTrain), "minutes");
    console.log(firstTrain);
    
    // console.log("typeof firstTrain", typeof firstTrain + " " + firstTrain);
    // console.log("typeof trainFirstTrain", typeof trainFirstTrain + " " + trainFirstTrain);
    
    var tRemainder = diffTime % tFrequency;
    
    // console.log(moment.unix(trainFirstTrain));
    // console.log(moment().diff(moment.unix(trainFirstTrain), "minutes"));
    // console.log(remaining);
    
    var minutes = trainFrequency - remaining;

    var arrival = moment().add(minutes, "m").format("hh:mm A");
    
    // console.log(trainFirstTrain);
    // console.log(firstTrain);
    // console.log(minutes);
    // console.log(arrival);


    var newRow = $('<tr>');

    newRow.append('<td>' + trainName + '</td>');
    newRow.append('<td>' + trainDestination + '</td>');
    newRow.append('<td>' + "Every " + trainFrequency + " minutes" + '</td>');
    newRow.append('<td>' + arrival + '</td>');
    newRow.append('<td>' + minutes + '</td>');

    $(".table").append(newRow);

});