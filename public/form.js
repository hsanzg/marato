const weights = [3, 1, 1, 3, 1, 1];

function saveForm() {
  const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
  const totalQuestions = document.querySelectorAll('input[type="radio"]').length/2;

  if (radioGroups.length < totalQuestions) {
    alert("Por favor, responde a todas las preguntas.");
    return;
  }

  let weightedSum = 0;

  radioGroups.forEach((radio, index) => {
    if (radio.id.includes('si')) {
      weightedSum += weights[index];
    }
  });
  saveSamantha(weightedSum);
  finishCurrentCycle();
  redirectToHistory();
}
