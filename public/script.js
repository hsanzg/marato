let total_sum = 0;
let newSliderValue = 1;

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
  saveNewValue(value,"pad");
}

function updateSliderValue(sliderId, displayId) {
  const slider = document.getElementById(sliderId);
  const displayElement = document.getElementById(displayId);
  const value = parseFloat(slider.value);
  displayElement.textContent = `Value: ${value.toFixed(1)}`;

  // Additional logic for animation
  if (sliderId === 'slider2') {
    const ellipse = document.getElementById('ellipse');
    const scale = value / 20; // Adjust the scaling factor based on the slider value
    ellipse.style.transform = `translate(-50%, -50%) scale(${scale*9.9})`;
  }
  if (sliderId === 'slider1') {
    const animatedSquare = document.getElementById('animated-square');
    const newHeight = minHeight + value * (90 - minHeight);
    animatedSquare.style.height = `${newHeight}px`;
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
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const scale = Math.max(distance / 20, minScale);

    ellipse.style.transform = `translate(-50%, -50%) scale(${scale * 0.98})`;


    // Update the slider value based on the coverage percentage
    const slider = document.getElementById('slider2');
    const newSliderValue = (scale*20)/10; // Scale to range from 1.0 to 20.0
    if (newSliderValue > 20) newSliderValue = 20;
    slider.value = newSliderValue.toFixed(1);

    // Update the displayed value
    const displayElement = document.getElementById('slider2-value');
    displayElement.textContent = `Value: ${newSliderValue.toFixed(1)}`;
  }
}



// EMPIEZA TAMPON
let isDraggingT = false;
let initialHeight = 10;
let minHeight = 50; // Adjust the minimum height as needed
let maxHeight = 450;



function startDragT(event) {
const animatedSquare = document.getElementById('animated-square');

isDraggingT = true;
document.getElementById('animated-square').style.cursor = 'grabbing';

initialMouseY = event.clientY;
initialHeight = animatedSquare.clientHeight;
}

function stopDragT() {
if (isDraggingT) {
    isDraggingT = false;
    document.getElementById('animated-square').style.cursor = 'grab';
}
}

function dragT(event) {
  if (isDraggingT) {
    const animatedSquare = document.getElementById('animated-square');
    const deltaY = event.clientY - initialMouseY;
    let newHeight = initialHeight + deltaY;

    // Restrict the height within the specified range
    newHeight = Math.min(Math.max(newHeight, minHeight+25), maxHeight);

    animatedSquare.style.height = `${newHeight}px`;

    // Update the slider value based on the animated square's height
    const slider1 = document.getElementById('slider1');
    const newSliderValue = (newHeight - minHeight) / (90 - minHeight);
    if (newSliderValue < 1.0) newSliderValue = 1.0;
    slider1.value = newSliderValue.toFixed(1);

    // Update the displayed value
    const displayElement = document.getElementById('slider1-value');
    displayElement.textContent = `Value: ${newSliderValue.toFixed(1)}`;
  }
}

document.getElementById('animated-square').addEventListener('mousedown', startDrag);


document.getElementById('ellipse').addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', drag);
