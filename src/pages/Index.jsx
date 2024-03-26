/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { CommonLoading } from "../components/CommonLoading";
import { ErrorField } from "../components/ErrorField";
import { FAB } from "../components/FAB";
import { Modal } from "../components/Modal";
import {
  useCreateFormMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
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
        modalRef.current.close();
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
        <p className="label-text w-4/12">
          <span className="required">Form name</span>
          <ErrorField className="gap-0" message={errors?.name} />
        </p>
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
        <p className="label-text w-4/12">
          <span className="required">Form slug</span>
          <ErrorField message={errors?.slug} />
        </p>
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
        <p className="label-text w-4/12">
          <span className="required">Form description</span>
          <ErrorField message={errors?.description} />
        </p>
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
        <p className="label-text w-4/12">
          <span>Allowed domains</span>
          <span className="text-gray-400 text-xs">Separated by coma (&ldquo;, &rdquo;)</span>
          <ErrorField message={errors?.allowed_domains} />
        </p>
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
        <p className="label-text w-4/12">
          <span>Limit to one response</span>
          <ErrorField message={errors?.limit_one_response} />
        </p>
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
  const { id: user_id } = useSelector((state) => state.authenticated);
  return (
    <Link
      to={`?slug=${form.slug}`}
      className={`rounded-lg border border-primary px-2 py-4 hover:cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-pink-500 ${
        form?.creator_id === user_id ? "border-2 shadow-md shadow-primary/30" : ""
      }`}
    >
      <p className="text-primary">{form?.name}</p>
    </Link>
  );
};

/**
 * Question form component, question form modal
 * @returns React Component
 */
const QuestionForm = ({ formCreatorId }) => {
  const { id: user_id } = useSelector((state) => state.authenticated);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const error = useSelector((state) => state.alertMessage?.errors);
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();
  const [question, setQuestion] = useState({
    name: null,
    choice_type: null,
    choices: null,
    is_required: false,
  });

  const handleSubmit = (/** @type {React.FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault();
    createQuestion({ data: question, slug: searchParam.get("slug") })
      .unwrap()
      .then(({ message }) => {
        dispatch(setAlert({ type: "success", message }));
        e.target.reset();
        modalRef.current.close();
      })
      .catch(({ data }) =>
        dispatch(setAlert({ type: "error", message: data?.message, errors: data?.errors }))
      );
  };

  const handleChange = useCallback(
    (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setQuestion({ ...question, [e.target.name]: e.target.value });
      if (
        e.target.name === "choice_type" &&
        !["multiple choice", "dropdown", "checkboxes"].includes(e.target.value)
      )
        setQuestion((prevState) => ({ ...prevState, choices: null }));
    },
    [question]
  );

  const additionalChoices = useMemo(() => {
    switch (question.choice_type) {
      case "multiple choice":
      case "dropdown":
      case "checkboxes":
        return (
          <label className="label">
            <p className="label-text w-4/12">
              <span className="required">Additional choices</span>
              <span className="block text-xs text-gray-400">Separated by parentheses ()</span>
              <ErrorField message={error?.choices} />
            </p>
            <input
              type="text"
              name="choices"
              className="input input-bordered w-full"
              placeholder="(example)(example two)"
              onChange={handleChange}
            />
          </label>
        );
      default:
        return null;
    }
  }, [error?.choices, handleChange, question.choice_type]);

  return (
    <>
      <Modal modalRef={modalRef} title="Make a question" handleSubmit={handleSubmit}>
        {/* NAME INPUT */}
        <label className="label">
          <p className="label-text w-4/12">
            <span className="required">Question&apos;s name</span>
            <ErrorField message={error?.name} />
          </p>
          <input
            name="name"
            type="text"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
        </label>
        {/* NAME INPUT */}
        {/* IS REQUIRED */}
        <div className="flex">
          <p className="label-text w-4/12">
            <span>Is required</span>
            <ErrorField message={error?.is_required} />
          </p>
          <div className="w-full [&>*]:border">
            <label className="hover:cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full ps-4 label gap-x-2 py-0 pe-0 mb-3">
              <span className="label-text">true</span>
              <input
                type="radio"
                name="is_required"
                className="radio radio-primary radio-lg"
                value={true}
                onChange={handleChange}
              />
            </label>
            <label className="hover:cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full ps-4 label gap-x-2 py-0 pe-0">
              <span className="label-text">false</span>
              <input
                type="radio"
                name="is_required"
                className="radio radio-primary radio-lg"
                defaultChecked
                value={false}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {/* IS REQUIRED */}
        {/* QUESTION TYPE */}
        <label className="label">
          <p className="label-text w-4/12">
            <span className="required">Question&apos;s type</span>
            <ErrorField message={error?.choice_type} />
          </p>
          <select
            name="choice_type"
            className="select select-bordered w-full"
            onChange={handleChange}
            defaultValue={""}
          >
            <option disabled value={""}>
              Pick question type
            </option>
            <option value="short answer">short answer</option>
            <option value="paragraph">paragraph</option>
            <option value="date">date</option>
            <option value="time">time</option>
            <option value="multiple choice">multiple choice</option>
            <option value="dropdown">dropdown</option>
            <option value="checkboxes">checkboxes</option>
          </select>
        </label>
        {/* QUESTION TYPE */}
        {/* ADDTIONAL CHOICES - WHEN MULTIPLE INPUT IS NEEDED */}
        {additionalChoices}
        {/* ADDTIONAL CHOICES */}

        <p className="label-text text-gray-400">
          note: <span className="required"></span> is required
        </p>

        <button
          type="submit"
          className="btn btn-lg grow justify-center btn-success text-3xl line-clamp-6"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          Save ✅
        </button>
      </Modal>
      {formCreatorId === user_id && (
        <button
          className="btn btn-primary btn-sm mb-5"
          onClick={() => modalRef.current.showModal()}
        >
          Add Question +
        </button>
      )}
    </>
  );
};

