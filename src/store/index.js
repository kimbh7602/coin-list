import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import {getCoinList, addCoinList, getBookmarkList, getCoinDetail} from './type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinList: [],
    bookmarkList: [],
    coinDetail: {},
    currency: 'krw',
    per_page: 10,
    page: 1,
    page_type: 'normal',
    isLoading: false,
    detailCurrency: 'krw',
    toastObj: {
      isToastOpen: false,
      xPosition: 0,
      yPosition: 0,
      message: ''
    }
  },
  mutations: {
    setLoading(state) {
      state.isLoading = true;
    },

    setLoaded(state) {
      state.isLoading = false;
    },

    setParam(state, param) {
      state.currency = param.currency;
      state.per_page = param.per_page;
      state.page = param.page;
    },

    setPageType(state, param) {
      state.page_type = param;
    },

    setCurrency(state, param) {
      state.currency = param;
    },

    setPerPage(state, param) {
      state.per_page = param
    },

    setPage(state) {
      state.page = 1;
    },

    getCoinList(state, resp) {
      state.coinList = resp;
    },

    addCoinList(state, resp) {
      state.coinList = state.coinList.concat(resp);
    },

    addPage(state) {
      state.page = state.page+1;
    },

    setDetailCurrency(state, param) {
      state.detailCurrency = param;
    },

    addBookmark(state, coin) {
      state;
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      if(bookmarkList === null) {
        bookmarkList = [];
      }
      bookmarkList.push(coin);
      localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    },

    removeBookmark(state, coin) {
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      const idx = bookmarkList.findIndex((bookmark) => {
        return bookmark.id === coin.id;
      });
      if(idx > -1) {
        bookmarkList.splice(idx, 1);
      }

      const stateIdx = state.bookmarkList.findIndex((bookmark) => {
        return bookmark.id === coin.id;
      })
      if(stateIdx > -1) {
        state.bookmarkList.splice(stateIdx, 1);
      }
      localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    },

    getBookmarkList(state, bookmarkList) {
      state.bookmarkList = bookmarkList;
    },

    getCoinDetail(state, coin) {
      state.coinDetail = coin;
    },

    toastOpen(state, param) {
      state.toastObj = param;
    },

    toastClose(state) {
      state.toastObj.isToastOpen = false;
    },
  },
  actions: {
    async fetchCoinList({ commit }, param) {
      const resp = await api.fetchCoinList(param);
      let list = resp.data;
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      if(bookmarkList !== null) {
        bookmarkList.map((bookmark) => {
          list.map((coin) => {
            if(bookmark.id === coin.id || coin.isMarked) {
              coin.isMarked = true;
            }else {
              coin.isMarked = false;
            }
          })
        });
      }else {
        list.map((coin) => {
          coin.isMarked = false;
        })
      }
      commit(getCoinList, list);
    },

    async addCoinList({ commit }, param) {
      const resp = await api.fetchCoinList(param);
      let list = resp.data;
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      if(bookmarkList !== null) {
        bookmarkList.map((bookmark) => {
          list.map((coin) => {
            if(bookmark.id === coin.id || coin.isMarked) {
              coin.isMarked = true;
            }else {
              coin.isMarked = false;
            }
          })
        });
      }else {
        list.map((coin) => {
          coin.isMarked = false;
        })
      }
      commit(addCoinList, list);
    },

    async fetchBookmarkList({ commit }, param) {
      let resp = await api.fetchBookmarkList(param);
      let list = resp.data;
      let tempList = [];
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      if(bookmarkList !== null) {
        bookmarkList.map((bookmark) => {
          list.map((coin) => {
            if(bookmark.id === coin.id || coin.isMarked) {
              coin.isMarked = true;
              if(!tempList.includes(coin)) {
                tempList.push(coin);
              }
            }else {
              coin.isMarked = false;
            }
          })
        });
      }else {
        list.map((coin) => {
          coin.isMarked = false;
        })
      }
      commit(getBookmarkList, tempList);
    },

    async fetchCoinDetail({ commit }, param) {
      let resp = await api.fetchCoinDetail(param);
      let coin = resp.data;
      let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
      if(bookmarkList !== null) {
        bookmarkList.map((bookmark) => {
          if(bookmark.id === coin.id || coin.isMarked) {
            coin.isMarked = true;
          }else {
            coin.isMarked = false;
          }
        });
      }else {
        coin.isMarked = false;
      }
      commit(getCoinDetail, coin);
    }
  }
})
