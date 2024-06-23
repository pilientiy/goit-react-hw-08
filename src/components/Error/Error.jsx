import style from "./Error.module.css";
const Error = () => {
  return (
    <div>
      <p className={`${style.error} animate`}>
        Sorry, something went wrong, try again later!
      </p>
    </div>
  );
};
export default Error;