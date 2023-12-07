import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../app/searchSlice';

export default function Skills() {
  const state = useSelector((state) => state.search);
  console.log(state);
  const dispatch = useDispatch();
  const hasQuery = state.search.trim() !== '';
  
  const handleSearch = evt => {
    const {value} = evt.target;
    dispatch(changeSearchField(value));
  };

  return (
    <div
      className='w-1/3 h-screen'
    >
      <div 
        className='w-full mt-10'>
        <input
          type="search"
          value={state.search}
          onChange={handleSearch}
          className='w-full h-8 px-3 rounded-xl  border-gray-500 border-2 focus:outline-0'
        />
      </div>
      {!hasQuery && <div className='w-full flex justify-center mt-5 text-center'>Type something to search...</div>}
      {hasQuery && state.loading && <div className='w-full flex justify-center mt-5 text-center'>searching...</div>}
      {state.error ? (
        <div className='w-full flex justify-center mt-5 text-center'>Error occured: {state.error}</div>
      ) : (
        <ul className='w-full flex justify-center mt-5 text-center'>
          {state.items.map(el => <li key={el.id}>{el.name}</li>)}
        </ul>
      )}
    </div>
  );
}