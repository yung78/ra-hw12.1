import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { changeSearchField, skillsRequest, skillsSuccess, skillsFailur, resetState } from '../app/searchSlice';
import { searchSkills } from '../app/searchSkills';

// watcher_1
function* watchChangeSearchSaga() {
  yield debounce(300, changeSearchField.type, handleChangeSearchSaga);
}

// worker_1
function* handleChangeSearchSaga(action) {
  if (action.payload) {
    yield put(skillsRequest(action.payload));
  } else {
    console.log('reset');
    yield put(resetState());
  }
}

// watcher_2
function* watchSearchSkillsSaga() {
  yield takeLatest(skillsRequest.type, handleSearchSkillsSaga);
}

// // worker_2
function* handleSearchSkillsSaga(action) {
  try {
    const data = yield retry(3, 1000, searchSkills, action.payload);
    yield put(skillsSuccess(data));
  } catch(err) {
    yield put(skillsFailur(err.message));
  }
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}
