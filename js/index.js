window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');
  let wasPrevEquals = false;

  buttons.onclick = handleButtonsClick;

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
