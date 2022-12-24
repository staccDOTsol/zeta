// Loads the local .env file into `process.env`.
require("dotenv").config();
process.on('uncaughtException', function (exception) {
  // handle or ignore error
 });
var bs = require("black-scholes");
// @ts-ignore
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  Client,
  Exchange,
  Network,
  Wallet,
  utils,
  types,
  assets,Decimal
  
} from "@zetamarkets/sdk";
import bs58 from 'bs58'
const networkUrl = "https://solana-mainnet.g.alchemy.com/v2/QlAFXUZhGG-CoVy9r6vYAbsA7iiDnA9-"
// Loads the private key in .env
const privateKey = Keypair.fromSecretKey(
    // @ts-ignore
  bs58.decode(process.env.private_key)
  ,{}
);
// @ts-ignore
const wallet = new Wallet(privateKey);

// Starts a solana web3 connection to an RPC endpoint
const connection = new Connection(networkUrl, utils.defaultCommitment());
setTimeout(async function(){
// Airdrop some SOL to your wallet
//await connection.requestAirdrop(wallet.publicKey, 100000000);

// Loads the SDK exchange singleton. This can take up to 10 seconds...
await Exchange.load(
  [assets.Asset.SOL, assets.Asset.ETH, assets.Asset.BTC ], // Can be one or more depending on what you wish to trade
  new PublicKey("ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD"),
  Network.MAINNET,
  // @ts-ignore
  connection,
  utils.defaultCommitment(),
  undefined, // Exchange wallet can be ignored for normal clients.
  0, // ThrottleMs - increase if you are running into rate limit issues on startup.
  undefined // Callback - See below for more details.
);
//utils.displayState();
// Load the user SDK client.
// Note that this client is active for the same assets you passed into Exchange.load() earlier
const client = await Client.load(
  // @ts-ignore
    connection,
    wallet, // Use the loaded wallet.
    utils.defaultCommitment(),
    undefined // Callback - See below for more details.
  );
  while (true){
    let random = Math.random() 
    if (random < 0.05){
      await client.cancelAllOrders()
    }
    let diffexps: any = []
    var funding: any = {}
    var marks: any = {}
    var futs: any = {}
    var goodopts: any = {}
    goodopts['BTC'] = []
    goodopts['SOL'] = []
    goodopts['ETH'] = []
    futs['BTC'] = []
    futs['SOL'] = []
    futs['ETH'] = []
  var bal = 0;
  var marginAccountState = client.getMarginAccountState(assets.Asset.SOL);
  bal+=marginAccountState.availableBalanceInitial

   //console.log('perps')
   i = 137
   while (true){
   try {
    bal = 0
    var marginAccountState = client.getMarginAccountState(assets.Asset.SOL);
    bal+=marginAccountState.availableBalanceInitial
    
    console.log(bal)
   var asset = assets.Asset.SOL;
   // funding['SOL'] =( Decimal.fromAnchorDecimal( Exchange.getGreeks(asset).perpFundingDelta) ).toNumber() / 1000000000000
   //console.log(funding)
       await Exchange.updateOrderbook(asset, i);
       await client.updateState();
       let oo = (client.getOrders(asset));

       var { asks, bids } = Exchange.getOrderbook(asset, i);
       await client.updateState(asset);
       let bs = 0 
       let as = 0
       let mybids: any = []
       let myasks: any = []
       let h = 0 
       let l = 9999999999
       let wb : any 
       let wa: any
       for (var o of oo){
        if (o.side == 0 ){

          mybids.push(o)
          bs++
          if (o.price > h){
            h = o.price 
            wb = o
          }
        }
        else if (o.side == 1){
          as++
          myasks.push(o)
          if (o.price<  l){
            l = o.price 
            wa = o
          }
        }
       }
       let c = 0
       for (var o3 of myasks.reverse()){
        if (c > 1){
          try {
          //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.ASK)
            } catch (err){
console.log(err)
            }
        }
        c++
       }
       c = 0
       for (var o3 of mybids.reverse()){
        if (c > 1){
          try {
          //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.BID)
            } catch (err){

              console.log(err)
            }
        }
        c++
       }
       try {
        try {
          var count = myasks.length
          let tbids: any = []
          var argh = 0
          for (var aa of bids){
            if (argh < 4){
            tbids.push(aa.price)
            }
            argh++
          }
          argh = 0
          let tasks: any = []
          for (var aa of asks){
            if (argh < 4){
              tasks.push(aa.price)
              }
              argh++
                      }
          for (var a of myasks){
            count--
            if (!tasks.includes(a.price)){
              try {
              client.cancelOrder(asset,Exchange.getMarket(asset, i).address, a.orderId, types.Side.ASK)
              } catch (err){
  
              }
            }
          }
          var count = mybids.length
            for (var b of mybids){
              
            count--
            if (!tbids.includes(b.price)){
              try {
              client.cancelOrder(asset,Exchange.getMarket(asset, i).address, b.orderId, types.Side.BID)
            } catch (err){
                
            }
          }
        }
      } catch (err){
        
      }
       console.log(as)
       console.log(bs)
     var pos = 
       client.getMarginPositions(asset)
       let tsize = 0
     for (var p of pos){
       if (p['marketIndex'] == 137){
         tsize+=(p.size)
       }
     }
     console.log(tsize)
     if (tsize >= 0 && as <= 3){
      var { asks, bids } = Exchange.getOrderbook(asset, i);
      await client.updateState(asset);
       // only short

     client.placeOrder(
      assets.Asset.SOL,
      137,
      utils.convertDecimalToNativeInteger(asks[0].price),//
      utils.convertDecimalToNativeLotSize(1.6),
      types.Side.ASK,
      types.OrderType.POSTONLY
    );
    client.placeOrder(
     assets.Asset.SOL,
     137,
     utils.convertDecimalToNativeInteger(asks[0].price+0.001),//
     utils.convertDecimalToNativeLotSize(5),
     types.Side.ASK,
     types.OrderType.POSTONLY
   );
   client.placeOrder(
    assets.Asset.SOL,
    137,
    utils.convertDecimalToNativeInteger(asks[0].price+0.002),//
    utils.convertDecimalToNativeLotSize(5),
    types.Side.ASK,
    types.OrderType.POSTONLY
  );
    if (bs <= 1){

    await client.updateState(asset);
    client.placeOrder(
     assets.Asset.SOL,
     137,
     utils.convertDecimalToNativeInteger(bids[0].price),//
     utils.convertDecimalToNativeLotSize(3),
     types.Side.BID,
     types.OrderType.POSTONLY
   );
    }

     }
     else if (tsize <= 0 && bs <= 3){ // only long
      var { asks, bids } = Exchange.getOrderbook(asset, i);
      await client.updateState(asset);
       client.placeOrder(
        assets.Asset.SOL,
        137,
        utils.convertDecimalToNativeInteger(bids[0].price),//
        utils.convertDecimalToNativeLotSize(3),
        types.Side.BID,
        types.OrderType.POSTONLY
      );

      client.placeOrder(
        asset,
        137,
        utils.convertDecimalToNativeInteger(bids[0].price-0.002),//
        utils.convertDecimalToNativeLotSize(0.036),
        types.Side.BID,
        types.OrderType.POSTONLY
      );
      

      client.placeOrder(
        asset,
        137,
        utils.convertDecimalToNativeInteger(bids[0].price-0.001),//
        utils.convertDecimalToNativeLotSize(0.036),
        types.Side.BID,
        types.OrderType.POSTONLY
      );
      if (as <= 1){

      client.placeOrder(
        assets.Asset.SOL,
        137,
        utils.convertDecimalToNativeInteger(asks[0].price),//
        utils.convertDecimalToNativeLotSize(0.175),
        types.Side.ASK,
        types.OrderType.POSTONLY
      );
      }
     }
     if (tsize == 0 && (as == 0 || bs == 0)){ //init
      if (as <= 1){

      var { asks, bids } = Exchange.getOrderbook(asset, i);
      await client.updateState(asset);
     client.placeOrder(
      assets.Asset.SOL,
      137,
      utils.convertDecimalToNativeInteger(asks[0].price),//
      utils.convertDecimalToNativeLotSize(0.14),
      types.Side.ASK,
      types.OrderType.POSTONLY
    );
     }
  
      var { asks, bids } = Exchange.getOrderbook(asset, i);
      if (bs <= 1){

      await client.updateState(asset);
       client.placeOrder(
        assets.Asset.SOL,
        137,
        utils.convertDecimalToNativeInteger(bids[0].price),//
        utils.convertDecimalToNativeLotSize(0.14),
        types.Side.BID,
        types.OrderType.POSTONLY
      );
       }
  
     }
   //console.log(Math.round(leverage) + 'x')
     }
       catch(err){
        console.log(err)   
       }
       try {
        bal = 0
        var marginAccountState = client.getMarginAccountState(assets.Asset.ETH);
        bal+=marginAccountState.availableBalanceInitial
        
        console.log(bal)
       var asset = assets.Asset.ETH;
       // funding['SOL'] =( Decimal.fromAnchorDecimal( Exchange.getGreeks(asset).perpFundingDelta) ).toNumber() / 1000000000000
       //console.log(funding)
           await Exchange.updateOrderbook(asset, i);
           await client.updateState();
           let oo = (client.getOrders(asset));

       var { asks, bids } = Exchange.getOrderbook(asset, i);
       await client.updateState(asset);
           let bs = 0 
           let as = 0
           let mybids: any = []
           let myasks: any = []
           let h = 0 
           let l = 9999999999
           let wb : any 
           let wa: any
           for (var o of oo){
            if (o.side == 0 ){
    
              mybids.push(o)
              bs++
              if (o.price > h){
                h = o.price 
                wb = o
              }
            }
            else if (o.side == 1){
              as++
              myasks.push(o)
              if (o.price<  l){
                l = o.price 
                wa = o
              }
            }
           }
           let c = 0
           for (var o3 of myasks.reverse()){
            if (c > 1){
              try {
              //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.ASK)
                } catch (err){
    console.log(err)
                }
            }
            c++
           }
           c = 0
           for (var o3 of mybids.reverse()){
            if (c > 1){
              try {
              //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.BID)
                } catch (err){
    
                  console.log(err)
                }
            }
            c++
           }
           var { asks, bids } = Exchange.getOrderbook(asset, i);
           await client.updateState(asset);
           try {
            var count = myasks.length
            let tbids: any = []
            var argh = 0
            for (var aa of bids){
              if (argh < 4){
              tbids.push(aa.price)
              }
              argh++
            }
            argh = 0
            let tasks: any = []
            for (var aa of asks){
              if (argh < 4){
                tasks.push(aa.price)
                }
                argh++
                        }
            for (var a of myasks){
              count--
              if (!tasks.includes(a.price)){
                try {
                client.cancelOrder(asset,Exchange.getMarket(asset, i).address, a.orderId, types.Side.ASK)
                } catch (err){
    
                }
              }
            }
            var count = mybids.length
              for (var b of mybids){
                
              count--
              if (!tbids.includes(b.price)){
                try {
                client.cancelOrder(asset,Exchange.getMarket(asset, i).address, b.orderId, types.Side.BID)
              } catch (err){
                  
              }
            }
          }
        } catch (err){
          
        }
           console.log(as)
           console.log(bs)
         var pos = 
           client.getMarginPositions(asset)
           let tsize = 0
         for (var p of pos){
           if (p['marketIndex'] == 137){
             tsize+=(p.size)
           }
         }
         console.log(tsize)
         if (tsize >= 0 && as <= 3){
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           // only short        
             if (bs <= 1){

           await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.019),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
         }
          if (as <= 2){

         client.placeOrder(
          asset,
          137,
          utils.convertDecimalToNativeInteger(asks[0].price),//
          utils.convertDecimalToNativeLotSize(0.02),
          types.Side.ASK,
          types.OrderType.POSTONLY
          
        );

    client.placeOrder(
      asset,
      137,
      utils.convertDecimalToNativeInteger(asks[0].price+0.001),//
      utils.convertDecimalToNativeLotSize(0.029),
      types.Side.ASK,
      types.OrderType.POSTONLY
    );
    client.placeOrder(
      asset,
      137,
     utils.convertDecimalToNativeInteger(asks[0].price+0.002),//
     utils.convertDecimalToNativeLotSize(0.029),
     types.Side.ASK,
     types.OrderType.POSTONLY
   );
         }
         }
         else if (tsize <= 0 && bs <= 3){ // only long
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.026),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
          
          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price-0.002),//
            utils.convertDecimalToNativeLotSize(0.026),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
          

          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price-0.001),//
            utils.convertDecimalToNativeLotSize(0.026),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
                    if (as <= 1){
      
          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(asks[0].price),//
            utils.convertDecimalToNativeLotSize(0.028),
            types.Side.ASK,
            types.OrderType.POSTONLY
          );
          }
         }
         if (tsize == 0 && (as == 0 || bs == 0)){ //init
    
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
          if (as <= 1){
         client.placeOrder(
          asset,
          137,
          utils.convertDecimalToNativeInteger(asks[0].price),//
          utils.convertDecimalToNativeLotSize(0.028),
          types.Side.ASK,
          types.OrderType.POSTONLY
        );
         }
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.028),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
      
         }
       //console.log(Math.round(leverage) + 'x')
         }
         catch(err){
          console.log(err)   
         }
        }
        catch(err){
         console.log(err)   
        }

       try {
        bal = 0
        var marginAccountState = client.getMarginAccountState(assets.Asset.BTC);
        bal+=marginAccountState.availableBalanceInitial
        
        console.log(bal)
       var asset = assets.Asset.BTC;
       // funding['SOL'] =( Decimal.fromAnchorDecimal( Exchange.getGreeks(asset).perpFundingDelta) ).toNumber() / 1000000000000
       //console.log(funding)
           await Exchange.updateOrderbook(asset, i);
           await client.updateState();
           let oo = (client.getOrders(asset));

       var { asks, bids } = Exchange.getOrderbook(asset, i);
       await client.updateState(asset);
           let bs = 0 
           let as = 0
           let mybids: any = []
           let myasks: any = []
           let h = 0 
           let l = 9999999999
           let wb : any 
           let wa: any
           for (var o of oo){
            if (o.side == 0 ){
    
              mybids.push(o)
              bs++
              if (o.price > h){
                h = o.price 
                wb = o
              }
            }
            else if (o.side == 1){
              as++
              myasks.push(o)
              if (o.price<  l){
                l = o.price 
                wa = o
              }
            }
           }
           let c = 0
           for (var o3 of myasks.reverse()){
            if (c > 1){
              try {
              //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.ASK)
                } catch (err){
    console.log(err)
                }
            }
            c++
           }
           c = 0
           for (var o3 of mybids.reverse()){
            if (c > 1){
              try {
              //  client.cancelOrder(asset,Exchange.getMarket(asset, i).address, o3.orderId, types.Side.BID)
                } catch (err){
    
                  console.log(err)
                }
            }
            c++
           }
           var { asks, bids } = Exchange.getOrderbook(asset, i);
           await client.updateState(asset);
           try {
            var count = myasks.length
            let tbids: any = []
            var argh = 0
            for (var aa of bids){
              if (argh < 4){
              tbids.push(aa.price)
              }
              argh++
            }
            argh = 0
            let tasks: any = []
            for (var aa of asks){
              if (argh < 4){
                tasks.push(aa.price)
                }
                argh++
                        }
            for (var a of myasks){
              count--
              if (!tasks.includes(a.price)){
                try {
                client.cancelOrder(asset,Exchange.getMarket(asset, i).address, a.orderId, types.Side.ASK)
                } catch (err){
    
                }
              }
            }
            var count = mybids.length
              for (var b of mybids){
                
              count--
              if (!tbids.includes(b.price)){
                try {
                client.cancelOrder(asset,Exchange.getMarket(asset, i).address, b.orderId, types.Side.BID)
              } catch (err){
                  
              }
            }
          }
        } catch (err){
          
        }
           console.log(as)
           console.log(bs)
         var pos = 
           client.getMarginPositions(asset)
           let tsize = 0
         for (var p of pos){
           if (p['marketIndex'] == 137){
             tsize+=(p.size)
           }
         }
         console.log(tsize)
         if (tsize >= 0 && as <= 3){
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           // only short        
             if (bs <= 1){

           await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
         }
          if (as <= 2){

         client.placeOrder(
          asset,
          137,
          utils.convertDecimalToNativeInteger(asks[0].price),//
          utils.convertDecimalToNativeLotSize(0.003),
          types.Side.ASK,
          types.OrderType.POSTONLY
          
        );

    client.placeOrder(
      asset,
      137,
      utils.convertDecimalToNativeInteger(asks[0].price+0.001),//
      utils.convertDecimalToNativeLotSize(0.004),
      types.Side.ASK,
      types.OrderType.POSTONLY
    );
    client.placeOrder(
      asset,
      137,
     utils.convertDecimalToNativeInteger(asks[0].price+0.002),//
     utils.convertDecimalToNativeLotSize(0.004),
     types.Side.ASK,
     types.OrderType.POSTONLY
   );
         }
         }
         else if (tsize <= 0 && bs <= 3){ // only long
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
          
          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price-0.002),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
          

          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price-0.001),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
                    if (as <= 1){
      
          client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(asks[0].price),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.ASK,
            types.OrderType.POSTONLY
          );
          }
         }
         if (tsize == 0 && (as == 0 || bs == 0)){ //init
    
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
          if (as <= 1){
         client.placeOrder(
          asset,
          137,
          utils.convertDecimalToNativeInteger(asks[0].price),//
          utils.convertDecimalToNativeLotSize(0.002),
          types.Side.ASK,
          types.OrderType.POSTONLY
        );
         }
          var { asks, bids } = Exchange.getOrderbook(asset, i);
          await client.updateState(asset);
           client.placeOrder(
            asset,
            137,
            utils.convertDecimalToNativeInteger(bids[0].price),//
            utils.convertDecimalToNativeLotSize(0.002),
            types.Side.BID,
            types.OrderType.POSTONLY
          );
      
         }
       //console.log(Math.round(leverage) + 'x')
         }
         catch(err){
          console.log(err)   
         }
      }
       try {
       var asset = assets.Asset.BTC;
       funding['BTC']  =( Decimal.fromAnchorDecimal( Exchange.getGreeks(asset).perpFundingDelta) ).toNumber() / 1000000000000
       //console.log(funding)
       await Exchange.updateOrderbook(asset, i);
       var { asks, bids } = Exchange.getOrderbook(asset, i);
     
       marks['BTC'] = Exchange.getMarkPrice(asset, i)
       await client.updateState(asset);
       var pos = 
       client.getMarginPositions(asset)
     for (var p of pos){
       if (p['marketIndex'] == 137){
         //console.log(p)
       }
     }
     

   var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
   //console.log(Math.round(leverage) + 'x')
     }
       catch(err){
           
       }
       try {
       var asset = assets.Asset.ETH;
       funding['ETH'] =( Decimal.fromAnchorDecimal( Exchange.getGreeks(asset).perpFundingDelta) ).toNumber() / 1000000000000
        //console.log(funding)
       await Exchange.updateOrderbook(asset, i);
       var { asks, bids } = Exchange.getOrderbook(asset, i);
     
       marks['ETH'] = Exchange.getMarkPrice(asset, i)
       await client.updateState(asset);
       var pos = 
       client.getMarginPositions(asset)
     for (var p of pos){
       if (p['marketIndex'] == 137){
         //console.log(p)
       }
     }
     

   var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
   //console.log(Math.round(leverage) + 'x')
     }
       catch(err){
           
       }
       
  for (var i = 0 ; i <= 21; i++){
    try {
    var asset = assets.Asset.SOL;
    let exps = ([Exchange.getGreeks(asset).retreatExpirationTimestamp[0].toNumber(),Exchange.getGreeks(asset).retreatExpirationTimestamp[1].toNumber()] 
    )
    let now = new Date().getTime() 
     diffexps = [(exps[0] - now / 1000) / (24 * 60 * 60 * 365), (exps[1] - now / 1000) / (24 * 60 * 60 * 365)]
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
      // Check mark prices for the product.
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10){
      wat = 'put'
    }
    console.log(marks['SOL'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat)
    var optimistic = bs.blackScholes(marks['SOL'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
     console.log(optimistic)
     console.log(leverage)
    if (leverage > 10 && optimistic > asks[0].price){
      goodopts['SOL'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log((Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000))
   
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
 
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10){
      wat = 'put'
    }
    var optimistic = bs.blackScholes(marks['BTC'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
    if (leverage > 10 && optimistic > asks[0].price){
            goodopts['BTC'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log(Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000)
   
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
    // Place an order in cross with offers to get a position.
    
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10){
      wat = 'put'
    }
    var optimistic = bs.blackScholes(marks['ETH'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
    if (leverage > 10 && optimistic > asks[0].price){
    goodopts['ETH'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log(Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000)
    } catch (err){
      console.log(err)
    }
        
  
  }
 var i = 22

  try {
  //console.log('fut1')
  var asset = assets.Asset.SOL;
  
   //console.log(diffexps)
      await Exchange.updateOrderbook(asset, i);
      var { asks, bids } = Exchange.getOrderbook(asset, i);
   //console.log(asks,bids)
   if (asks.length == 0 ){
    asks = bids
   }
      futs['SOL'].push(((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
      var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
      //console.log(Math.round(leverage) + 'x')
     
      var asset = assets.Asset.BTC;
      await Exchange.updateOrderbook(asset, i);
      var { asks, bids } = Exchange.getOrderbook(asset, i);
      if (asks.length == 0 ){
        asks = bids
       }
       if (bids.length == 0 ){
        bids = asks
       }
       try {
      futs['BTC'] .push(((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
      var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
      //console.log(Math.round(leverage) + 'x')
       } catch (err){

       }
      var asset = assets.Asset.ETH;
      await Exchange.updateOrderbook(asset, i);
      var { asks, bids } = Exchange.getOrderbook(asset, i);
      if (asks.length == 0 ){
        asks = bids
       }
       if (bids.length == 0 ){
        bids = asks
       }
       try {
      futs['ETH'].push(((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
      var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
      //console.log(Math.round(leverage) + 'x')
       } catch (err){
        
       }
  } catch (err){
    //console.log(err)
  } 
  
  for (var i = 23 ; i <= 44; i++){
    try {
    var asset = assets.Asset.SOL;
   
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
  
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10 + 23){
      wat = 'put'
    }
    var optimistic = bs.blackScholes(marks['SOL'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
    if (leverage > 10 && optimistic > asks[0].price){
    goodopts['SOL'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log(Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000)
   
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
  
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10 + 23){
      wat = 'put'
    }
    var optimistic = bs.blackScholes(marks['BTC'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
    if (leverage > 10 && optimistic > asks[0].price){
    goodopts['BTC'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log(Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000)
   
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
 
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price
    var wat = 'call'
    if (i > 10 + 23){
      wat = 'put'
    }
    var optimistic = bs.blackScholes(marks['ETH'], 
    Exchange.getMarket(asset, i).strike, 
    diffexps[0],
     Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000, 
     // @ts-ignore
     .08, wat);
    if (leverage > 10 && optimistic > asks[0].price){
    goodopts['ETH'].push([i, leverage, asks[0].price, bids[0].price])
    }
    //console.log(Math.round(leverage) + 'x')
    //console.log(Decimal.fromAnchorDecimal( (Exchange.getGreeks(asset).productGreeks[i].volatility)).toNumber() / 1000000000000)
    } catch (err){
     // //console.log(err)
    }
  } 
var i = 45
//console.log('fut2')
try{
var asset = assets.Asset.SOL;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
    if (asks.length == 0 ){
      asks = bids
     }
     if (bids.length == 0 ){
      bids = asks
     }
    futs['SOL'].push(((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
    //console.log(Math.round(leverage) + 'x')
}
catch(err){
    
}
try {
    var asset = assets.Asset.BTC;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
    if (asks.length == 0 ){
      asks = bids
     }
     if (bids.length == 0 ){
      bids = asks
     }
    futs['BTC'].push(((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
    //console.log(Math.round(leverage) + 'x')

}
    catch(err){
        
    }
    try {
    var asset = assets.Asset.ETH;
    await Exchange.updateOrderbook(asset, i);
    var { asks, bids } = Exchange.getOrderbook(asset, i);
    if (asks.length == 0 ){
      asks = bids
     }
       if (bids.length == 0 ){
        bids = asks
       }
    futs['ETH'].push (((asks[0].price || bids[0].price) + (asks[0].price || bids[0].price)) / 2)
    var leverage = Exchange.getMarkPrice(asset, i) / bids[0].price || asks[0].price
    //console.log(Math.round(leverage) + 'x')

}
    catch(err){
        
    }
    //console.log(futs)
    var diffs: any = {}
    diffs['SOL'] = []
    diffs['BTC'] = []
    diffs['ETH'] = []

    for (var key of Object.keys(futs)){
      for (var item in futs[key]){
        // if fut 10k and perps 9k, negative, buy
        diffs[key].push((( futs[key][item] / marks[key]  - 1) / diffexps[item]) / 365)
      }
    }
    //console.log(diffs)
    var t = 0 
    var c = 0 
    for (var key2 in funding) {
      t += Math.abs( funding[key2] )
      c += 1
    }
    for (var key2 in diffs) {
      for (var item in diffs[key2]){
        t += Math.abs( diffs[key2][item] )
        c += 1
      }
    }
    var avg = t / c
     //console.log(avg)
     t = 0 
     c = 0
     let wanted: any = {}
     for (var key2 in funding) {
       if(Math.abs(funding[key2]) > avg){
         t += Math.abs( funding[key2] )
         wanted[key2] = funding[key2]
         c += 1
       }
     }
     for (var key2 in diffs) {
      for (var item in diffs[key2]){
        if(Math.abs(diffs[key2][item]) > avg){

        t += Math.abs( diffs[key2][item] )
        wanted[key2+'-'+item.toString()] = diffs[key2][item] 

        c += 1
        }
      }
    }
     avg = t / c
     let relative: any = {}
     for (var key2 in wanted) {
       relative[key2] = parseFloat((((wanted[key2] / avg * 5) * bal) / marks[key2.split('-')[0]]).toFixed(3))
     }
     console.log(relative)
     console.log(goodopts)
    }
})