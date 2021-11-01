chrome.runtime.sendMessage({ message: "online.vfsglobal.dz-fillform" }, function (response) {
  console.log("Injection success message sent to popup");
});

(async function initiateIIFE() {
  await fillForm();
})();

async function fillForm(){
  await waitForXpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[1]/div[2]/input");
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[1]/div[2]/input").value = 'Passport Number';
  await waitFor(1000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[2]/div[2]/input" ).value = "D.O.B";
  await waitFor(2000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[3]/div[2]/input").value = "Passport Expiry";
  await waitFor(1000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[4]/div[2]/select").value = "Nationality"; //Algeria : 161
  await waitFor(2000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[5]/div[2]/input").value = "First Name";
  await waitFor(1000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[6]/div[2]/input").value = "Last Name";
  await waitFor(3000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[7]/div[2]/select ").value = "select gender";  //1.Male, 2.Female, 3.Others
  await waitFor(1000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[8]/div[2]/input[1]").value = "Dial Code";
  await waitFor(2000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[8]/div[2]/input[2]").value = "Phone Number";
  await waitFor(1000);
  customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[9]/div[2]/input").value = "Email";
  await waitFor(2000);
  //customxpath("/html/body/div[2]/div[1]/div[3]/div[4]/form/div[10]/input[2]")[0]click(); //Submit Button

  chrome.runtime.sendMessage({ message: "completed" }, function (response) {
    console.log("completed message sent to popup");
  });
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

      if (customselector(selector) !== null || seconds >= "10") {
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

      if (customxpath(selector) !== null || seconds === "10") {
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
      if (customxpath(selector) !== null) {
        clearInterval(timer);
        console.log("wairForXPath resolved");
        resolve();
      }
    }, 100);
  });
}

function customxpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function customselector(selector){
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