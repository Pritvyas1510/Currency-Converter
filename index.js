const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const lowCode = fromCurr.value.toLowerCase();
  const URL = `${BASE_URL}${lowCode}.json`;
// console.log(URL);


    const response = await fetch(URL);
    
    const Objdata = await response.json();
//     console.log(Objdata);

//   console.log(lowCode);

  
  let conversion = await Objdata[lowCode];
  const lowto = toCurr.value.toLowerCase();
 
let toCurrency = conversion[lowto];

  //let rate = data;
//   console.log(toCurr.value);
//   console.log(fromCurr.value);
  let fromRate = conversion[fromCurr.value];
  let toRate = conversion[toCurr.value];
 
  if (fromCurr.value) {
    finalAmount = amtVal * toCurrency;
  } else {
    finalAmount = amtVal * (toCurrency / fromRate);
  }
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;
});
