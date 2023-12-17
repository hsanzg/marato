const activeTabIndicator = document.createElement('span');
activeTabIndicator.className = 'h-0.5 absolute inset-x-0 bottom-0 bg-green-300';

const padTabButton = document.getElementById('tab-pad');
const tamponTabButton = document.getElementById('tab-tampon');
const pad = document.getElementById('pad');
const padBlood = document.getElementById('pad-blood');
const tampon = document.getElementById('tampon');
const smallClots = document.getElementById('small-clots');
const largeClots = document.getElementById('large-clots');
let padLevel = 2;

// Tabs.
let activeTab = null;

function toggleTabButton(name, oldButton, nextButton, old, next) {
  if (activeTab === name) return;
  oldButton.classList.remove('text-black');
  old.classList.add('hidden');
  if (oldButton.lastElementChild) {
    oldButton.removeChild(oldButton.lastElementChild);
  }
  nextButton.classList.add('text-black');
  nextButton.appendChild(activeTabIndicator);
  next.classList.remove('hidden');
  activeTab = name;
}

function selectPad() {
  toggleTabButton('pad', tamponTabButton, padTabButton, tampon, pad);
  setInitialPadBloodLevel();
}

function selectTampon() {
  toggleTabButton('tampon', padTabButton, tamponTabButton, pad, tampon);
}

selectPad();
if (getCurrentCycle() === null) {
  const finishBtn = document.getElementById('finish-cycle');
  finishBtn.classList.add('hidden');
}

function parseClots(input, kindLabel) {
  if (input.validity.valueMissing) {
    alert(`Recuerda rellenar el número de coágulos ${kindLabel}`);
    return null;
  }
  if (input.validity.badInput) {
    alert(`Por favor, introduce un número válido de coágulos ${kindLabel}`);
    return null;
  }
  const value = parseInt(input.value, 10);
  if (isNaN(value)) throw new Error('passed validation but failed parse');
  return value;
}

function addEntry() {
  if (!activeTab) throw new Error('no active tab');
  const level = activeTab === 'pad' ? padLevel : tamponSlider.value;
  const smallClotsCount = parseClots(smallClots, 'pequeños');
  const largeClotsCount = parseClots(largeClots, 'grandes');
  saveNewValue(level, activeTab, smallClotsCount, largeClotsCount);
  redirectToSuccess();
}

function finishCurrentCycleAndRedirect() {
  finishCurrentCycle();
  redirectToHistory();
}

function extractEventPageCoords(event) {
  if (event instanceof MouseEvent) {
    return [event.pageX, event.pageY];
  }
  // Otherwise assume this is a TouchEvent; Safari uses another class
  // so we cannot check explicitly with `instanceof`.
  if (typeof(event.touches) === 'undefined') return null;
  if (!event.touches.length) return null;
  const {pageX, pageY} = event.touches[0];
  return [pageX, pageY];
}

function updatePadBlood(event) {
  const pageCoords = extractEventPageCoords(event);
  if (pageCoords === null) return; // unsupported API?
  const [pageX, pageY] = pageCoords;

  // Calculate distance and level for PBAC.
  const rect = pad.getBoundingClientRect();
  if (!rect) throw new Error('cannot get bounding rect');
  // Find distance from center of pad.
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const deltaX = centerX - pageX;
  const deltaY = centerY - pageY;
  const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Distance from center to a vertex of bounding rect.
  const maxDist = Math.sqrt(rect.width * rect.width / 4 + rect.height * rect.height / 4);

  // Map `0 <= dist <= maxDist` to `minLevel <= level <= maxLevel`.
  const minLevel = 1;
  const maxLevel = 20;
  const clampedRatio = Math.max(Math.min(dist / maxDist, 1), minLevel / maxLevel);
  padLevel = clampedRatio * (maxLevel - minLevel) + minLevel;

  // Update ellipse radius.
  const widthFactor = 0.625;
  const minHeight = (minLevel / maxLevel) * rect.height / 2;
  //const height = Math.sqrt(dist * dist - deltaX * deltaX) * 2;
  const height = Math.min(300, Math.max(20, Math.PI * dist))
  padBlood.style.height = `${height}px`;
  padBlood.style.width = `${height * widthFactor}px`;
}

function setInitialPadBloodLevel() {
  padBlood.style.width = '57px';
  padBlood.style.height = '79.8px';
}

let listenersRegistered = false;
function registerListeners() {
  if (listenersRegistered) return;
  pad.addEventListener('touchstart', updatePadBlood);
  pad.addEventListener('touchend', updatePadBlood);
  pad.addEventListener('touchmove', updatePadBlood);
  pad.addEventListener('mouseup', updatePadBlood);
  listenersRegistered = true;
}

registerListeners();
