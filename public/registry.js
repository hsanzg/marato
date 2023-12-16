const cycles = loadLocal();

function loadLocal() {
  let maybeRaw = localStorage.getItem('cycles');
  if (!maybeRaw) return [];
  return JSON.parse(maybeRaw);
}

function saveLocal() {
  localStorage.setItem('cycles', JSON.stringify(cycles));
}

function createNewCycle() {
  const current = getCurrentCycle();
  if (!current) {
    cycles.push({
      start: Date.now(),
      current: true,
      entries: [] // {date, level, kind}; ordered by date.
    });
    saveLocal();
  }
  return cycles[0];
}

function calcPbac(cycle) {
  let total = 0;
  for (const entry in cycle.entries) {
    total += entry.level;
  }
  return total;
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

function getCurrentCycleOrCreate() {
  const current = getCurrentCycle();
  if (!current) return createNewCycle();
  return current;
}

// level is a real number; kind is "pad" or "tampon".
function saveNewValue(level, kind) {
  let current = getCurrentCycleOrCreate();
  current.entries.push({
    date: Date.now(),
    level,
    kind
  });
  saveLocal();
}

function finishCurrentCycle() {
  const current = getCurrentCycle()
  if (!current) throw new Error('no current cycle');
  current.current = false;
  saveLocal();
}
