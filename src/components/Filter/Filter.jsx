import { Input, Wrapper } from './Filter.css';
import { useDispatch, useSelector } from 'react-redux';
import { setReduxFilter } from 'redux/filterReducer';

const Filter = () => {
  const reduxFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setReduxFilter(e.target.value));
  };

  return (
    <Wrapper>
      <h2>Find contacts by name</h2>
      <Input
        type="text"
        name="filter"
        value={reduxFilter}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default Filter;
