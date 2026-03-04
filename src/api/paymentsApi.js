import API from './axiosInstance';

export const createPaymentIntent = (type) => API.post('/Payments/create-intent', type, { headers: { 'Content-Type': 'application/json' } });
export const createAuctionHold = () => API.post('/Payments/create-auction-hold');
export const confirmPayment = (carId) => API.post(`/Payments/confirm-payment?carId=${carId}`);
export const createAuctionFee = (carId) => API.post(`/Payments/create-auction-fee/${carId}`);
export const confirmAuctionPayment = (carId) => API.post(`/Payments/confirm-auction-payment/${carId}`);
