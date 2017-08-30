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
    firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {

    var sv = snapshot.val();
    var difference = moment().diff(moment.unix(sv.firstTrain), "minutes");
    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency ;
    var minutes = sv.frequency - remainder;

    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(minutes);
    console.log(arrival);

    // console.log(snapshot.val());

    var newRow = $('<tr>');

    newRow.append('<td>' + sv.name + '</td>');
    newRow.append('<td>' + sv.destination + '</td>');
    newRow.append('<td>' + "Every " + sv.frequency + " minutes" + '</td>');
    newRow.append('<td>' + '' + '</td>');
    newRow.append('<td>' + '' + '</td>');

    $(".table").append(newRow);

});