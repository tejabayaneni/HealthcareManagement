
function setup() {
  noCanvas();


  var unameinput = select('#uname');

  var ageinput = select('#age');
  // var dnameinput=select('#doctor');
  // var timeinput=select('#time');
  var submit = select('#submitit');
  submit.mousePressed(submituser);
  var doc=select('#dname');
  var time=select('#time');
  console.log(doc.value())
  // Submit the user to the API
  function submituser() {


    // Make the url

      var url = '/add/' + unameinput.value() + '/' + ageinput.value() + '/'+doc.value()+'/'+time.value();
    alert("Hello"+"\t"+unameinput.value()+"\t"+"Your appointment has been booked with" +" "+ doc.value()+ "\t"+"at \t" + time.value());
    // Use loadJSON
    loadJSON(url, submitted);
    function submitted(result) {

      console.log(result);

      console.log(doc.value(),"doctor name")
    }
  }


}
