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

