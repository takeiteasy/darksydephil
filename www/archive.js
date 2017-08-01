window.onload = function() {
  var dt = new Date();
  var year = dt.getYear() + 1900;
  var month = dt.getMonth();
  var cont = document.getElementById('leader_cont');
  
  for (var i = 2017; i <= year; i++) {
    for (var j = 1; j <= (i == year ? month : 12); j++) {
      var k = "archives/" + i + "_" + (j < 10 ? "0" + j : j);
      cont.innerHTML += "<img src='" + k + "_t.png' /> <img src='" + k + "_p.png' /> ";
    }
  }
}
