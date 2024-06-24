import css from "./Contact.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

export default function Contact({ contact: { id, name, number } }) {
  return (
    <div className={css.contactItem}>
      <div className={css.contactInfo}>
        <p>
          <IoMdPerson className={css.contactIcon} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.contactIcon} />
          {number}
        </p>
      </div>
      <div className={css.contactBtns}>
        <EditModal id={id} name={name} number={number} />
        <DeleteModal id={id} />
      </div>
    </div>
  );
}

