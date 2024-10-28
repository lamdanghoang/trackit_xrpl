const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const xrp_scan_url = process.env.XRP_SCAN_URL || 'https://api.xrpscan.com'

exports.list_amendments = async () =>{
    const response = await axios.get(`${xrp_scan_url}/api/v1/amendments`);

    let resp = response.data.map((item) =>{
        return {
            amendment_id: item.amendment_id,
            introduced: item.introduced,
            name: item.name,
            enabled: item.enabled,
            majority: item.majority,
            supported: item.supported,
            count: item.count,
            threshold: item.threshold,
            validations: item.validations,
            enabled_on: item.enabled_on,
            tx_hash: item.tx_hash
        }
    })
    
    return resp;
}
