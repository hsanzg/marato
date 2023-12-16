const history = document.getElementById('history');

function createCycleEntry(cycle) {
  const cycleElem = document.createElement('li');
  cycleElem.className = 'flex justify-between gap-x-6 py-5';
  const entries = document.createElement('div');
  entries.className = 'flex min-w-0 gap-x-4 min-w-0 flex-auto';
  cycleElem.appendChild(entries);
  for (const entry of cycle.entries) {
    const {level, kind} = entry;
    const elem = document.createElement('div');
    elem.innerText = level + ' ' + kind;
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
