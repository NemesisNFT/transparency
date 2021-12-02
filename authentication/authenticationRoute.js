const ethers = require("ethers");

router.get("/a/:signature/:hwid/:timestamp/:randomness", async (req, res) => {
  let signer;
  try {
    signer = ethers.utils.verifyMessage(
      `I hereby declare that I am owner of this wallet. I hereby declare to use this signature as a one-time login code to Nemesis bot, that I am going to use instance activated with this code and to not share it with any third party. I requested this authorization at ${req.params.timestamp} UNIX timestamp with randomness: ${req.params.randomness}.`,
      req.params.signature
    );
  } catch (e) {
    Logger.error(e);

    return res.json({
      success: false,
      msg: "Invalid signature",
    });
  }

  try {
    const user = await User.findOne({
      wallet: { $regex: new RegExp("^" + signer.toLowerCase(), "i") },
    }).exec();

    if (!user) {
      return res.json({
        success: false,
        msg: "No active instances for this wallet are found.",
      });
    }

    if (!user.hwid) {
      user.hwid = req.params.hwid;
    }

    if (user.hwid !== req.params.hwid) {
      return res.json({
        success: false,
        msg: "This wallet's instance is already activated on different device.",
      });
    }

    if (user.tokens.includes(req.params.signature)) {
      return res.json({
        success: false,
        msg: "This signature was already used.",
      });
    }

    user.tokens.push(req.params.signature);
    await user.save();

    return res.json({
      success: true,
      token: await jwt.Sign({ wallet: signer, hwid: req.params.hwid }),
    });
  } catch (e) {
    Logger.error(e);

    return res.json({
      success: false,
      msg: "Unexpected error",
    });
  }
});
