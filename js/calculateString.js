const operatorMethodMapping = {
  '÷': (x, y) => x / y,
  'x': (x, y) => x * y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
};

const operators = ['÷', 'x', '+', '-'];

const isNumber = s => !isNaN(s);
const isOperator = s => operators.includes(s);

const getCalcArray = (str) => {
  const calculationArray = [];
  let curr = '';
  const split = str.split('');

  split.forEach(e => {
    if (isNumber(e)) {
      curr += e;
    } else if (isOperator(e)) {
      if (!curr) throw Error('two subsequent operators');
      calculationArray.push(curr);
      calculationArray.push(e);
      curr = '';
    }
  });
  calculationArray.push(curr);
  return calculationArray;
};
