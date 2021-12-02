const passphrasePath = path.join(appPath, "passphrase.hash");
const passphraseHash = readPassphraseHash(passphrasePath);

function getSha256OfString(str) {
  return getSha256OfBuffer(Buffer.from(str, "utf8"));
}

function getSha256OfBuffer(buffer) {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(buffer);

  return hashSum.digest("hex");
}

function readPassphraseHash() {
  if (!fs.existsSync(passphrasePath)) {
    return "";
  }

  return fs.readFileSync(passphrasePath, "utf8");
}

// Electron Events on ipcMain
ipcMain.handle("getPassphrase", () => {
  return passphraseHash;
});

ipcMain.handle("setFirstPassphrase", (e, msg) => {
  fs.writeFileSync(passphrasePath, getSha256OfString(msg));
  return true;
});



// Renderer validation
const validatePassphrase = async () => {
    setPassphraseError("");

    if (storedHash === "") {
      const result = await ipcRenderer.invoke("setFirstPassphrase", aesKey);
      if (!result) {
        setPassphraseError(
          "There was issue setting your first passphrase, please try again..."
        );
        return;
      }

      await ElectronStore.Setup(aesKey);
      window.alreadyEnteredPassphrase = true;
      setCreateTaskModal(false);
    } else {
      const enteredHash = await ipcRenderer.invoke("getShaHash", aesKey);
      if (enteredHash !== storedHash) {
        setPassphraseError(
          "You have entered wrong passphrase, please try again..."
        );
        return;
      } else {
        await ElectronStore.Setup(aesKey);
        window.alreadyEnteredPassphrase = true;

        setCreateTaskModal(false);
      }
    }
  };
