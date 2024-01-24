import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
const SearchFilter = () => {
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <div style={{display: "flex", flexDirection: 'row', gap: '12px', marginBottom: '19px'}}>
      <span>Search</span>
      <input type="text" value={filterValue} onChange={e => dispatch(setFilter(e.target.value))}/>
    </div>
  )
}

export default SearchFilter