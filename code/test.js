alert("hello");

var data = ""
$.getJSON( "code/levels.json", function( json ) {
  data = json["2"][chance.natural({ min: 0, max: 4 })]
});
console.log(data)