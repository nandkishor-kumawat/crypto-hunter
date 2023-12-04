
export const getCoinList = async (currency: string) => {
    const url = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=${currency}&page=1&per_page=100&order=market_cap_desc`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a0d7520d7msh6b59dfba9d211a9p13c3ecjsnaa652021d674',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return await response.json();


};

export const getSingleCoin = async (id: string) => {
    const url = `https://coingecko.p.rapidapi.com/coins/${id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a0d7520d7msh6b59dfba9d211a9p13c3ecjsnaa652021d674',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return await response.json();

};

export const getHistoricalChart = async (id: string, days = 365, currency: string) => {

    const url = `https://coingecko.p.rapidapi.com/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a0d7520d7msh6b59dfba9d211a9p13c3ecjsnaa652021d674',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return await response.json();

};

export const getTrendingCoins = async (currency: string) => {
    const url = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    // const url2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a0d7520d7msh6b59dfba9d211a9p13c3ecjsnaa652021d674',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return await response.json();
};