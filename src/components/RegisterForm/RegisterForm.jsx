import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(26, "Too Long!")
    .required("Required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values, action) => {
          dispatch(register(values));
          action.resetForm();
        }}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.formBox}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={css.fieldBox}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css.errorMsgForm}
            />
          </div>
          <div className={css.formBox}>
            <label htmlFor={emailFieldId}>Email</label>
            <Field
              className={css.fieldBox}
              type="text"
              name="email"
              id={emailFieldId}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={css.errorMsgForm}
            />
          </div>
          <div className={css.formBox}>
            <label htmlFor={passwordFieldId}>Password</label>
            <Field
              className={css.fieldBox}
              type="text"
              name="password"
              id={passwordFieldId}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMsgForm}
            />
          </div>
          <button className={css.submitBtn} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}