import React, { useEffect } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Esewacheckout() {

  const navigate=useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');
    console.log(data);

    const verifyPayment = async () => {
      try {
        const response = await axios.get('/esewapaymentverifyapi', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
          params: { data },
        });

        console.log(response.data);

        
          navigate('../order')
         
         
      } catch (error) {
        console.error('Error verifying payment:', error);
      }
    };

    verifyPayment();
  }, []);

  return <div>Esewacheckout</div>;
}
