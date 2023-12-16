const cycles = loadLocal();

function loadLocal() {
  let maybeRaw = localStorage.getItem('cycles');
  if (!maybeRaw) return [];
  return JSON.parse(maybeRaw);
}

function saveLocal() {
  localStorage.setItem('cycles', JSON.stringify(cycles));
}

const MONTH_PREFIXES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function displayYearTable(cycle) {
  const curMonth = 12;
  const startMonth = 8;

  const spacer = document.createElement('span');
  spacer.className = 'col-span-3';

  function createMonthName(m) {
    const elem = document.createElement('span');
    elem.className = 'pl-1 h-5 leading-6 text-sm font-medium text-gray-500 text-center';
    elem.innerText = MONTH_PREFIXES[m];
  }

  for (let m = startMonth; m < curMonth; ++m) {
    if (m % 2 === 1) {
      const monthNames = document.createElement('div');
      monthNames.className = 'grid grid-cols-8';

      monthNames.appendChild(createMonthName(m));
      monthNames.appendChild(createMonthName(m + 1));


    }

  }

  /*
  <div class="grid grid-cols-8">
          <span class="pl-1 h-5 leading-6 text-sm font-medium text-gray-500 text-center">Jul</span>
          <span class="col-span-3"></span>
          <span class="pl-1 h-5 leading-6 text-sm font-medium text-gray-500 text-center">Ago</span>
          <span class="col-span-3"></span>
        </div>
        <div class="grid grid-cols-8 mb-1">
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>
          <span class="hover:bg-gray-100 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500">26</span>*/
}

function createNewCycle() {
  const current = getCurrentCycle();
  if (!current) {
    cycles.push({
      start: Date.now(),
      current: true,
      entries: [] // ordered by date
    });
    saveLocal();
  }
  redirectToInput();
}

function redirectToInput() {
  window.location.replace('input.html');
}

function getCurrentCycle() {
  if (!cycles.length) return null; // no cycle.
  const maybeCurrent = cycles[cycles.length - 1];
  if (!maybeCurrent.current) return null; // not current.
  return maybeCurrent;
}

// level is a real number; kind is "pad" or "tampon".
function saveNewValue(level, kind) {
  const current = getCurrentCycle();
  if (!current) throw new Error('No current cycle');
  current.entries.push({
    date: Date.now(),
    level,
    kind
  });
  saveLocal();
}
