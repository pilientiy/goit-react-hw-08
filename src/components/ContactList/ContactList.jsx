import React from "react";
import Contact from "../Contact/Contact";
import style from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={style.list}>
      {contacts.map((contact) => (
        <li className={style.listItem} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;