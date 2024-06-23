import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import * as Yup from 'yup';
import style from './LoginForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type) => {
  toast(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === 'success' ? 'light' : 'colored',
    type: type,
  });
};

const LoginForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const contactsSchema = Yup.object().shape({
    email: Yup.string().min(7, 'Too Short!').max(30, 'Too Long!').required('Required!'),
    password: Yup.string().min(7, 'Too Short!').max(30, 'Too Long!').required('Required!'),
  });

  const handleSubmit = (values, action) => {
    const { email, password } = values;
    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => {
        showToast('Login successful!', 'success');
      })
      .catch(() => {
        showToast('Login failed!', 'error');
      });
    action.resetForm();
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} validationSchema={contactsSchema} onSubmit={handleSubmit}>
      <Form className={style.form}>
        <div className={style.container}>
          <label htmlFor={emailId}>Email</label>
          <Field className={style.input} type="email" name="email" id={emailId} placeholder="Enter your email..." />
          <ErrorMessage className={style.errorMessage} name="email" component="p" />
        </div>
        <div className={style.container}>
          <label htmlFor={passwordId}>Password</label>
          <Field
            className={style.input}
            type="password"
            name="password"
            id={passwordId}
            placeholder="Enter your password..."
          />
          <ErrorMessage className={style.errorMessage} name="password" component="p" />
        </div>
        <button className={style.buttonSub} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
