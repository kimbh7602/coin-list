import axios from 'axios'

export default {
    fetchCoinList(param) {
        const url = `https://api.coingecko.com/api/v3/coins/markets`
        return axios.get(url,
            {
                params: {
                    vs_currency: param.currency,
                    price_change_percentage: '1h,24h,7d',
                    per_page: param.per_page,
                    page: param.page,
                }
            }
        );
    },

    fetchCoinDetail(param) {
        const url = `https://api.coingecko.com/api/v3/coins/${param.id}`
        return axios.get(url,
            {
                params: {
                    market_data: true,
                }
            }
        );
    },

    fetchBookmarkList(param) {
        const url = `https://api.coingecko.com/api/v3/coins/markets`
        return axios.get(url,
            {
                params: {
                    vs_currency: param.currency,
                    price_change_percentage: '1h,24h,7d',
                    per_page: 250,
                    page: 1
                }
            }
        );
    },
}