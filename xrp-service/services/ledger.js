const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const xrp_scan_url = process.env.XRP_SCAN_URL || 'https://api.xrpscan.com'

exports.get_ledger = async () =>{
    const response = await axios.get(`${xrp_scan_url}/api/v1/ledgers`);
    
    return response.data;
}

exports.list_transaction = async () =>{
    const response = await axios.get(`${xrp_scan_url}/api/v1/ledger/91696847/transactions`);
    
    return response.data;
}