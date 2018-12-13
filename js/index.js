window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');
  const screenForm = document.querySelector('#screen-form');
  let wasPrevEquals = false;

  buttons.onclick = handleButtonsClick;
  screenForm.onsubmit = handleScreenFormSubmit;
  displayScreen.oninput = handleScreenOnInput;

  function handleScreenOnInput(e) {
    const lastInput = e.target.value.slice(-1);
    if (isNaN(lastInput) && !operators.includes(lastInput) && !['.', ' '].includes(lastInput)) {
      clearScreen();
    }
  }

  function handleScreenFormSubmit(e) {
    e.preventDefault();
    const input = e.target.screen.value;
    try {
      calculateScreen();
    } catch (e) {
      showError();
    }
  }

  function handleButtonsClick(e) {
    const input = e.target.innerHTML;
    if (input === 'C') clearScreen();
    else if (input.length !== 1 || displayScreen.value === 'ERROR') return;
    else if (input === '=') calculateScreen();
    else if (operators.includes(input)) addOperator(input);
    else if (wasPrevEquals) overwriteScreen(input);
    else addToScreen(input);
  }

  function clearScreen() {
    displayScreen.value = '';
    wasPrevEquals = false;
  };

  function calculateScreen() {
    const calculation = displayScreen.value;
    displayScreen.value = calculateString(calculation);
    wasPrevEquals = true;
  }

  function addOperator(input) {
    const prevInput = displayScreen.value.slice(-1);
    if (isNaN(prevInput)) showError();
    else addToScreen(input);
    wasPrevEquals = false;
  }

  function overwriteScreen(input) {
    displayScreen.value = input;
    wasPrevEquals = false;
  }

  function addToScreen(input) {
    displayScreen.value += input;
    wasPrevEquals = false;
  }

  function showError() {
    displayScreen.value = 'ERROR';
  }
}
