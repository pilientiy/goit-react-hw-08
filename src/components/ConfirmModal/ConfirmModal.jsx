import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalWindow/slice";
import { deleteContact } from "../../redux/contacts/operations";
import style from "./ConfirmModal.module.css";
import {
  selectContactIdToDelete,
  selectIsModalOpen,
} from "../../redux/modalWindow/selectors";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

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

const ConfirmModal = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const contactIdToDelete = useSelector(selectContactIdToDelete);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    if (contactIdToDelete) {
      dispatch(deleteContact(contactIdToDelete))
        .unwrap()
        .then(() => {
          showToast("Contact  deleted successfully!", "success");
        })
        .catch(() => {
          showToast("Contact  deleted failed!", "error");
        });
      dispatch(closeModal());
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2 className={style.title}>
        Are you sure you want to delete this contact?
      </h2>
      <div className={style.buttons}>
        <button onClick={handleConfirm} className={style.buttonConfirm}>
          Yes
        </button>
        <button onClick={handleClose} className={style.buttonCancel}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;