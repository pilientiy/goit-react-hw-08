import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css'

export default function Loader() {
    return (
        <div className={css.loader}>
             <BallTriangle
  height={300}
  width={300}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
        </div>       
    )
}