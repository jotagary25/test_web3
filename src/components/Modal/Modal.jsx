import "./Modal.css";

const ContentDefault = () => <p>No content</p>;

const Modal = ({ Content = ContentDefault, setModal }) => {
  const closeModal = () => setModal(false);

  return (
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <Content />
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </div>
    </>
  );
};

export default Modal;
