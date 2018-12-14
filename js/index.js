window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');
  const screenForm = document.querySelector('#screen-form');
  let wasPrevEquals = false;

  const isOperator = s => operators.includes(s);

  buttons.onclick = handleButtonsClick;
  screenForm.onsubmit = handleScreenFormSubmit;
  displayScreen.oninput = handleScreenInput;

  function handleScreenFormSubmit(e) {
    e.preventDefault();
    const input = e.target.screen.value;
    if (input === 'ERROR') clearScreen();
    else {
      try {
        calculateScreen();
        if (isNaN(displayScreen.value)) throw Error;
      } catch (e) {
        showError();
      }
    }
  }

  function handleScreenInput(e) {
    const input = e.target.value.slice(-1);
    const prevInput = e.target.value.slice(-2, -1);
    const isInputInvalid = isNaN(input) && !isOperator(input) && !['.', ' '].includes(input);
    if (input === '=') calculateScreen();
    else if (!prevInput && isOperator(input) && input !== '-') showError();
    else if (isInputInvalid) {
      if (displayScreen.value.includes('E')) clearScreen()
      else showError();
    } else if (prevInput && isOperator(input) && wasGivenTwoOperators(input, prevInput)) {
      showError();
    }
  }

  function handleButtonsClick(e) {
    const input = e.target.innerHTML;
    if (input === 'C') clearScreen();
    else if (input.length !== 1) return;
    else if (input === '=') calculateScreen();
    else if (isOperator(input)) addOperator(input);
    else if (wasPrevEquals || displayScreen.value === 'ERROR') overwriteScreen(input);
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
    if (wasGivenTwoOperators(input) || wasGivenOperatorFirst(input)) showError();
    else addToScreen(input);
    wasPrevEquals = false;
  }

  function wasGivenTwoOperators(input, prev) {
    const prevInput = prev || displayScreen.value.slice(-1);
    return isNaN(prevInput) && input !== '-' || prevInput == '-';
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

  function wasGivenOperatorFirst(input) {
    return !displayScreen.value && isOperator(input) && input !== '-';
  };

}
