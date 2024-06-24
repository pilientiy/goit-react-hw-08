import css from "./EditModal.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import { useState } from "react";
import ReactModal from "react-modal";

import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function EditModal({ id, name, number }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  ReactModal.setAppElement("#root");
  const dispatch = useDispatch();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Edit</button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <h3 className={css.modalTitle}>Edit contact</h3>

        <Formik
          initialValues={{
            name: `${name}`,
            number: ` ${number}`,
          }}
          validationSchema={userSchema}
          onSubmit={(values, actions) => {
            dispatch(editContact({ id: id, ...values }));
            actions.resetForm();
            setIsOpen(false);
          }}
        >
          <Form className={css.contactForm} autoComplete="off">
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
              <label htmlFor={numberFieldId}>Phone number</label>
              <Field
                className={css.fieldBox}
                type="text"
                name="number"
                id={numberFieldId}
              />
              <ErrorMessage
                name="number"
                component="span"
                className={css.errorMsgForm}
              />
            </div>
            <div className={css.modalBtns}>
              <button type="submit">Yes</button>
              <button onClick={closeModal}>No</button>
            </div>
          </Form>
        </Formik>
      </ReactModal>
    </div>
  );
}