// USING REQUIRE ANIMATION FRAME


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



    let start = null;
    const timeDelay = 1000 * btnConfigs.counterTime;  // time in miliseconds
    const maxWidth = 100;
    function progressBar(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;   // check wheather how much time remains
      const barProgress = Math.min(elapsed / timeDelay, 1);

      let width = (maxWidth * (1 - barProgress));
      updateBoxConfig(btnConfigs, width)
      if (barProgress >= 1 || !isPromisePending) {
        width = 0;
        resolve(true);
        updateBoxConfig(btnConfigs, width)
      } else {
        requestAnimationFrame(progressBar)
      }
    }
    requestAnimationFrame(progressBar)
  })

  return promise;
}


function updateBoxConfig(buttonConfigs, width) {
  buttonConfigs.box.style.width = `${width}px`

  buttonConfigs.box.innerHTML = width > 0 ? `${Math.floor(width)}%....` : ''

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



// when btn click i have to call a function containing new promise that changes counter and innerHTML of box;
// if a btn is click after the above promise resolve then continue the step 1;
// if btn is click before the above promise resolve => promise in pending state for counter ; then save this promise in state array

// wait till the above promise resolve and then call this promise
// 
