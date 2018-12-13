window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');

  buttons.onclick = buttonsOnClick;

  function buttonsOnClick(e) {
    const value = e.target.innerHTML;

    if (value === 'C') {
      displayScreen.innerHTML = '';
      return;
    }

    if (value.length !== 1 || displayScreen.innerHTML === 'ERROR') return;

    if (value in operatorMapping) {
      const prevInput = displayScreen.innerHTML.slice(-1);
      if (isNaN(prevInput)) {
        displayScreen.innerHTML = 'ERROR';
        return;
      }
    }

    displayScreen.innerHTML += value;
  };
}
