let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  if (symbol === '×') symbol = '*';
  if (symbol === '÷') symbol = '/';
  if (symbol === '−') symbol = '-';

  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      break;

    case '=':
      if (!previousOperator) return;
      flushOperation(parseInt(buffer, 10));
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      break;

    case '<':
      buffer = buffer.length === 1 ? '0' : buffer.slice(0, -1);
      break;

    case '+':
    case '-':
    case '*':
    case '/':
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') return;

  const intBuffer = parseInt(buffer, 10);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') runningTotal += intBuffer;
  else if (previousOperator === '-') runningTotal -= intBuffer;
  else if (previousOperator === '*') runningTotal *= intBuffer;
  else if (previousOperator === '/') runningTotal /= intBuffer;
}

function handleNumber(numberString) {
  if (buffer === "0") buffer = numberString;
  else buffer += numberString;
}

function init() {
  document.querySelector('.calc-buttons').addEventListener('click', function (event) {
    const btn = event.target.closest('button');
    if (!btn) return;
    buttonClick(btn.innerText.trim());
  });
}

init();