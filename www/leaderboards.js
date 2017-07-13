window.onload = function() {
  paypigs_data = JSON.parse(paypigs_data);
  sorted_data  = Object.keys(paypigs_data).sort(function(a, b){ return paypigs_data[a] - paypigs_data[b]}).reverse();
  
  var max_value = paypigs_data[sorted_data[0]];
  var cont = document.getElementById('leader_cont');
  
  document.getElementById('cheerleader').innerHTML = sorted_data[0];
  
  var i = 0;
  sorted_data.forEach(function(e) {
    cont.innerHTML += "<div class='leader_cont_inner'><div class='leader_name " + (i % 2 ? "dark" : "light") + "'>" + e + " (#" + (i + 1) + ")</div><div class='leader_value " + (i % 2 ? "light" : "dark") + "'><div class='percent_bar' style='width: " + paypigs_data[e] / max_value * 100 + "%'>$" + paypigs_data[e] + "</div></div></div><br/>";
    i++;
  });
}
