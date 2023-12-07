import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { changeSearchField, skillsRequest, skillsSuccess, skillsFailur, resetState } from '../app/searchSlice';
import { searchSkills } from '../app/searchSkills';

function filterChangeSearchAction({ type, payload }) {
  console.log(payload)
  return type === changeSearchField.type && payload.trim() !== ''
}

// watcher_1
function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker_1
function* handleChangeSearchSaga(action) {
  console.log('worker_1')
  yield put(skillsRequest(action.payload));
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
    yield put(skillsFailur(err.message))
  }
}


function filterResetAction({ type, payload }) {
  return type === changeSearchField.type && payload.trim() === ''
}

// watcer_0(home work)
function* watchResetSaga() {
  yield takeLatest(filterResetAction, handleResetSaga); //debounce(500, filterResetAction, handleResetSaga) - не помогло
}

// watcer_0(home work)
function* handleResetSaga() {
  console.log('reset');
  yield put(resetState());
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchResetSaga);
}
