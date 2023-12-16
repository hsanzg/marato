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

  // Additional logic for animation
  if (sliderId === 'slider2') {
    const ellipse = document.getElementById('ellipse');
    const scale = 1 + (value - 1) / 10; // Adjust the scaling factor based on your needs
    ellipse.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
}

let isDragging = false;
    let initialScale = 1;
    let minScale = 0.5;

    let initialMouseX;
    let initialMouseY;

    function startDrag(event) {
      const ellipse = document.getElementById('ellipse');

      const rect = ellipse.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        isDragging = true;
        document.getElementById('ellipse').style.cursor = 'grabbing';

        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
      }
    }

    function stopDrag() {
      if (isDragging) {
        isDragging = false;
        document.getElementById('ellipse').style.cursor = 'grab';
      }
    }

    function drag(event) {
      if (isDragging) {
        const compress = document.getElementById('compress');
        const ellipse = document.getElementById('ellipse');
        const rect = ellipse.getBoundingClientRect();

        // Calculate distance from initial click point
        const deltaX = event.clientX - initialMouseX;
        const deltaY = event.clientY - initialMouseY;

        // Calculate the scaling factor based on the horizontal distance with a minimum scale
        const distance = Math.sqrt(deltaX**2 + deltaY**2);
        const scale = Math.max(distance/20, minScale);

        ellipse.style.transform = `translate(-50%, -50%) scale(${scale * initialScale})`;
      }
    }

    document.getElementById('ellipse').addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', drag);
