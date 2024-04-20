// script.js

// 計算結果を表示する要素を取得
const display = document.querySelector('.display');

// 現在の演算子と値を保持する変数
let currentOperator = null;
let currentValue = 0;

// ボタンクリック時の処理を定義
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// ボタンクリック時の処理
function handleButtonClick(event) {
  const buttonText = event.target.textContent;

  // クリアボタンが押された場合
  if (buttonText === 'AC') {
    clearDisplay();
  }
  // 符号変更ボタンが押された場合
  else if (buttonText === '+/-') {
    toggleSign();
  }
  // パーセントボタンが押された場合
  else if (buttonText === '%') {
    calculatePercent();
  }
  // 数字ボタンが押された場合
  else if (!isNaN(parseInt(buttonText))) {
    inputNumber(parseInt(buttonText));
  }
  // 演算子ボタンが押された場合
  else if (['+', '-', '×', '÷'].includes(buttonText)) {
    performOperation(buttonText);
  }
  // 小数点ボタンが押された場合
  else if (buttonText === '.') {
    inputDecimal();
  }
  // 計算ボタンが押された場合
  else if (buttonText === '=') {
    calculate();
  }
}

// 表示をクリアする関数
function clearDisplay() {
  display.textContent = '0';
  currentOperator = null;
  currentValue = 0;
}

// 符号を変更する関数
function toggleSign() {
  const currentNumber = parseFloat(display.textContent);
  display.textContent = (currentNumber * -1).toString();
}

// パーセント計算を行う関数
function calculatePercent() {
  const currentNumber = parseFloat(display.textContent);
  display.textContent = (currentNumber * 0.01).toString();
}

// 数字を入力する関数
function inputNumber(number) {
  if (display.textContent === '0') {
    display.textContent = number.toString();
  } else {
    display.textContent += number.toString();
  }
}

// 演算子を入力して処理する関数
function performOperation(operator) {
  const currentNumber = parseFloat(display.textContent);
  if (currentOperator === null) {
    currentValue = currentNumber;
  } else {
    calculate();
  }
  currentOperator = operator;
  display.textContent = '0';
}

// 小数点を入力する関数
function inputDecimal() {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

// 計算を実行する関数
function calculate() {
  const currentNumber = parseFloat(display.textContent);
  let result;

  switch (currentOperator) {
    case '+':
      result = currentValue + currentNumber;
      break;
    case '-':
      result = currentValue - currentNumber;
      break;
    case '×':
      result = currentValue * currentNumber;
      break;
    case '÷':
      result = currentValue / currentNumber;
      break;
    default:
      return;
  }

  display.textContent = result.toString();
  currentOperator = null;
  currentValue = result;
}