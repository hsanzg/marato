const cycles = loadLocal();

function loadLocal() {
  let maybeRaw = localStorage.getItem('cycles');
  if (!maybeRaw) return [];
  return JSON.parse(maybeRaw);
}

function saveLocal() {
  localStorage.setItem('cycles', JSON.stringify(cycles));
}

function displayTable(cycle) {

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
