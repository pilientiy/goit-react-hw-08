import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { setStatusFilter } from "../../redux/filters/slice";
import style from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(selectNameFilter);

  const handleFilter = (e) => {
    const query = e.target.value.trim();
    dispatch(setStatusFilter(query));
  };
  
  return (
    <div className={style.filter}>
      <label htmlFor="searchBox">Find contacts </label>
      <input
        className={style.filterInput}
        id="searchBox"
        type="text"
        value={filterQuery}
        onChange={handleFilter}
        placeholder="Enter name or number..."
      />
    </div>
  );
};
export default SearchBox;
