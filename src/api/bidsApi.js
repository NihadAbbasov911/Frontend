import API from './axiosInstance';

export const createBid = (data) => API.post('/Bids', data);
export const getBidsByAuction = (auctionId) => API.get(`/Bids/auction/${auctionId}`);
