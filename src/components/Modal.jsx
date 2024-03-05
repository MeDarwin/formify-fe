/* eslint-disable react/prop-types */

/**
 * To use modal, use the ref from createRef() in parent component.
 * Pass to Modal props.
 * Pass it to the initiator (FAB) component and dispatch showModal() method
 * @param {{modalRef: React.RefObject<HTMLDialogElement>}} modalRef Ref for modal ref props
 * @returns React Component
 */
export const Modal = ({ modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
