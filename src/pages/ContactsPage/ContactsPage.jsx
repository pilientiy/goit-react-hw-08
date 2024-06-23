import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading } from '../../redux/contacts/selectors';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Loading from '../../components/Loading/Loading';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';
import SearchBox from '../../components/SearchBox/SearchBox';
import { toast } from 'react-toastify';
import style from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch(); 

  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    let success = true;
    dispatch(fetchContacts())
      .unwrap()
      .catch(() => {
        success = false;
      })
      .finally(() => {
        if (success) {
          showToast('Contacts loaded successfully!', 'success');
        } else {
          showToast('Oops, something went wrong!', 'error');
        }
      });
  }, [dispatch]);

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

  return (
    <div className={style.container}>
      <DocumentTitle title="Your Contacts" />
      <ContactForm />
      <SearchBox />
      {isLoading && <Loading />}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
