
const fiveSecondButton = document.querySelector(".fiveSecondClick");
const tenSecondButton = document.querySelector(".tenSecondClick");
const fifteenSecondButton = document.querySelector(".fifteenSecondClick");
const clearCurrentPromise = document.querySelector(".clearCurrentPromise");
const clearAllPromises = document.querySelector(".clearAllPromises");
const fiveSecondBox = document.querySelector('.fiveSecondBox');
const tenSecondBox = document.querySelector('.tenSecondBox');
const fifteenSecondBox = document.querySelector('.fifteenSecondBox');
const pendingPromiseList = document.querySelector('#myList');
const resolvedPromiseList = document.querySelector("#resolved");

let promisesArray = [];
let isPromisePending = true;


const buttonConfigs = [
  {
    textContent: "Five Second Button Clicked",
    counterTime: 5,
    box: fiveSecondBox,
  }, {
    textContent: "Ten Second Button Clicked",
    counterTime: 10,
    box: tenSecondBox,

  }, {
    textContent: "Fifteen Second Button Clicked",
    counterTime: 15,
    box: fifteenSecondBox
  },
]



function promiseButtonHandler(btnConfigs) {
  const promise = new Promise((resolve, reject) => {
    let counter = btnConfigs.counterTime;

    updateBoxConfig(btnConfigs, counter, "green")
    const promiseIntervalId = setInterval(() => {

      if (counter === 0 || !isPromisePending) {
        counter = 0;
        updateBoxConfig(btnConfigs, counter, "none")
        clearInterval(promiseIntervalId);
        resolve(true);
      } else {
        counter--;
        updateBoxConfig(btnConfigs, counter, "none")
      }
    }, 1000);
  })

  return promise;
}


function updateBoxConfig(buttonConfigs, value, borderColor) {
  if (value === 0) {
    buttonConfigs.box.style.border = `none`;
    buttonConfigs.box.innerHTML = "";
  }
  const counter = buttonConfigs.counterTime;
  const width = (200 / counter) * value;
  buttonConfigs.box.style.width = `${width}px`
  buttonConfigs.box.innerHTML = value;
  buttonConfigs.box.style.border = `2px solid ${borderColor}`
}

function createPromiseList(configs) {
  const listElement = document.createElement('li');
  listElement.textContent = configs;
  return listElement
}

function addPromiseToPendingList(configs) {
  const pendingPromise = createPromiseList(configs.textContent)
  pendingPromiseList.appendChild(pendingPromise);
}

function handleButtonClick(configs) {
  isPromisePending = true;
  if (promisesArray.length > 0) {
    promisesArray.push(configs);
  } else {
    promisesArray.push(configs);
    processPromisesSequentially();
  }

  addPromiseToPendingList(configs)
}


fiveSecondButton.addEventListener('click', function () {
  const configs = buttonConfigs[0]
  handleButtonClick(configs);
});


tenSecondButton.addEventListener('click', function () {
  const configs = buttonConfigs[1]
  handleButtonClick(configs);
});


fifteenSecondButton.addEventListener('click', function () {
  const configs = buttonConfigs[2]
  handleButtonClick(configs);
});


clearCurrentPromise.addEventListener('click', function () {
  isPromisePending = false;
});


clearAllPromises.addEventListener('click', function () {
  isPromisePending = false;
  promisesArray = [];
  pendingPromiseList.innerHTML = ""
  resolvedPromiseList.innerHTML = ""
})


async function processPromisesSequentially() {
  while (promisesArray.length > 0) {
    isPromisePending = true;
    const promise = promisesArray[0];
    const res = await promiseButtonHandler(promise);
    console.log(res);

    const pendingListElement = pendingPromiseList;
    const firstChild = pendingListElement.firstElementChild; // Gets the first child element of the <li>

    if (firstChild) {
      firstChild.style.color = "red"
      pendingListElement.removeChild(firstChild); // Removes the first child element from pending

      const resolvedPromise = createPromiseList(firstChild.textContent)
      resolvedPromiseList.appendChild(resolvedPromise);
    }
    console.log("Promise resolved" + res);

    if (res) {
      promisesArray.shift();
    }

  }
}
