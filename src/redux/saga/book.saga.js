import { put, takeLatest, select } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import { RESET_BOOK_CHANNEL, INITIALIZE_BOOK_CHANNEL } from "../action/types";
import { getSelectedPair } from "../selectors/tickerPair.selector";

function* bookListenerSaga() {
  const pair = yield select(getSelectedPair);
  if (pair) {
    yield put(
      send({
        method: "SUBSCRIBE",
        params: [`${pair}@bookTicker`],
        id: 2,
      })
    );
  }
}
function* bookResetSaga() {
  const pair = yield select(getSelectedPair);
  yield put(
    send({
      method: "UNSUBSCRIBE",
      params: [`${pair}@bookTicker`],
      id: 3,
    })
  );
}

export default function* bookSaga() {
  yield takeLatest(INITIALIZE_BOOK_CHANNEL, bookListenerSaga);
  yield takeLatest(RESET_BOOK_CHANNEL, bookResetSaga);
}
