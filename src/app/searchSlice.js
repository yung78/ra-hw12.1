import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export const searchSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    skillsRequest: (state) => {
      return {...state, loading: true, error: null,};
    },
    skillsFailur: (state, action) => {
      return {...state, loading: false, error: action.payload, };
    },
    skillsSuccess: (state, action) => {
      return {...state, items: action.payload, loading: false, error: null,};
    },
    changeSearchField: (state, action) => {
      return {...state, search: action.payload};
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { skillsRequest, skillsFailur, skillsSuccess, changeSearchField, resetState } = searchSlice.actions;
export default searchSlice.reducer;