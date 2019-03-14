import Web3 from "web3";

const getWeb3 = () => new Promise((resolve, reject) => {
  window.addEventListener("load", async () => {
    let web3 = window.web3;
    let ethereum = window.ethereum;

    const alreadyInjected = typeof web3 !== "undefined";
    const ethereumAlreadyInjected = typeof ethereum !== "undefined";

    if (ethereumAlreadyInjected) {
      await ethereum.enable();
      console.log("Metamask/Mist Detected.");
      resolve(web3);
    } else if (alreadyInjected) {
      web3 = new Web3(web3.currentProvider);
      console.log("Injected web3 detected.");
      resolve(web3);
    } else {
      reject(new Error('Unable to connect to Metamask'))
    }
  });
});

export default getWeb3;
