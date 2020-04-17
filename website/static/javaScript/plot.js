var datax= [];
var datay= [];
var max= 20;
      var config0 = {
  apiKey: "AIzaSyAcZnLXatmTotGNkRkEjY1HeuUv0XkP0CA",
  authDomain: "mays-a01c6.firebaseapp.com",
  databaseURL: "https://mays-a01c6.firebaseio.com",
  projectId: "mays-a01c6",
  storageBucket: "mays-a01c6.appspot.com",
  messagingSenderId: "374113765309"
  };
  firebase.initializeApp(config0);
// Reference messages collection
var chai=30
function dd(){
  chai= chai + 10;
  console.log(chai);
  manish();
}
var click = 0
function manish(){
      var d = new Date();
  var n = d.getMonth();
  var z = d.getFullYear();
var Year= z - 1;
var Month= n + 1;
	var path_retrive='/'+Year+'/'+Month; 
var messagesRef0 = firebase.database().ref(path_retrive);
	// click+=1
	// if (click > 2) {
	// document.getElementById("demo").innerHTML="";

	// }
	// window.resizeTo(1000, 1000);
messagesRef0.on('value',gotData0,errData0);

//data aane k baad yaha pe ajayega
// Naya code


var ctx = document.getElementById("line-chart").getContext("2d");
dataPlot = new Chart(ctx, {
	type:'line',
	data:{
		labels: datay,
	
	datasets: [{
		data: datax,
		label: "Moisture(%)",
		borderColor: "#4BC0C0",
		fill: true
	}]
}
});

dataPlot.update();
dataPlot.update();	

}
function gotData0(data0){
var msg0 =data0.val();
console.log(msg0)
var keys0=Object.keys(msg0);
for (var i = 0; i < keys0.length; i++) {
  var k =keys0[i];
  var now = msg0[k].DateAndTime;
    var humidity = msg0[k].humidity;
    var temp = msg0[k].temp;
    var moist = msg0[k].moisture;
datax.push(moist);
datay.push(now);
   if (true) {dataPlot.data.labels.pop();
    dataPlot.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    dataPlot.update();}
    datax.push(moist);
datay.push(now); 
} 
}
function errData0(data0){
console.log('Error');
console.log(err); 
}