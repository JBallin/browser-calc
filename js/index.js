/* eslint-disable no-use-before-define */

window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');

  let wasPrevEquals = false;

  buttons.onclick = handleButtonsClick;
  document.onkeydown = handleDocKeyDown;

  function handleDocKeyDown(e) {
    if (e.key === 'Escape') {
      clearScreen();
    } else if (e.key === 'Enter') {
      calculateScreen();
    } else if (e.key === 'Backspace') {
      if (displayScreen.innerHTML.includes('E')) clearScreen();
      else deleteLastChar();
    } else {
      handleInput(e.key);
    }
  }

  function handleInput(input) {
    if (input.length !== 1) return;

    if (input === 'C') clearScreen();
    else if (input === '=') calculateScreen();
    else if (isOperator(input)) addOperator(input);
    else if (isInvalidInput(input)) showError();
    else if (wasPrevEquals || displayScreen.innerHTML === 'ERROR') overwriteScreen(input);
    else addToScreen(input);
  }


  /* HELPER FUNCTIONS */

  function isInvalidInput(input) {
    return Number.isNaN(Number(input)) && !isOperator(input) && !['.', ' '].includes(input);
  }

  function isOperator(s) {
    return operators.includes(s); // eslint-disable-line no-undef
  }

  function handleButtonsClick(e) {
    handleInput(e.target.innerHTML);
  }

  function clearScreen() {
    displayScreen.innerHTML = '';
    wasPrevEquals = false;
  }

  function calculateScreen() {
    if (displayScreen.innerHTML === 'ERROR') clearScreen();
    else if (displayScreen.innerHTML) {
      const calculation = displayScreen.innerHTML;
      try {
        displayScreen.innerHTML = calculateString(calculation); // eslint-disable-line no-undef
        if (Number.isNaN(Number(displayScreen.innerHTML))) throw Error;
      } catch (e) {
        showError();
      }
      wasPrevEquals = true;
    }
  }

  function addOperator(input) {
    if (wasGivenTwoOperators(input) || wasGivenOperatorFirst(input)) showError();
    else if (displayScreen.innerHTML === 'ERROR' && input === '-') overwriteScreen('-');
    else if (displayScreen.innerHTML !== 'ERROR') addToScreen(input);
    wasPrevEquals = false;
  }

  function wasGivenTwoOperators(input) {
    const displayWithoutSpaces = displayScreen.innerHTML.replace(/\s+/g, '');
    const prevInput = displayWithoutSpaces.slice(-1);
    const earlierInput = displayWithoutSpaces.slice(-2, -1);
    const isFirstInput = !prevInput;
    const isSecondInput = !earlierInput;
    const isFirstInputNonMinusOperator = isFirstInput && isOperator(input) && input !== '-';
    const isLastTwoMinus = prevInput === '-' && input === '-';
    const isFirstTwoInputsMinus = isSecondInput && isLastTwoMinus;
    const isInitialInputInvalid = isFirstInputNonMinusOperator || isFirstTwoInputsMinus;
    const isLastTwoMinusFollowingOperator = isLastTwoMinus && isOperator(earlierInput);
    const isLastTwoOperatorsButInputNotMinus = isOperator(input) && input !== '-' && isOperator(prevInput);
    return isInitialInputInvalid || isLastTwoMinusFollowingOperator
    || isLastTwoOperatorsButInputNotMinus;
  }

  function overwriteScreen(input) {
    displayScreen.innerHTML = input;
    wasPrevEquals = false;
  }

  function addToScreen(input) {
    displayScreen.innerHTML += input;
    wasPrevEquals = false;
  }

  function showError() {
    displayScreen.innerHTML = 'ERROR';
  }

  function wasGivenOperatorFirst(input) {
    return !displayScreen.innerHTML && isOperator(input) && input !== '-';
  }

  function deleteLastChar() {
    displayScreen.innerHTML = displayScreen.innerHTML.slice(0, -1);
  }
};
