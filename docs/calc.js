function calculate(operation) { // 入力値を取得
    const value1 = parseFloat(document.getElementById('value1').value);
    const value2 = parseFloat(document.getElementById('value2').value);

    let result; // 計算結果

    if (operation === '+') { // 加算
        result = value1 + value2;
    }
    else if (operation === '-') { // 減算
        result = value1 - value2;
    }
    else if (operation === '*') { // 乗算
        result = value1 * value2;
    }
    else if (operation === '/') { // 除算
        if (value2 === 0) { // 0で割ることのチェック
            alert("Cannot divide by zero!");
            return;
        }
        result = value1 / value2;
    }
    else { // 無効な操作
        result = 'Invalid operation';
    }
    document.getElementById('result').textContent = result; // 結果を表示
}
