function area() {
    var a, b, c, p, res;
    a = parseFloat(document.getElementById("sideA").value);
    b = parseFloat(document.getElementById("sideB").value);
    c = parseFloat(document.getElementById("sideC").value);
    p = (a+b+c)/2;
    if ((p*(p-a)*(p-b)*(p-c)) <= 0) {
      document.getElementById("result").value = "Incorrect values";
      alert("The sum of two side lengths has to exceed the length of the third side.");
    } else {
      res = Math.sqrt(p*(p-a)*(p-b)*(p-c));
      document.getElementById("result").value = res;
  }
}

function nextDateFun() {
  var date = new Date(document.getElementById("date").value);
  var d, m, y, nd, nm, ny;
  d = parseInt(date.getDate(), 10);
  m = parseInt(date.getMonth(), 10);
  y = parseInt(date.getFullYear(), 10);
	m += 1;
  ny = y;
  nm = m;
  nd = d + 1;
  if (m == 4 || m == 6 || m == 9 || m == 11) {
    if (nd > 30) {
      nd = 1;
      nm = m + 1;
    } else {
  		nd = d + 1;
  	}
  }
  else if (m == 12) {
      if (nd > 31) {
        nd = 1;
        nm = 1;
        ny = y + 1;
    } else { 
    	nd = d + 1;
  	}
  }
  else if (m == 2) {
		if (y % 4 == 0 && y % 100 == 0 && y % 400 == 0 && nd > 29) { 
			nm = 3; nd = 1; 
		}
    else if (nd > 28) {
			nm = 3; nd = 1; 
		}
    else {
			nd = d + 1;
		}
  }
  else {
    if (nd > 31) {
			nm = m + 1; nd = 1;
		}
    else {
			nd = d + 1; 
		}
  }
  var newDate = new Date();
  newDate.setFullYear(ny);
  newDate.setMonth(nm - 1);
  newDate.setDate(nd);
  document.getElementById("nextDate").value = newDate.toISOString().substr(0, 10);
}

function findDivisors() {
	var num = parseInt(document.getElementById("num").value);
	var res=document.createElement("table");
	document.body.appendChild(res);
	res.border = 1;
	res.width = 100;
	res.height = 70;
	var row=res.insertRow(0);
	var cnt = 0;
	parseInt(cnt);
	for (var i = num; i > 0; i--) {
		if (num % i == 0) {
			var cell = row.insertCell(cnt);
			cell.innerHTML = i;
		  cnt += 1;
		}
	}

}
function checkLeapYear() {
	var y = parseInt(document.getElementById("year").value);
	if (y % 4 == 0) {
		if (y % 100 == 0) {
			if (y % 400 == 0) {
				document.getElementById("leapRes").innerHTML = "This year is leap.";
			} else {
				document.getElementById("leapRes").innerHTML = "This year is not leap.";
			}
		} else {
			document.getElementById("leapRes").innerHTML = "This year is leap.";
		}
	} else {
			document.getElementById("leapRes").innerHTML = "This year is not leap.";
	}

}

function numSys() {
var num = parseInt(document.getElementById("numSysInp").value);
document.getElementById("resultS").value = num.toString(13);

}
	
function generateSys() {
	if (document.getElementById("opX").options.length != 35) {
		for (var i = 3; i<=36; i++){
		    var opt = document.createElement('option');
		    opt.value = i;
		    opt.innerHTML = i;
		    document.getElementById("opX").appendChild(opt);
		}
	}
}

function numXSys() {
		var sys = parseInt(document.getElementById("opX").value)
		var num = parseInt(document.getElementById("numXSysInp").value);
		document.getElementById("resultXS").value = num.toString(sys);
}
