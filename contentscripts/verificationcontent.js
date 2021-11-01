chrome.runtime.sendMessage({ message: "visa.vfsglobal.com-verification" }, function (response) {
  //s
  console.log("Injection success message sent to popup");
});

(async function initiateIIFE() {
  await firstPage();
})();

async function firstPage() {
  console.log('in acceptCookie');

  //Accept All Cookies - Accept cookie button returns null so Skipping it altogether
  //$x("/html/body/div[2]/div[3]/div/div[1]/div/div[2]/div/button[3]")[0].click();
  //$s("#onetrust-accept-btn-handler").click()

  await waitFor(7000);

  await waitForSelector("#__layout > div > main > div > div > div.container.row-rep > div.row.no-gutters.collapsible-row.border-0 > div.viewmore.collapsed");
  //click to expand
  $s("#__layout > div > main > div > div > div.container.row-rep > div.row.no-gutters.collapsible-row.border-0 > div.viewmore.collapsed").click();
  
  await waitFor(2000);

  //I Agree 
  //$x("/html/body/div[1]/div/div/main/div/div/div[2]/div[3]/div[3]/div/p[6]/a")[0].click();
  $s("#colap1 > div > p:nth-child(8) > a").click();
}

async function waitFor(delay) {
  console.log("delayed for : " + delay);
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function waitForSelector(selector){
  return await new Promise((resolve, reject) => {
    let count = 1;
    let timer = setInterval(() => {
      let seconds = millisToMinutesAndSeconds(count * 100);

      if ($s(selector) !== null || seconds >= "30") {
        clearInterval(timer);
        console.log("wairForSelector resolved");
        resolve();
      }

      count++;
    }, 100);

    function millisToMinutesAndSeconds(millis) {
      //var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds;
    }
  });
}

async function waitForXpathWithTimer(selector) {
  return await new Promise((resolve, reject) => {
    let count = 1;
    let timer = setInterval(() => {
      let seconds = millisToMinutesAndSeconds(count * 100);

      if ($x(selector) !== null || seconds === "10") {
        clearInterval(timer);
        console.log("wairForXPath resolved");
        resolve();
      }

      count++;
    }, 100);

    function millisToMinutesAndSeconds(millis) {
      //var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds;
    }
  });
}

async function waitForXpath(selector) {
  return await new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if ($x(selector) !== null) {
        clearInterval(timer);
        console.log("wairForSel Phase2 resolved");
        resolve();
      }
    }, 100);
  });
}

function $x(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function $s(selector){
  //a
  return document.querySelector(selector);
}

async function asyncStorageGet(item) {
  var getValue = new Promise(function (resolve, reject) {
    chrome.storage.local.get(item, (data) => {
      console.log(
        "%c StorageItem Retreived Sucessfully",
        "color: brown; font-style: italic"
      );
      resolve(data[item]);
    });
  });

  let gV = await getValue;
  return gV;
}

async function AsyncStorageSet(item) {
  new Promise(function (resolve, reject) {
    chrome.storage.local.set(item, () => {
      console.log(
        `%c StorageItem set ${{ item }} Sucessfully`,
        "color: brown; font-style: italic"
      );
      resolve();
    });
  });
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
