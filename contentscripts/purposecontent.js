chrome.runtime.sendMessage({ message: "online.vfsglobal.dz-purpose" }, function (response) {
  //s
  console.log("Injection success message sent to popup");
});

(async function initiateIIFE() {
  await selectPurposePage();
})();

async function selectPurposePage(){
  let purposeArr = [{AOK : 1004},       // 00. Adoption of Kafala
                  {BP : 1005},        // 01. Biusiness Professionlas
                  {LS : 781},         // 02. Long Stay
                  {MED : 907},        // 03. Medical
                  {OLSV : 1018},      // 04. Other long stay Visa
                  {RV : 1006},        // 05. Return Visa
                  {SR : 1012},        // 06. Scientific researchers
                  {SS : 782},         // 07. Short stay
                  {SSR : 874},        // 08. Short stay for renewal
                  {SSFMWAFN : 1014},  // 09. short stay for marriage with a french national
                  {SOFN : 980},       // 10. Spouse of french nationals
                  {S : 982},          // 11. Student
                  {VRFBP : 1016}];    // 12. Visa renewal for business purpose

  await WaitForXpath("/html/body/div[2]/div[1]/div[3]/div[3]/form/div[1]/div/div[4]/div[2]/select");
  _x("/html/body/div[2]/div[1]/div[3]/div[3]/form/div[1]/div/div[4]/div[2]/select").value = `${purposeArr[11].S}`;   //Select Purpose
  await waitFor(5000);
  _x("/html/body/div[2]/div[1]/div[3]/div[3]/form/div[2]/input").click();    //Submit Button
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

      if (_s(selector) !== null || seconds === "10") {
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

async function WaitForXpathWithTimer(selector) {
  return await new Promise((resolve, reject) => {
    let count = 1;
    let timer = setInterval(() => {
      let seconds = millisToMinutesAndSeconds(count * 100);

      if ($_(selector) !== null || seconds === "10") {
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

async function WaitForXpath(selector) {
  return await new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if (_x(selector) !== null) {
        clearInterval(timer);
        console.log("wairForXPath resolved");
        resolve();
      }
    }, 100);
  });
}

function _x(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function _s(selector){
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
