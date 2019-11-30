function setup() {
  noCanvas();


  var unameinput = select('#uname');

  var ageinput = select('#age');
  // var dnameinput=select('#doctor');
  // var timeinput=select('#time');
  var submit = select('#submitit');
  submit.mousePressed(submituser);
  var doc = select('#dname');
  var time = select('#time');
  // Submit the user to the API
  function submituser() {
    var url = '/add/' + unameinput.value() + '/' + ageinput.value() + '/' + doc.value() + '/' + time.value();
    console.log(doc.value())
    if(doc.value()=="Doctors*"||time.value()=="Time*"){
      alert("Please fill out the required fields");
    }
    for (var i = 0; i < doctime.length; i++) {
      doctor = doctime[i]
      if (doctor[1] == doc.value()) {
        var ind = doctor[2].indexOf(time.value());
        if (ind > -1) {
          doctor[2].splice(ind,1);
        }
      }
    }


    // Use loadJSON
    loadJSON(url, submitted);

    function submitted(result) {

      console.log(result);
      alert("Hello" + "\t" + unameinput.value() + "\t" + "Your appointment has been booked at \t"  + time.value());


    }
  }


}
