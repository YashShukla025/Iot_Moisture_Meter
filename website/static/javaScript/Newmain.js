  var config = {
  apiKey: "AIzaSyAcZnLXatmTotGNkRkEjY1HeuUv0XkP0CA",
  authDomain: "mays-a01c6.firebaseapp.com",
  databaseURL: "https://mays-a01c6.firebaseio.com",
  projectId: "mays-a01c6",
  storageBucket: "mays-a01c6.appspot.com",
  messagingSenderId: "374113765309"
  };
  firebase.initializeApp(config);
// Reference messages collection

var chai=10;
function dd(){
  chai= chai + 10;
  console.log(chai);
  ui();

}
function dd2(){
  chai= chai - 10;
  console.log(chai);
  if(chai < 10){chai = 10}
  ui();
}


function ui(){
    var d = new Date();
  var n = d.getMonth();
  var z = d.getFullYear();
var Year= z - 1;
var Month= n + 1;
var path_retrive='/'+Year+'/'+Month; 
var messagesRef = firebase.database().ref(path_retrive).limitToLast(chai);  
messagesRef.on('value',gotData,errData);
}
function gotData(data){
console.log(data.val());
var msg =data.val();
console.log(msg);
if (!msg)
{
  var tab1="<h1>No Data Found</h1>"
}
else
{
var keys=Object.keys(msg);
if(chai > keys.length){chai = keys.length;}

var tab1='<table><thead><tr class="table100-head"><th class="column1">Humidity</th><th class="column2">Temperature</th><th class="column3">Moisture</th><th class="column4">Location</th><th class="column5">Season</th><th class="column6">Date and Time</th></tr></thead><tbody>';
for (var i = 0; i < 10; i++) {
	var k =keys[i];
	  var now = msg[k].DateAndTime;
  	var humidity = msg[k].humidity;
  	var temp = msg[k].temp;
  	var s1 = msg[k].moisture;
    var s2 = msg[k].location;
    var s3 = msg[k].season;

  	
  	tab1+='<tr><td class="column1">'+humidity+"</td>"+'<td class="column2">'+temp+"</td>"+'<td class="column3">'+s1+"</td>"+'<td class="column4">'+s2+"</td>"+'<td class="column5">'+s3+"</td>"+'<td class="column6">'+now+"</td>"+"</tr>";   //+"<td>"+now+"</td>"
}
}
tab1+='</tbody></table>';
  	document.getElementById("demo").innerHTML=tab1;
}
function errData(data){
console.log('Error');
console.log(err);	
}
