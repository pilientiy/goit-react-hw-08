import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/auth/selectors";
import style from "./ContactForm.module.css";

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

const ContactForm = () => {
  const dispatch = useDispatch();
  const formNameId = useId();
  const formNumberId = useId();
  const { name } = useSelector(selectUser);

  const contactsSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(9, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        showToast("Contact add successful!", "success");
      })
      .catch(() => {
        showToast("Contact add failed!", "error");
      });
    actions.resetForm();
  };

  return (
    <div className={style.container}>
      <p className={style.welcome}>Welcome, {name}</p>

      <Formik
        className={style.contactForm}
        validationSchema={contactsSchema}
        onSubmit={handleSubmit}
        initialValues={{ name: "", number: "" }}
      >
        <Form className={style.contactForm}>
          <div className={style.inputContainer}>
            <label htmlFor={formNameId}>Name</label>
            <Field
              className={style.nameInput}
              id={formNameId}
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <ErrorMessage className={style.error} name="name" component="span" />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor={formNumberId}>Number</label>
            <Field
              className={style.nameInput}
              id={formNumberId}
              type="tel"
              name="number"
              placeholder="Enter your phone number"
            />
            <ErrorMessage className={style.error} name="number" component="span" />
          </div>
          <button className={style.buttonSubmit} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
