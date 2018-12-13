window.onload = () => {
  const buttons = document.querySelector('.buttons');
  const displayScreen = document.querySelector('#screen');

  buttons.onclick = buttonOnclick;
  
  function buttonOnclick(e) {
    const value = e.target.innerHTML;
    if (value.length === 1) {
      displayScreen.innerHTML += value;
    }
  };
}
