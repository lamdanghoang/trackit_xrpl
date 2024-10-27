const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const xrpl = require('xrpl');

const {get_ledger, list_transaction} = require('./services/ledger')
const { list_amendments } = require('./services/transactions')

dotenv.config();

const app = express();
const port = process.env.PORT || 2411;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/xrp', async (req, res) => {
    console.log("Connecting to testnet...")
    const client = new xrpl.Client('wss://s.devnet.rippletest.net:51233')
    await client.connect()

    const standby_wallet = xrpl.Wallet.fromSeed("sEdVd1vJvRcoXCmrx7SwY8g2bhaD35h")
    
    res.json(standby_wallet.classicAddress)  
});

app.get('/ledger', async (req, res) => {
  let resp = await get_ledger()
  
  res.json(resp)  
});

app.get('/transactions', async (req, res) => {
  let resp = await list_transaction()
  
  res.json(resp)  
});

app.get('/amendments', async (req, res) => {
  let resp = await list_amendments()
  
  res.json(resp)  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
