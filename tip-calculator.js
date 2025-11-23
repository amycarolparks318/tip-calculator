//GLOBAL VARIABLES
let tipPercentage = 10;
let numOfPPl = 1
const billAmountEl = document.getElementById('bill');
const tipButton = document.querySelectorAll('.tip-button');
const resetButton = document.getElementById('reset');
const people = document.getElementById('people');
const customTip = document.getElementById('custom-tip');
const main = document.getElementsByTagName('main');
let tipTotal = document.getElementById('tip');
let totalAmount = document.getElementById('total');
const input = document.querySelectorAll('input');

//EVENTS
tipButton.forEach(btn => {
  btn.addEventListener('click', (ev) => {
    deSelected();   
    selectBtn(ev.target);
    updateTipPercentage(parseFloat(ev.target.innerHTML));
    updateTip();
    updateTotal();
    resetActive();
  })
});

customTip.addEventListener('keyup', (ev) => {
  errorMessage();
  deSelected();
  tipPercentage = customTip.value;
  updateTipPercentage(tipPercentage);
  updateTip();
  updateTotal();
  resetActive();
})

billAmountEl.addEventListener('keyup', () => {
  billAmountEl.style.color = 'hsl(183, 100%, 15%)';
  errorMessage();
  updateTip();
  updateTotal();
  resetActive();
});

people.addEventListener('keyup', () => {
  people.style.color = 'hsl(183, 100%, 15%)';
  resetActive();
  if (people.value > 0) {
    updateNumOfPpl()
    updateTip();
    updateTotal();
  }
    errorMessage();
})

resetButton.addEventListener('click', () => {
  deSelected();
  reset();
  resetButton.classList.remove('reset')
})

//FUNCTIONS
function updateTipPercentage(percentage) {
  tipPercentage = percentage
}

const deSelected = () => {
  for (let el of tipButton) {
    el.classList.remove('selected');
  }
};

function selectBtn(el) {
  el.classList.add('selected')
};

function updateTip() {
  const billAmount = billAmountEl.value;
  const tipAmount = (billAmount * tipPercentage / 100) / numOfPPl;
  tipTotal.innerText = `$${tipAmount.toFixed(2)}`;
}

function updateTotal() {
  const billAmount = Number(billAmountEl.value);
  const tipAmount = billAmount * tipPercentage / 100;
  const total = billAmount + tipAmount;
  totalAmount.innerText = `$${(total / numOfPPl).toFixed(2)}`;
}

const reset = () => {
  billAmountEl.value = 0;
  customTip.value = '';
  document.getElementById('error').innerText = "";
  people.classList.remove('hide');
  people.value = 1;
  tipPercentage = 10;
  updateTotal();
  updateTip();
  for (let btn of tipButton) {
    if (parseFloat(btn.innerHTML) == tipPercentage) {
      btn.classList.add('selected')
    }
  }
};

const resetActive = () => {
  resetButton.classList.add('reset');
}

const errorMessage = () => {
  if (!people.value || people.value === 0) {
    document.getElementById('error').innerText = "Can't be zero";
    people.classList.add('hide');
  }
  else {
    document.getElementById('error').innerText = "";
    people.classList.remove('hide');
  }
}

function updateNumOfPpl(){
  if(people.value == '' || people.value == 0){
    numOfPPl =1
  }else{
    numOfPPl = people.value
  }
}