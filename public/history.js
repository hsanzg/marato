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
  const entries = document.createElement('div');
  entries.className = 'flex min-w-0 gap-x-4 min-w-0 flex-auto';
  cycleElem.appendChild(entries);
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
  pbacValue.innerText = Math.round(calcPbac(cycle));
  pbac.appendChild(pbacName);
  pbac.appendChild(pbacValue);
  cycleElem.appendChild(pbac);
  history.appendChild(cycleElem);
}

function createHistory(cycles) {
  for (let cycle of cycles) {
    createCycleEntry(cycle);
  }
}

createHistory(cycles);
