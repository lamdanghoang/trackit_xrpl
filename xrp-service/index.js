const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const xrpl = require('xrpl');

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
