/* eslint-disable react/prop-types */

/**
 * initiatior (FAB) component
 * @param {{modalRef: React.RefObject<HTMLDialogElement>}} modalRef Ref for modal ref props
 * @returns React Component
 */
export const FAB = ({ modalRef }) => {
  return (
    <div className="fixed bottom-14 right-10">
      <button
        onClick={() => modalRef.current.showModal()}
        className="rounded-full box-content py-3 px-5 text-xl font-black btn btn-secondary text-white focus:outline-none leading-none hover:before:content-['Create_Form']"
      >
        +
      </button>
    </div>
  );
};
