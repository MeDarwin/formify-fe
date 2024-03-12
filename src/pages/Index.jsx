/* eslint-disable react/prop-types */
import { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { ErrorField } from "../components/ErrorField";
import { FAB } from "../components/FAB";
import { Modal } from "../components/Modal";
import {
  useCreateFormMutation,
  useGetAllFormsQuery,
  useGetBySlugQuery,
} from "../reducer/services/formApi";
import { setAlert } from "../reducer/slices/alertMessageSlice";

/**
 * Form when creating form modal
 * @param {{modalRef: React.RefObject<HTMLDialogElement>}} param
 * @returns React element to create forms
 */
const FormModal = ({ modalRef }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.alertMessage?.errors);
  const [data, setData] = useState({
    name: null,
    slug: null,
    description: null,
    limit_one_response: false,
  });
  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();

  const handleSubmit = (/** @type {React.FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault();
    createForm(data)
      .unwrap()
      .then(({ message }) => {
        dispatch(setAlert({ type: "success", message }));
        e.target.reset();
      })
      .catch((err) => {
        dispatch(setAlert({ type: "error", ...err }));
      });
  };

  const handleChange = (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal modalRef={modalRef} title="Create Form" handleSubmit={handleSubmit}>
      {/* NAME INPUT */}
      <label className="label">
        <span className="label-text w-4/12">
          <p className="required">Form name</p>
          <ErrorField className="gap-0" message={errors?.name} />
        </span>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          className="input input-bordered w-full"
        />
      </label>
      {/* NAME INPUT */}
      {/* SLUG INPUT */}
      <label className="label">
        <span className="label-text w-4/12">
          <p className="required">Form slug</p>
          <ErrorField message={errors?.slug} />
        </span>
        <input
          onChange={handleChange}
          type="text"
          name="slug"
          className="input input-bordered w-full"
        />
      </label>
      {/* SLUG INPUT */}
      {/* DESCRIPTION INPUT */}
      <label className="label">
        <span className="label-text w-4/12">
          Form description
          <ErrorField message={errors?.description} />
        </span>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          className="input input-bordered w-full"
        />
      </label>
      {/* DESCRIPTION INPUT */}
      {/* ALLOWED DOMAINS */}
      <label className="label">
        <span className="label-text w-4/12">
          Allowed domains
          <p className="text-gray-400 text-xs">Separated by coma (&ldquo;, &rdquo;)</p>
          <ErrorField message={errors?.allowed_domains} />
        </span>
        <input
          onChange={handleChange}
          type="text"
          name="allowed_domains"
          className="input input-bordered w-full"
          placeholder="example.com, www.example.id"
        />
      </label>
      {/* ALLOWED DOMAINS */}
      {/* LIMIT ONE RESPONSE */}
      <div className="flex">
        <span className="label-text w-4/12">
          Limit to one response
          <ErrorField message={errors?.limit_one_response} />
        </span>
        <div className="w-full [&>*]:border">
          <label className="hover:cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full ps-4 label gap-x-2 py-0 pe-0 mb-3">
            <span className="label-text">true</span>
            <input
              onChange={handleChange}
              value={true}
              type="radio"
              name="limit_one_response"
              className="radio radio-primary radio-lg"
            />
          </label>
          <label className="hover:cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full ps-4 label gap-x-2 py-0 pe-0">
            <span className="label-text">false</span>
            <input
              onChange={handleChange}
              value={false}
              type="radio"
              name="limit_one_response"
              className="radio radio-primary radio-lg"
              defaultChecked
            />
          </label>
        </div>
      </div>
      {/* LIMIT ONE RESPONSE */}

      <p className="label-text text-gray-400">
        note: <span className="required"></span> is required
      </p>

      <button type="submit" disabled={isCreating} className="btn btn-primary">
        Submit
      </button>
    </Modal>
  );
};

/**
 * Form Card which shows title
 * @returns React Component
 */
const FormCard = ({ form }) => {
  return (
    <Link
      to={`?slug=${form.slug}`}
      className="rounded-lg border border-violet-500 px-2 py-4 hover:cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-pink-500"
    >
      <p className="text-primary">{form?.name}</p>
    </Link>
  );
};

/**
 * Detail of the form for selection of choices
 * @returns React Component
 */
const FormDetail = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { data, isLoading, isFetching } = useGetBySlugQuery(searchParam.get("slug"), {
    skip: searchParam.get("slug") === null,
  });

  const handleCopy = () => {
    const location = window.location;
    navigator.clipboard
      .writeText(`${location.origin}/response/${location.search}`)
      .then(() => dispatch(setAlert({ type: "success", message: "Link copied to clipboard" })))
      .catch(() => dispatch(setAlert({ type: "error", message: "Error copying link" })));
    void 0;
  };

  if (isLoading || isFetching) return <p>loading...</p>;

  if (searchParam.get("slug") === null) return <p>No form selected</p>;

  return (
    <article className="mb-8">
      <span className="flex items-center gap-x-4">
        <h1 className="text-4xl text-primary text-nowrap leading-none">{data?.form.name}</h1>
        <span className="badge badge-primary text-nowrap">slug: {data?.form.slug}</span>
        <span className="block h-7 w-full bg-gradient-to-l from-pink-500 to-violet-500"></span>
      </span>
      <div className="card w-full md:w-3/4 mx-auto bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h3 className="text-2xl italic mb-3 text-primary flex">
            Fill in the form&apos;s questions
            <span
              className="badge badge-secondary badge-lg hover:badge-outline hover:cursor-pointer hover:text-white ms-auto"
              onClick={handleCopy}
            >
              Copy link to share with others 🔗
            </span>
          </h3>
          <h2 className="card-title">{data?.form.name}</h2>
          <p className="text-sm text-gray-400">{data?.form.description}</p>
          <form>
            
          </form>
          <button className="btn btn-primary text-3xl mb-5">Add Question +</button>
          <div className="card-actions flex-nowrap">
            <button className="btn btn-lg grow justify-center btn-success text-3xl hover:before:content-['Save'] before:text-white line-clamp-6">
              ✅
            </button>
            <button className="btn btn-lg btn-outline justify-center btn-error text-3xl hover:before:content-['Delete_form'] before:text-white line-clamp-6">
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
  const { data, isLoading, isFetching, isError } = useGetAllFormsQuery();

  return (
    <>
      {/* ---------------------------------- MODAL --------------------------------- */}
      <FormModal modalRef={modalRef} />
      <FAB modalRef={modalRef} />
      {/* ---------------------------------- MODAL --------------------------------- */}

      {/* -------------------------------- FORM LIST ------------------------------- */}
      {/* //TODO: move to single component, if neccessary */}
      {isError ? (
        <span className="badge badge-error badge-lg text-white py-5">
          ☠️ Unable to show your created forms!
        </span>
      ) : (
        <article className="mb-8">
          <span className="flex items-center gap-x-4">
            <h1 className="text-4xl text-pink-500 text-nowrap leading-none">Your Created Form</h1>
            <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
          </span>
          {isLoading || isFetching ? (
            <span>Loading...</span>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-x-4 gap-y-3 mt-3">
              {data.forms?.map((form, index) => (
                <FormCard key={index} form={form} />
              ))}
            </div>
          )}
        </article>
      )}
      {/* -------------------------------- FORM LIST ------------------------------- */}

      {/* DIVIDER */}
      <Link className="btn btn-outline btn-secondary" to={"/"}>
        Unselect form
      </Link>
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
