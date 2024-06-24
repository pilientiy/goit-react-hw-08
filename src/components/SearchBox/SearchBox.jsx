import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { setNameFilter } from "../../redux/filters/slice";
import { selectFilters } from "../../redux/filters/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilters);

  return (
    <div className={css.searchBox}>
      <p className={css.title}>Find contacts by name or phone number</p>
      <input
        className={css.searchBoxInput}
        type="text"
        value={filter}
        onChange={(evt) => dispatch(setNameFilter(evt.target.value))}
      />
    </div>
  );
}