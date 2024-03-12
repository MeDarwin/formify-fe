/* eslint-disable react/prop-types */

/**
 * To use modal, use the ref from createRef() in parent component.
 * Pass to Modal props.
 * Pass it to the initiator (FAB) component and dispatch showModal() method
 * @param {{
 * modalRef: React.RefObject<HTMLDialogElement>,
 * title: string,
 * handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
 * }} param
 * @returns React Component
 */
export const Modal = ({ modalRef, title, handleSubmit, children }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box md:max-w-4xl">
        <h3 className="font-bold text-xl">{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-y-3 flex-col [&>*]:w-full">{children}</div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
