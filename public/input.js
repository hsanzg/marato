const activeTabIndicator = document.createElement('span');
activeTabIndicator.className = 'h-0.5 absolute inset-x-0 bottom-0 bg-green-300';

const padTabButton = document.getElementById('tab-pad');
const tamponTabButton = document.getElementById('tab-tampon');
let activeTab = null;

function toggleTabButton(name, old, next) {
  if (activeTab === name) return;
  old.classList.remove('text-black');
  if (old.lastElementChild) {
    old.removeChild(old.lastElementChild);
  }
  next.classList.add('text-black');
  next.appendChild(activeTabIndicator);
  activeTab = name;
}

function selectPad() {
  toggleTabButton('pad', tamponTabButton, padTabButton);
}

function selectTampon() {
  toggleTabButton('tampon', padTabButton, tamponTabButton);
}

selectPad();
