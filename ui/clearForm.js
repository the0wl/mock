function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("name").readOnly = false;
  document.getElementById("type").selectedIndex = 0;
  document.getElementById("code").selectedIndex = 0;
  document.getElementById("route").value = "";
  document.getElementById("response").value = "";
}
