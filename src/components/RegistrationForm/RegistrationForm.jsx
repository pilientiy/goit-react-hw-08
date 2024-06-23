import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import style from "./RegistrationForm.module.css";
import { toast } from "react-toastify";

const showToast = (message, type) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "success" ? "light" : "colored",
    type: type,
  });
};

const RegistrationForm = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .min(5, "too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      showToast("Registration successful!", "success");
      actions.resetForm();
    } catch (error) {
      showToast("Registration failed!", "error");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <div className={style.container}>
          <label htmlFor={nameId}>Name</label>
          <Field
            className={style.input}
            type="text"
            name="name"
            id={nameId}
            placeholder="Enter your name..."
          />
          <ErrorMessage className={style.errorMessage} name="name" component="p" />
        </div>
        <div className={style.container}>
          <label htmlFor={emailId}>Email</label>
          <Field
            className={style.input}
            type="email"
            name="email"
            id={emailId}
            placeholder="Enter your email..."
          />
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
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
