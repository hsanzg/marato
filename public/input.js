const activeTabIndicator = document.createElement('span');
activeTabIndicator.className = 'h-0.5 absolute inset-x-0 bottom-0 bg-green-300';

const padTabButton = document.getElementById('tab-pad');
const tamponTabButton = document.getElementById('tab-tampon');
const pad = document.getElementById('pad');
const tampon = document.getElementById('tampon');
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
}

function selectTampon() {
  toggleTabButton('tampon', padTabButton, tamponTabButton, pad, tampon);
}

selectPad();
if (getCurrentCycle() === null) {
  const finishBtn = document.getElementById('finish-cycle');
  finishBtn.classList.add('hidden');
}

const padSlider = document.getElementById('slider2');
const tamponSlider = document.getElementById('slider1');

function addEntry() {
  if (!activeTab) throw new Error('no active tab');
  let slider = activeTab === 'pad' ? padSlider : tamponSlider;
  saveNewValue(slider.value, activeTab);
  redirectToSuccess();
}

function finishCurrentCycleAndRedirect() {
  finishCurrentCycle();
  redirectToHistory();
}