/**
 * Detail of the form for selection of choices
 * @returns React Component
 */
const FormDetail = () => {
  const dispatch = useDispatch();
  const { id: user_id } = useSelector((state) => state.authenticated);
  const [searchParam] = useSearchParams();
  const { data, isLoading, isFetching, isError, error } = useGetBySlugQuery(
    searchParam.get("slug"),
    {
      skip: searchParam.get("slug") === null,
    }
  );
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation();

  const handleCopy = () => {
    const location = window.location;
    navigator.clipboard
      .writeText(`${location.origin}/response/${searchParam.get("slug")}`)
      .then(() => dispatch(setAlert({ type: "success", message: "Link copied to clipboard" })))
      .catch(() => dispatch(setAlert({ type: "error", message: "Error copying link" })));
    void 0;
  };

  useEffect(() => {
    if (isError)
      dispatch(
        setAlert({ type: "error", message: error?.data?.message || "Something went wrong" })
      );
  }, [dispatch, error?.data?.message, isError]);

  if (isError) return <p>Something went wrong</p>;

  if (isLoading || isFetching) return <CommonLoading />;

  if (searchParam.get("slug") === null) return <p>No form selected</p>;

  return (
    <article className="mb-8">
      <span className="flex items-center gap-x-4">
        <span className="badge badge-primary text-nowrap">slug: {data?.form.slug}</span>
        <span className="block h-7 w-full bg-gradient-to-l from-pink-500 to-violet-500"></span>
      </span>
      <div className="card w-full md:w-3/4 mx-auto bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <div className="mb-3 flex flex-col">
            <h1 className="text-4xl italic text-primary lg:text-nowrap flex-wrap leading-none flex mb-3">
              <span className="w-full lg:w-3/4 text-wrap">{data?.form.name}</span>
              <span
                className="badge badge-secondary badge-lg hover:badge-outline hover:cursor-pointer hover:text-white ms-auto"
                onClick={handleCopy}
              >
                Share link 🔗
              </span>
            </h1>
            <p className="text-lg text-base-content">{data?.form.description}</p>
            <p className="text-sm text-gray-400">
              <span className="block">
                One response per user:{" "}
                {data?.form.limit_one_response ? (
                  <span className="text-success">YES</span>
                ) : (
                  <span className="text-error">NO</span>
                )}
              </span>
              <span className="block">
                Allowed domains: {data?.form.allowed_domains.join(", ") || "*"}
              </span>
            </p>
          </div>
          <QuestionForm formCreatorId={data?.form.creator_id} />
          <p className="text-lg">
            Questions:{" "}
            <span className="text-xs text-gray-400">{data?.form.questions.length} in total</span>
          </p>
          {data?.form?.questions.map(({ id, name, choice_type, choices, is_required }, index) => (
            <div key={id} className="card border">
              <div className="card-body flex-wrap flex-row">
                <span>
                  <p className="card-title">{index + 1}.</p>
                  <p>{name}</p>
                  <p className="font-normal text-xs">Type: {choice_type}</p>
                  <p className="font-normal mt-2">
                    Is required to answer:{" "}
                    <span className={`font-bold ${is_required ? "text-success" : "text-error"}`}>
                      {is_required ? "YES" : "NO"}
                    </span>
                  </p>
                  <ul className="list-disc list-inside">
                    {["multiple choice", "dropdown", "checkboxes"].includes(choice_type) &&
                      choices.split(",").map((val, index) => (
                        <li key={index} className="font-normal">
                          {val}
                        </li>
                      ))}
                  </ul>
                </span>
                {data?.form.creator_id === user_id && (
                  <button
                    onClick={() => deleteQuestion({ slug: data?.form.slug, id })}
                    className="btn btn-outline ms-auto justify-center btn-error hover:before:content-['Delete_question_'] before:text-white line-clamp-6"
                    disabled={isDeleting}
                    aria-disabled={isDeleting}
                  >
                    💣
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="card-actions">
            {data?.form.creator_id === user_id && (
              <Link
                to={`/answers/${data?.form.slug}`}
                className="btn btn-secondary btn-outline btn-block"
              >
                See Answers
              </Link>
            )}
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
  const modalRef = useRef();
  const [searchParam] = useSearchParams();
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
            <h1 className="text-4xl text-pink-500 text-nowrap leading-none">
              All user&apos;s Created Form
            </h1>
            <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
          </span>
          {isLoading || isFetching ? (
            <CommonLoading />
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

      {searchParam.get("slug") != null && (
        <Link className="btn btn-outline btn-secondary" to={"/"}>
          Deselect form
        </Link>
      )}
      {/* DIVIDER */}
      <p className="text-sm text-gray-400 mt-3">PS: your form(s) will slightly glow</p>
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
