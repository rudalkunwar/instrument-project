const crypto = require('crypto');
const axios = require('axios');

async function verifyEsewaPayment(encodedData) {
    console.log("i am in verifyEsewaPayment");
    try {
        // Decode Base64 data
        let decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
        decodedData = JSON.parse(decodedData);
        
        console.log("decodedData");
        console.log(decodedData);

        // Prepare data for HMAC
        const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

        // Create HMAC hash
        const secretKey = process.env.ESEWA_SECRET_KEY;
        const hash = crypto
            .createHmac('sha256', secretKey)
            .update(data)
            .digest('base64');
        
        console.log('Generated Hash:', hash);
        console.log('Received Signature:', decodedData.signature);

        // // Verify the hash
        // if (hash !== decodedData.signature) {
        //     throw new Error('Invalid Info: Signature does not match');
        // }

        // // Prepare request options
        // const reqOptions = {
        //     url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // };

        // console.log('Request Options:', reqOptions);

        // Make the request to verify the transaction status
        // let response = await axios.request(reqOptions);

        // console.log('Response Status:', response.data.status);

        // // Validate the response
        // if (
        //     response.data.status !== 'COMPLETE' ||
        //     response.data.transaction_uuid !== decodedData.transaction_uuid ||
        //     Number(response.data.total_amount) !== Number(decodedData.total_amount)
        // ) {
        //     throw new Error('Invalid Info: Transaction details do not match');
        // }

        return { response: decodedData };
    } catch (error) {
        console.error('Error verifying eSewa payment:', error.message);
        throw error;
    }
}

module.exports = verifyEsewaPayment;
