const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const buttons = document.querySelectorAll("button");
const displayTipAmount = document.getElementById("tipAmountPerPerson");
const displayPeopleAmount = document.getElementById("totalAmountPerPerson");
const textErrorInputPeople = document.getElementById("errorText");
const resetButton = document.getElementById("reset");
const customInput = document.getElementById("custom");

let tip;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("button-active-style"));
    button.classList.add("button-active-style");
    tip = button.value;
  });
});
const handleValue = () => {
  const billInputValue = billInput.value;
  const peopleInputValue = peopleInput.value;

  resetButton.classList.toggle("reset-active");
  resetButton.disabled = false;
  textErrorInputPeople.classList.toggle("errorText");
  peopleInput.classList.toggle("errorInputPeople");

  const calculate = (bill, tip, people) => {
    const pricePerPerson = +(bill / people);
    if (customInput.value) {
      tip = customInput.value;
    }
    const totalTips = +(bill * (tip / 100));
    const tipPerPerson = parseFloat(totalTips / people);
    const fixedTipPerPerson = parseFloat(tipPerPerson.toFixed(2));
    const totalPerPerson = pricePerPerson + fixedTipPerPerson;
    return { fixedTipPerPerson, totalPerPerson };
  };

  const result = calculate(billInputValue, tip, peopleInputValue);
  if (!isNaN(result.fixedTipPerPerson) && !isNaN(result.totalPerPerson)) {
    displayTipAmount.innerText = result.fixedTipPerPerson;
    displayPeopleAmount.innerText = result.totalPerPerson;
    resetButton.classList.toggle("reset-active");
    resetButton.disabled = false;
    textErrorInputPeople.classList.remove("errorText");
    peopleInput.classList.remove("errorInputPeople");
  }
};

const handleReset = () => {
  billInput.value = "0";
  peopleInput.value = "0";
  displayTipAmount.innerText = "$0.00";
  displayPeopleAmount.innerText = "$0.00";
};
