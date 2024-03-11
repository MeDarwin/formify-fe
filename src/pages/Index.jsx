import { createRef } from "react";
import { useDispatch } from "react-redux";
import { FAB } from "../components/FAB";
import { Modal } from "../components/Modal";
import { setAlert } from "../reducer/slices/alertMessageSlice";

/**
 * Form Card which shows title
 * @returns React Component
 */
const FormCard = () => {
  return (
    <div className="rounded-lg border border-violet-500 px-2 py-4 hover:cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-pink-500">
      <p className="text-primary">Form Title</p>
    </div>
  );
};

/**
 * Detail of the form for selection of choices
 * @returns React Component
 */
const FormDetail = () => {
  const dispatch = useDispatch();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => dispatch(setAlert({ type: "success", message: "Link copied to clipboard" })))
      .catch(() => dispatch(setAlert({ type: "error", message: "Error copying link" })));
    void 0;
  };

  return (
    <article className="mb-8">
      <span className="flex items-center gap-x-4">
        <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
        <h1 className="text-4xl text-pink-500 text-nowrap leading-none">Detail of Form X</h1>
      </span>
      <div className="card w-full md:w-3/4 mx-auto bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="card-title">
            Card title!{" "}
            <span
              className="badge badge-secondary hover:badge-outline hover:cursor-pointer hover:text-white"
              onClick={handleCopy}
            >
              Copy link 🔗
            </span>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <form>
            {[...new Array(5)].map((_, index) => (
              <label
                key={index}
                className="flex items-center gap-x-2 mb-3 hover:cursor-pointer hover:bg-primary-content hover:bg-opacity-50 rounded-full"
              >
                <input type="radio" name="selection" className="radio radio-primary radio-lg" />
                <span>Select {index + 1}</span>
              </label>
            ))}
          </form>
          <div className="card-actions flex-nowrap">
            <button className="btn btn-lg grow justify-center btn-success text-3xl hover:before:content-['save'] before:text-white line-clamp-6">
              ✅
            </button>
            <button className="btn btn-lg btn-outline justify-center btn-error text-3xl hover:before:content-['delete'] before:text-white line-clamp-6">
              💣
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * Home Page component, higher order component
 * @returns React Component
 */
export const Home = () => {
  const modalRef = createRef();

  return (
    <>
      <Modal modalRef={modalRef} />
      <FAB modalRef={modalRef} />
      {/* -------------------------------- FORM LIST ------------------------------- */}
      <article className="mb-8">
        <span className="flex items-center gap-x-4">
          <h1 className="text-4xl text-pink-500 text-nowrap leading-none">Your Created Form</h1>
          <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
        </span>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-x-4 gap-y-3 mt-3">
          {[...new Array(5)].map((_, index) => (
            <FormCard key={index} />
          ))}
        </div>
      </article>
      {/* -------------------------------- FORM LIST ------------------------------- */}

      {/* DIVIDER */}
      <div className="flex flex-col w-full">
        <div className="divider"></div>
      </div>
      {/* DIVIDER */}

      {/* ------------------------------- FORM DETAIL ------------------------------ */}
      <FormDetail />
      {/* ------------------------------- FORM DETAIL ------------------------------ */}
    </>
  );
};
