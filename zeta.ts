// Loads the local .env file into `process.env`.
require("dotenv").config();

import { Connection, Keypair } from "@solana/web3.js";
import {
  Client,
  Exchange,
  Network,
  Wallet,
  utils,
  types,
  assets,
  
} from "@zetamarkets/sdk";
const networkUrl = "https://solana-devnet.g.alchemy.com/v2/4Q5FSmnGz3snzIr01s-ZNwAtdFdnDB9L"
// Loads the private key in .env
const privateKey = Keypair.fromSecretKey(
    // @ts-ignore
  new Uint8Array(JSON.parse(Buffer.from(process.env.private_key).toString()))
);
const wallet = new Wallet(privateKey);

// Starts a solana web3 connection to an RPC endpoint
const connection = new Connection(networkUrl, utils.defaultCommitment());
setTimeout(async function(){
// Airdrop some SOL to your wallet
await connection.requestAirdrop(wallet.publicKey, 100000000);

// Loads the SDK exchange singleton. This can take up to 10 seconds...
await Exchange.load(
  [assets.Asset.SOL, assets.Asset.BTC, assets.Asset.ETH ], // Can be one or more depending on what you wish to trade
  // @ts-ignore
  process.env.PROGRAM_ID,
  Network.DEVNET,
  connection,
  utils.defaultCommitment(),
  undefined, // Exchange wallet can be ignored for normal clients.
  0, // ThrottleMs - increase if you are running into rate limit issues on startup.
  undefined // Callback - See below for more details.
);
utils.displayState();
// Load the user SDK client.
// Note that this client is active for the same assets you passed into Exchange.load() earlier
const client = await Client.load(
    connection,
    wallet, // Use the loaded wallet.
    utils.defaultCommitment(),
    undefined // Callback - See below for more details.
  );
  for (var i = 0 ; i <= 21; i++){
    var asset = assets.Asset.SOL;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
    // Place an order in cross with offers to get a position.
    
      client.placeOrder(
            asset,
            i,
            utils.convertDecimalToNativeInteger(6.9),
            1,
            types.Side.BID
        );
      client.placeOrder(
            asset,
            i,
            utils.convertDecimalToNativeInteger(11.97),
            1,
            types.Side.ASK
        );
        
  
  }
  i++
  console.log('fut1')
  var asset = assets.Asset.SOL;
      await Exchange.updateOrderbook(asset, i);
      console.log(Exchange.getOrderbook(asset, i));
    client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
      var asset = assets.Asset.BTC;
      await Exchange.updateOrderbook(asset, i);
      console.log(Exchange.getOrderbook(asset, i));
    client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
      var asset = assets.Asset.ETH;
      await Exchange.updateOrderbook(asset, i);
      console.log(Exchange.getOrderbook(asset, i));
    client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
  for (var i = 23 ; i <= 44; i++){
    var asset = assets.Asset.SOL;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
  }
i++
console.log('fut2')
try{
var asset = assets.Asset.SOL;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
}
catch(err){
    
}
try {
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));


  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
}
    catch(err){
        
    }
    try {
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    console.log(Exchange.getOrderbook(asset, i));


  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(6.9),
        1,
        types.Side.BID
    );
  client.placeOrder(
        asset,
        i,
        utils.convertDecimalToNativeInteger(11.97),
        1,
        types.Side.ASK
    );
}
    catch(err){
        
    }

    console.log('perps')
    i = 137
    try {
    var asset = assets.Asset.SOL;
        await Exchange.updateOrderbook(asset, i);
        console.log(Exchange.getOrderbook(asset, i));}
        catch(err){
            
        }
        try {
        var asset = assets.Asset.BTC;
        await Exchange.updateOrderbook(asset, i);
        console.log(Exchange.getOrderbook(asset, i));}
        catch(err){
            
        }
        try {
        var asset = assets.Asset.ETH;
        await Exchange.updateOrderbook(asset, i);
        console.log(Exchange.getOrderbook(asset, i));}
        catch(err){
            
        }
})