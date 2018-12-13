window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');

  buttons.onclick = buttonOnclick;

  function buttonOnclick(e) {
    const value = e.target.innerHTML;
    if (value.length !== 1) return;

    if (value === 'C') {
      displayScreen.innerHTML = '';
    } else if (isNaN(value)) {
      if (value in operatorMapping) {
        if(isNaN(displayScreen.innerHTML.slice(-1))) {
          displayScreen.innerHTML = 'ERROR';
        } else {
          displayScreen.innerHTML += value;
        }
      }
    } else {
      displayScreen.innerHTML += value;
    }
  };
}
