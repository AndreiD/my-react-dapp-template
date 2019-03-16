// small utils that can't fit anywhere

export default function getNetworkName(networkId) {
  var networkName = "mainet";
  switch (networkId) {
    case "1":
      networkName = "mainnet";
      break
    case "3":
      networkName = "ropsten";
      break
    case "4":
      networkName = "rinkeby";
      break
    case "42":
      networkName = "kovan";
      break
    case "8":
      networkName = "ubiq";
      break
    case "100":
      networkName = "xDai";
      break
    case "401697":
      networkName = "tobalaba";
      break
    default:
      networkName = "local development";
  }
  return networkName;
}
