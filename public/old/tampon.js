let isDragging = false;
  let initialHeight = 10;
  let minHeight = 50; // Adjust the minimum height as needed

  let initialMouseY;

  function startDrag(event) {
    const animatedSquare = document.getElementById('animated-square');

    isDragging = true;
    document.getElementById('animated-square').style.cursor = 'grabbing';

    initialMouseY = event.clientY;
    initialHeight = animatedSquare.clientHeight;
  }

  function stopDrag() {
    if (isDragging) {
      isDragging = false;
      document.getElementById('animated-square').style.cursor = 'grab';
    }
  }

  function drag(event) {
    if (isDragging) {
      const animatedSquare = document.getElementById('animated-square');
      const deltaY = event.clientY - initialMouseY;
      let newHeight = initialHeight + deltaY;

      // Restrict the height within the specified range
      newHeight = Math.max(newHeight, minHeight);

      animatedSquare.style.height = `${newHeight}px`;
    }
  }

  document.getElementById('animated-square').addEventListener('mousedown', startDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('mousemove', drag);