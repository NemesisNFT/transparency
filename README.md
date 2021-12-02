# Nemesis Bot
## _Data storage transparency_

We do care about your security at Nemesis Automation and we have decided to show you how your data is handled.

## Database
We store some data on MongoDB database for authentication purposes but it's nothing sensitive. 
This data is:
- Machine ID - So we keep track that each user only has one active instance at a time
- Wallet Address - So we know who has access to the bot
- Expiry - Expiry time for specific subscription
- Signatures - Array of previously used signatures for authorization of bot usage

## Authentication of user
There is no data stored on this part except the signature.
The user passes signature, machine ID, timestamp, and randomness. The signature is then verified and when we get the signer of the message we look for that wallet in our database. If it's present we save the signature so it can't be reused anymore and generate JWT, which the user can authenticate with, and return it in the body.
For details and code examples please see [authentication folder](https://github.com/NemesisNFT/transparency/tree/main/authentication)!

## Wallet and Bot Config storage
We currently use [electron-store](https://www.npmjs.com/package/electron-store) for storing all data. We are providing it with `encryptionKey` which essentially encrypts all data [aes-256-cbc](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation).
Disclaimer: There is a message on electron-store saying `Note that this is not intended for security purposes, since the encryption key would be easily found inside a plain-text Node.js app.` please keep in mind that this is implying you store your encryption key in the application. In Nemesis user is prompted to set up their encryption key and they are prompted to enter the key every time they open the application ensuring the key is safe and never store. Only the SHA256 hash of the encryption key is saved in `passphrase.hash` file.
For code please see [storage folder](https://github.com/NemesisNFT/transparency/tree/main/storage)!

## Specific Questions or Concerns?
Please send me an e-mail at `wangweiautomationio@gmail.com` and I'll be happy to clear things out for you!
