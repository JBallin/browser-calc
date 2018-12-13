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
      displayScreen.innerHTML = '';
      wasPrevEquals = false;
      return;
    }

    if (input === '=') {
      const calculation = displayScreen.innerHTML;
      const parsedCalc = Object.keys(operatorMapping).reduce((parsed, operator) => {
        return parsed.replace(operator, operatorMapping[operator]);
      }, calculation);
      displayScreen.innerHTML = eval(parsedCalc);
      wasPrevEquals = true;
      return;
    }

    if (input.length !== 1 || displayScreen.innerHTML === 'ERROR') return;

    if (input in operatorMethodMapping) {
      const prevInput = displayScreen.innerHTML.slice(-1);
      if (isNaN(prevInput)) {
        displayScreen.innerHTML = 'ERROR';
        return;
      } else {
        displayScreen.innerHTML += input;
      }
      wasPrevEquals = false;
      return;
    }

    if (wasPrevEquals) {
      displayScreen.innerHTML = input;
      wasPrevEquals = false;
    } else {
      displayScreen.innerHTML += input;
    }
  };
}
