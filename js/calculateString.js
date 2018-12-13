const operatorMethodMapping = {
  '÷': (x, y) => String(Number(x) / Number(y)),
  'x': (x, y) => String(Number(x) * Number(y)),
  '+': (x, y) => String(Number(x) + Number(y)),
  '-': (x, y) => String(Number(x) - Number(y)),
};

const operators = ['÷', 'x', '+', '-'];

const isNumber = s => !isNaN(s) || s === '.';
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

const multiplyAndDivide = (calcArray) => calcArray.reduce((res, e, i, a) => {
  const prevE = a[i - 1];
  if (['x', '÷'].includes(prevE)) {
    const num1 = res[res.length - 2] || a[i - 2];
    const num2 = e;
    const operation = operatorMethodMapping[prevE];
    const calculated = operation(num1, num2);
    return res.slice(0, res.length - 2).concat(calculated);
  }
  return res.concat(e);
}, []);

const addAndSubtract = (calcArray) => calcArray.reduce((res, e, i, a) => {
  const prevE = a[i - 1];
  if (['+', '-'].includes(prevE)) {
    const num1 = res[res.length - 2] || a[i - 2];
    const num2 = e;
    const operation = operatorMethodMapping[prevE];
    const calculated = operation(num1, num2);
    return res.slice(0, res.length - 2).concat(calculated);
  }
  return res.concat(e);
}, []);

const calculateString = (s) => {
  const calcArray = getCalcArray(s);
  const multipliedAndDivided = multiplyAndDivide(calcArray);
  const addedAndSubtracted = addAndSubtract(multipliedAndDivided);
  return Number(addedAndSubtracted[0]);
}

