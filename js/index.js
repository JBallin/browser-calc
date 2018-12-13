window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');

  buttons.onclick = buttonsOnClick;

  function buttonsOnClick(e) {
    const input = e.target.innerHTML;

    if (input === 'C') {
      displayScreen.innerHTML = '';
      return;
    }

    if (input.length !== 1 || displayScreen.innerHTML === 'ERROR') return;

    if (input in operatorMethodMapping) {
      const prevInput = displayScreen.innerHTML.slice(-1);
      if (isNaN(prevInput)) {
        displayScreen.innerHTML = 'ERROR';
        return;
      }
    }

    displayScreen.innerHTML += input;
  };
}
