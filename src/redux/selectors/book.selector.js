import { createSelector } from "reselect";
import memoizeOne from "memoize-one";
import _keys from "lodash/keys";
import _take from "lodash/take";

import { createDeepEqualSelector } from "./selector.helper";

export const getReducer = (state) => state.book || {};
export const getAsks = createSelector(getReducer, (book) => book.ask);
export const getBids = createSelector(getReducer, (book) => book.bid);

export const getSymbol = createSelector(getReducer, (book) => book.symbol);

export const getAskPrice = createSelector(getAsks, (asks) => {
  const askPrices = _keys(asks);
  return _take(askPrices.sort(), 20);
});

export const getBidPrice = createSelector(getBids, (bids) => {
  const bidPrices = _keys(bids);
  return _take(bidPrices.sort().reverse(), 20);
});

export const getAskData = createDeepEqualSelector(getAsks, (asks) =>
  memoizeOne((price) => (price ? asks[price] : null))
);

export const getBidData = createDeepEqualSelector(getBids, (bids) =>
  memoizeOne((price) => bids[price])
);
