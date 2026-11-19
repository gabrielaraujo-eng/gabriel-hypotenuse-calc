const form = document.querySelector('#calculator-form');
const catAInput = document.querySelector('#cat-a');
const catBInput = document.querySelector('#cat-b');
const manualKToggle = document.querySelector('#manual-k');
const manualField = document.querySelector('#manual-field');
const kValueInput = document.querySelector('#k-value');
const errorMessage = document.querySelector('#form-error');
const resultIntro = document.querySelector('#result-intro');
const resultDisplay = document.querySelector('#result-display');
const resultNumber = document.querySelector('#result-number');
const resultK = document.querySelector('#result-k');
const resultStatus = document.querySelector('#result-status');

const numberFormat = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
});
const coefficientFormat = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 4,
});

function readPositiveNumber(input, label) {
  const value = input.valueAsNumber;
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Informe um valor maior que zero para ${label}.`);
  }
  return value;
}

function calculateHypotenuse(event) {
  event.preventDefault();
  errorMessage.hidden = true;
  errorMessage.textContent = '';

  try {
    const a = readPositiveNumber(catAInput, 'o cateto A');
    const b = readPositiveNumber(catBInput, 'o cateto B');
    const ratio = a / b;
    const k = manualKToggle.checked
      ? readPositiveNumber(kValueInput, 'o coeficiente K')
      : Math.sqrt(ratio ** 2 + 1) - ratio;
    const hypotenuse = k * b + a;

    if (!Number.isFinite(hypotenuse)) {
      throw new Error('Os valores informados são grandes demais para este cálculo.');
    }

    resultNumber.textContent = numberFormat.format(hypotenuse);
    resultK.textContent = coefficientFormat.format(k);
    resultDisplay.hidden = false;
    resultIntro.textContent = manualKToggle.checked
      ? 'Resultado calculado com o coeficiente K informado.'
      : 'Resultado calculado automaticamente a partir dos catetos.';
    resultStatus.textContent = 'CÁLCULO CONCLUÍDO';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
    const invalidInput = [catAInput, catBInput, ...(manualKToggle.checked ? [kValueInput] : [])]
      .find((input) => !Number.isFinite(input.valueAsNumber) || input.valueAsNumber <= 0);
    invalidInput?.focus();
  }
}

function toggleManualCoefficient() {
  manualField.hidden = !manualKToggle.checked;
  kValueInput.required = manualKToggle.checked;
  if (!manualKToggle.checked) kValueInput.value = '';
}

function resetResult() {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
  manualField.hidden = true;
  kValueInput.required = false;
  resultDisplay.hidden = true;
  resultNumber.textContent = '0';
  resultK.textContent = '—';
  resultIntro.textContent = 'Preencha os dois catetos para visualizar o cálculo.';
  resultStatus.textContent = 'AGUARDANDO MEDIDAS';
}

form.addEventListener('submit', calculateHypotenuse);
form.addEventListener('reset', () => window.setTimeout(resetResult, 0));
manualKToggle.addEventListener('change', toggleManualCoefficient);
