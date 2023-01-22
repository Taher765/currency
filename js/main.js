let selectBox = document.querySelectorAll(".select-box");
let result = document.querySelector(".result");
let btn = document.querySelector(".btn");
let amount = document.querySelector("#amount");

// Add currencies from the api to the select box
fetch("https://v6.exchangerate-api.com/v6/2d89ec33bc7877e203e1d2e3/codes")
  .then((res) => res.json())
  .then((data) => {
    const res = data.supported_codes;
    for (let i = 0; i < res.length; i++) {
      let selectOptionForm = document.createElement("option");
      let selectOptionTo = document.createElement("option");
      selectOptionForm.innerHTML = res[i][0];
      selectOptionTo.innerHTML = res[i][0];
      selectBox[0].appendChild(selectOptionForm);
      selectBox[1].appendChild(selectOptionTo);

      // selectBox[0].innerHTML += `<option >${obj}</option>`;
      // selectBox[1].innerHTML += `<option >${obj}</option>`;
    }

    btn.addEventListener("click", () => {
      fetch(
        `https://v6.exchangerate-api.com/v6/2d89ec33bc7877e203e1d2e3/latest/${selectBox[0].value}`
      )
        .then((res) => res.json())
        .then((data) => {
          let dataObj = data.conversion_rates;

          console.log(amount.value);
          let y = amount.value * dataObj[selectBox[1].value]; // amount => string => بس اتحول عشان علامه الضرب عشان كدا مش محتاج اضيف ميثود

          const content = `${+amount.value} ${selectBox[0].value} = ${y.toFixed(
            2
          )} ${selectBox[1].value}`;
          result.innerHTML = content;
        });
    });
  });

// simple validation
amount.addEventListener("keyup", () => {
  if (isNaN(amount.value)) {
    amount.style.border = "1px solid #f00";
    amount.value = "1";
  } else {
    amount.style.border = "none";
    amount.value = amount.value;
  }
});
