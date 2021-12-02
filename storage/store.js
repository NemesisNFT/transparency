const Store = require("electron-store");
let initializedStore = null;

module.exports = (aesKey) => {
  if (initializedStore !== null) {
    return initializedStore;
  }

  initializedStore = new Store({
    encryptionKey: aesKey,
    defaults: {
      wallets: [],
      tasks: [],
      analytics: {
        totalCheckouts: 0,
        monthlyData: {
          1: { name: "Jan", checkouts: 0 },
          2: { name: "Feb", checkouts: 0 },
          3: { name: "Mar", checkouts: 0 },
          4: { name: "Apr", checkouts: 0 },
          5: { name: "May", checkouts: 0 },
          6: { name: "Jun", checkouts: 0 },
          7: { name: "Jul", checkouts: 0 },
          8: { name: "Aug", checkouts: 0 },
          9: { name: "Sep", checkouts: 0 },
          10: { name: "Oct", checkouts: 0 },
          11: { name: "Nov", checkouts: 0 },
          12: { name: "Dec", checkouts: 0 },
        },
      },
      settings: {
        webhook: "",
        webhookDelay: "",
        flashbotsRelay: "relay.flashbots.net",
        mainnetRPC: "",
        retryDelay: 3500,
        preferences: {
          sound: true,
          push: true,
        },
      },
    },
  });

  return initializedStore;
};
