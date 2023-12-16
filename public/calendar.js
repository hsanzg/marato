const MONTH_PREFIXES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function avgLevelInWeek(cycles, year, month, week) {
  const monthStart = new Date(year, month - 1, 1);
  const weekStart = new Date(monthStart);
  weekStart.setDate(monthStart.getDate() + 7 * (week - 1));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  //console.log({monthStart, weekStart, weekEnd});
  let total = 0;
  for (const cycle of cycles) {
    let date = new Date(cycle.start);
    if (weekStart <= date && date < weekEnd) {
      total += calcPbac(cycle);
    }
  }
  if (total === 0) return 0;
  const avgPbac = 192;
  const subBefore = 7;
  const levelStep = avgPbac / subBefore;
  if (total <= levelStep) return 50;
  if (total <= 2 * levelStep) return 100;
  if (total <= 3 * levelStep) return 200;
  if (total <= 4* levelStep) return 300;
  if (total <= 5 * levelStep) return 400;
  if (total <= 6* levelStep) return 500;
  if (total <= 7* levelStep) return 600;
  if (total <= 8* levelStep) return 700;
  if (total <= 9* levelStep) return 800;
  if (total <= 10* levelStep) return 900;
  return 950;
}

function displayYearTable(cycles) {
  const curMonth = 12;
  const startMonth = 9;
  const year = 2023;

  function createSpacer() {
    const spacer = document.createElement('span');
    spacer.className = 'col-span-3';
    return spacer;
  }

  function createMonthName(m) {
    const elem = document.createElement('span');
    elem.className = 'pl-1 h-5 leading-6 text-sm font-medium text-gray-500 text-center';
    elem.innerText = MONTH_PREFIXES[m - 1];
    return elem;
  }

  const calendar = document.getElementById('calendar');
  let grid;
  for (let m = startMonth; m <= curMonth; ++m) {
    if (m % 2 === 1) {
      const monthNames = document.createElement('div');
      monthNames.className = 'grid grid-cols-8';

      monthNames.appendChild(createMonthName(m));
      monthNames.appendChild(createSpacer());
      monthNames.appendChild(createMonthName(m + 1));
      calendar.appendChild(monthNames);
      grid = document.createElement('div');
      grid.className = 'grid grid-cols-8 mb-1';
      calendar.appendChild(grid);
    }

    for (let i = 1; i <= 4; ++i) {
      let week = document.createElement('span');
      week.className = 'block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 font-semibold text-sm text-gray-500';
      const level = avgLevelInWeek(cycles, year, m, i);
      if (level > 0) {
        week.classList.add('bg-red-' + level);
        if (level >= 700) {
          week.classList.add('text-red-50');
        }
      }
      week.innerText = i;
      grid.appendChild(week);
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

displayYearTable(cycles);
