function beautify() {
  const input = document.getElementById("response").value;
  try {
    const parsed = JSON.parse(input);
    const beautified = JSON.stringify(parsed, null, 4);
    document.getElementById("response").value = beautified;
  } catch (e) {
    alert("Invalid JSON");
  }
}
