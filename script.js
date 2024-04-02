document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', calculateRetirement);
  });
  calculateRetirement(); // Вызываем функцию при загрузке страницы для исходного расчёта
});

function calculateRetirement() {
  let monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
  let currentSavings = parseFloat(document.getElementById('currentSavings').value);
  let inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

  let annualInterestRate = 0.10; // Годовой процент дохода
  let initialTargetRetirementFund = 2000000; // Начальная необходимая сумма
  let targetRetirementFund = initialTargetRetirementFund; // Динамическая сумма с учётом инфляции
  let years = 0;

  while (currentSavings < targetRetirementFund && years < 100) { // Добавляем защиту от бесконечного цикла
    currentSavings += (currentSavings * annualInterestRate) + (monthlySavings * 12);
    targetRetirementFund += targetRetirementFund * inflationRate;
    years++;
  }

  const resultElement = document.getElementById('result');
  if (years < 100) {
    resultElement.innerHTML = `Тебе потребуется примерно <strong>${years} лет</strong>, чтобы выйти на пенсию с необходимой суммой в <strong>${targetRetirementFund.toFixed(2)}$</strong>.`;
  } else {
    resultElement.innerHTML = `При данных условиях накопить необходимую сумму не удастся.`;
  }
}
