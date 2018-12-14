window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');
  const screenForm = document.querySelector('#screen-form');
  let wasPrevEquals = false;

  const isOperator = s => operators.includes(s);

  buttons.onclick = handleButtonsClick;
  screenForm.onsubmit = handleScreenFormSubmit;
  displayScreen.oninput = handleScreenInput;
  document.onkeydown = handleDocKeyDown;

  function handleDocKeyDown(e) {
    if ((e.key) === 'Escape') {
      clearScreen();
    } else if (e.key === 'Enter') {
      calculateScreen();
    }
  }

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
    const displayWithoutSpaces = displayScreen.value.replace(/\s+/g, '');
    const prevInput = displayWithoutSpaces.slice(-2, -1);
    const earlierInput = displayWithoutSpaces.slice(-3, -2);
    const isInputInvalid = isNaN(input) && !isOperator(input) && !['.', ' '].includes(input);
    if (input === '=') calculateScreen();
    else if (!prevInput && isOperator(input) && input !== '-') showError();
    else if (isInputInvalid) {
      if (displayScreen.value.includes('E')) clearScreen();
      else showError();
    } else if (prevInput && isOperator(input) && wasGivenTwoOperators(input, prevInput, earlierInput)) {
      showError();
    } else if (wasPrevEquals && !isOperator(input) && input !== ' ') {
      overwriteScreen(input);
    } else {
      wasPrevEquals = false;
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
    else if (displayScreen.value !== 'ERROR') addToScreen(input);
    wasPrevEquals = false;
  }

  function wasGivenTwoOperators(input, prev, earlier) {
    const displayWithoutSpaces = displayScreen.value.replace(/\s+/g, '');
    const prevInput = prev || displayWithoutSpaces.slice(-1);
    const earlierInput = earlier || displayWithoutSpaces.slice(-2, -1);
    const isFirstInput = !prevInput;
    const isSecondInput = !earlierInput;
    const isFirstInputNonMinusOperator = isFirstInput && isOperator(input) && input !== '-';
    const isLastTwoMinus = prevInput === '-' && input === '-';
    const isFirstTwoInputsMinus = isSecondInput && isLastTwoMinus;
    const isInitialInputInvalid = isFirstInputNonMinusOperator || isFirstTwoInputsMinus;
    const isLastTwoMinusFollowingOperator = isLastTwoMinus && isOperator(earlierInput);
    const isLastTwoOperatorsButInputNotMinus = isOperator(input) && input !== '-' && isOperator(prevInput);
    return isInitialInputInvalid || isLastTwoMinusFollowingOperator || isLastTwoOperatorsButInputNotMinus;
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
