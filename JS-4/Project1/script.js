// Select elements
const resultEl = document.getElementById("result");
const copyboardEl = document.getElementById("copyboard");
const sizeEl = document.getElementById("size");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numericalsEl = document.getElementById("numericals");
const symbolEl = document.getElementById("symbols");
const createEl = document.getElementById("create");

const randomFun = {
  upper: generateUpper,
  lower: generateLower,
  number: generateNumber,
  symbol: generateSymbol,
};

copyboardEl.addEventListener("click", function () {
  let password = resultEl.innerText;

  if (!password) return;

  let textArea = document.createElement("textarea");
  textArea.value = password;

  document.body.appendChild(textArea);
  textArea.select();

  document.execCommand("copy");

  textArea.remove();

  alert("Copied to the clipboard");
});

createEl.addEventListener("click", function () {
  const size = +sizeEl.value;
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumericals = numericalsEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(
    size,
    hasUpper,
    hasLower,
    hasNumericals,
    hasSymbol
  );
});

function generatePassword(size, upper, lower, numericals, symbol) {
  let generatedPassword = "";

  let typeCheck = upper + lower + numericals + symbol;

  let typeArr = [];

  if (upper) typeArr.push({ upper });
  if (lower) typeArr.push({ lower });
  if (numericals) typeArr.push({ number: generateNumber });
  if (symbol) typeArr.push({ symbol: generateSymbol });

  if (typeCheck === 0) {
    return "";
  }

  for (let i = 0; i < size; i++) {
    let randomTypeIndex = Math.floor(Math.random() * typeArr.length);
    let funcName = Object.keys(typeArr[randomTypeIndex])[0];
    generatedPassword += randomFun[funcName]();
  }

  return generatedPassword;
}

// Helper Functions
function generateUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbol() {
  const symbols = "!@#$%^&*(){}[],/?";
  let size = symbols.length;
  return symbols[Math.floor(Math.random() * size)];
}
