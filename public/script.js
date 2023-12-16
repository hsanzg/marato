let total_sum = 0;

function openTab(tabName) {
  const tabs = document.getElementsByClassName("tabcontent");
  for (const tab of tabs) {
    tab.style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
}

function registerValue(sliderId) {
  const slider = document.getElementById(sliderId);
  const value = parseFloat(slider.value);
  total_sum += value;

  // Update total sum display
  const totalSumElement = document.getElementById("total-sum");
  totalSumElement.textContent = total_sum.toFixed(1);

  alert(`Value ${value.toFixed(1)} registered. Total Sum: ${total_sum.toFixed(1)}`);
}

function updateSliderValue(sliderId, displayId) {
  const slider = document.getElementById(sliderId);
  const displayElement = document.getElementById(displayId);
  const value = parseFloat(slider.value);
  displayElement.textContent = `Value: ${value.toFixed(1)}`;
}
