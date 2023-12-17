const history = document.getElementById('history');

function createCircle(entry) {
  /*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
        <circle cx="12" cy="12" r="12" />
      </svg>*/
  const svg = document.createElement('svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.className = `w-4 h-4 text-red-400`;
  const circle = document.createElement('circle');
  circle.setAttribute('cx', 12);
  circle.setAttribute('cy', 12);
  circle.setAttribute('r', 12);
  svg.appendChild(circle);
  return svg;
}

function createCycleEntry(cycle) {
  const cycleElem = document.createElement('li');
  cycleElem.className = 'flex justify-between gap-x-6 py-5';
  
  // Draw red dots based on levels
  const levels = cycle.entries.map(entry => entry.level);
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'flex gap-x-1 items-center';
  for (const level of levels) {
    const dot = document.createElement('div');
    dot.className = 'w-3 h-3 rounded-full';
    // Set color based on level (you can adjust the color scale as needed)
    const color = `rgb(${255 - level * 20}, 0, 0)`;
    dot.style.backgroundColor = color;
    dotsContainer.appendChild(dot);
  }
  cycleElem.appendChild(dotsContainer);

  // Display entries on the right side
  const entries = document.createElement('div');
  entries.className = 'flex min-w-0 gap-x-4 min-w-0 flex-auto';
  for (const entry of cycle.entries) {
    const {level, kind} = entry;
    //const elem = document.createElement('div');
    const elem = createCircle(entry);
    elem.classList.add('rounded-full');
    elem.classList.add('bg-red-400');
    //elem.innerText = level + ' ' + kind;
    entries.appendChild(elem);
  }

  const pbac = document.createElement('div');
  pbac.className = 'shrink-0 items-end text-sm text-center';
  const pbacName = document.createElement('dt');
  pbacName.className = 'color-gray-800 font-medium font-sm';
  pbacName.innerText = 'PBAC';
  const pbacValue = document.createElement('dd');
  pbacValue.className = 'tracking-tight font-bold text-xl text-black';
  console.log(cycle);
  console.log(calcPbac(cycle));
  pbacValue.innerText = Math.round(calcPbac(cycle));
  pbac.appendChild(pbacName);
  pbac.appendChild(pbacValue);
  cycleElem.appendChild(entries);
  cycleElem.appendChild(pbac);
  history.appendChild(cycleElem);
}


function createHistory(cycles) {
  for (let cycle of cycles) {
    createCycleEntry(cycle);
  }
}

createHistory(cycles);
