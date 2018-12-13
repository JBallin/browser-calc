window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');
  let wasPrevEquals = false;

  buttons.onclick = buttonsOnClick;

  function buttonsOnClick(e) {
    const input = e.target.innerHTML;
    const operatorMapping = {
      '÷': '/',
      'x': '*',
    };
    const operatorMethodMapping = {
      '÷': (x, y) => x / y,
      'x': (x, y) => x * y,
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
    }

    if (input === 'C') {
      displayScreen.value = '';
      wasPrevEquals = false;
      return;
    }

    if (input === '=') {
      const calculation = displayScreen.value;
      displayScreen.value = calculateString(calculation);
      wasPrevEquals = true;
      return;
    }

    if (input.length !== 1 || displayScreen.value === 'ERROR') return;

    if (input in operatorMethodMapping) {
      const prevInput = displayScreen.value.slice(-1);
      if (isNaN(prevInput)) {
        displayScreen.value = 'ERROR';
        return;
      } else {
        displayScreen.value += input;
      }
      wasPrevEquals = false;
      return;
    }

    if (wasPrevEquals) {
      displayScreen.value = input;
      wasPrevEquals = false;
    } else {
      displayScreen.value += input;
    }
  };
}
