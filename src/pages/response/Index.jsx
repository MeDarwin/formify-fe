import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommonLoading } from "../../components/CommonLoading";
import { ErrorField } from "../../components/ErrorField";
import { useGetBySlugQuery, useSubmitResponseMutation } from "../../reducer/services/formApi";

const ResponseForm = () => {
  const { slug } = useParams();
  const { data, isLoading, isFetching, isError, isSuccess, error } = useGetBySlugQuery(slug, {
    skip: !slug,
  });
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();
  const [answers, setAnswers] = useState([]);
  const { errors } = useSelector((state) => state.alertMessage);

  useEffect(() => {
    // init the answers from query
    if (isSuccess)
      setAnswers(
        data.form.questions.map((question) => ({
          question_id: question.id,
          value: question.choice_type === "checkboxes" ? [] : null,
        }))
      );
  }, [data?.form.questions, isSuccess]);

  const handleChange = useCallback((/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
    setAnswers((prev) =>
      //map previous state since the question is an array
      prev.map(
        (answer) =>
          answer.question_id == e.target.getAttribute("data-question-id") // check wether it's the question
            ? {
                ...answer, //set question id
                value:
                  e.target.type === "checkbox"
                    ? e.target.checked //check if checked
                      ? [...answer.value, e.target.value]
                      : answer.value.filter((item) => item !== e.target.value)
                    : e.target.value, //non checkbox set value
              }
            : answer //dont change when not the qeustion
      )
    );
  }, []);

  const handleSubmit = (/** @type {React.FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault();
    submitResponse({ slug, data: answers });
  };

  const renderMultiAnswer = useCallback(
    (choice_type, question_id, choices) => {
      switch (choice_type) {
        case "multiple choice":
          return choices.split(",").map((choice, index) => (
            <label key={index} className="label cursor-pointer justify-start gap-x-3">
              <input
                type="radio"
                name={choices}
                className="radio"
                value={choice}
                data-question-id={question_id}
                onChange={handleChange}
              />
              <span className="label-text">{choice}</span>
            </label>
          ));
        case "checkboxes":
          return (
            <>
              <p className="text-xs text-gray-400">May select more than one</p>
              {choices.split(",").map((choice, index) => (
                <label key={index} className="label cursor-pointer justify-start gap-x-3">
                  <input
                    type="checkbox"
                    name={`${choices}[]`}
                    className="checkbox"
                    value={choice}
                    data-question-id={question_id}
                    onChange={handleChange}
                  />
                  <span className="label-text">{choice}</span>
                </label>
              ))}
            </>
          );
        case "dropdown":
          return (
            <select
              className="select select-bordered w-full"
              defaultValue={""}
              data-question-id={question_id}
              onChange={handleChange}
            >
              <option value="">Select one</option>
              {choices.split(",").map((choice, index) => (
                <option key={index} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          );
      }
    },
    [handleChange]
  );

  const renderSingleAnswer = useCallback(
    (choice_type, question_id) => {
      switch (choice_type) {
        case "short answer":
          return (
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="short answer"
              data-question-id={question_id}
              onChange={handleChange}
            />
          );
        case "paragraph":
          return (
            <textarea
              className="input input-bordered min-h-40 w-full"
              placeholder="paragraph"
              data-question-id={question_id}
              onChange={handleChange}
            />
          );
        case "date":
          return (
            <input
              type="date"
              className="input input-bordered w-full"
              data-question-id={question_id}
              onChange={handleChange}
            />
          );
        case "time":
          return (
            <input
              type="time"
              className="input input-bordered w-full"
              data-question-id={question_id}
              onChange={handleChange}
            />
          );
      }
    },
    [handleChange]
  );
  if (isError)
    return (
      <div className="text-error text-center my-10 text-lg">
        <span className="text-9xl font-bold">{error.originalStatus || error.status || 500}</span>
        {error.data?.message ?? "Something went wrong"}
      </div>
    );

  if (isLoading || isFetching) return <CommonLoading />;

  return (
    <div className="block w-full mx-auto container px-3 lg:px-0">
      <div className="w-full lg:w-1/2 mx-auto card card-bordered shadow-lg mt-16 mb-5 ">
        <div className="card-body">
          <h1 className="text-4xl font-bold italic text-primary flex-wrap leading-none flex -mb-3">
            {data?.form.name}
          </h1>
          <p className="text-lg text-base-content">{data?.form.description}</p>
          <p className="text-sm text-gray-500">
            Allowed domains: {data?.form.allowed_domains.join(", ")}
          </p>
          <form id="response-form" onSubmit={handleSubmit}>
            {data?.form?.questions.map(({ id, name, choice_type, choices, is_required }, index) => (
              <div key={id} className="card border">
                <div className="card-body flex-wrap flex-col gap-y-1">
                  <p className={`card-title ${is_required ? "required" : ""}`}>
                    {index + 1}. {name}
                  </p>
                  {["multiple choice", "dropdown", "checkboxes"].includes(choice_type)
                    ? renderMultiAnswer(choice_type, id, choices)
                    : renderSingleAnswer(choice_type, id)}
                  <ErrorField
                    message={
                      errors?.[`answers.${index}.value`]
                        ? // Convert array to string and replace the field name
                          new String(errors?.[`answers.${index}.value`]).replace(
                            `The answers.${index}.value`,
                            "This field "
                          )
                        : null
                    }
                  />
                </div>
              </div>
            ))}
          </form>
          <div className="card-footer">
            <p className="text-sm text-gray-400 mt-4">
              <span className="block font-bold">
                One response per user:{" "}
                {data?.form.limit_one_response ? (
                  <span className="text-success">YES</span>
                ) : (
                  <span className="text-error">NO</span>
                )}
              </span>
            </p>
            <button
              type="submit"
              form="response-form"
              className="btn btn-primary btn-block mt-3"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              Submit response
            </button>
          </div>
        </div>
      </div>
      <footer className="pb-28">
        <p className="text-3xl mt-10">Dear user, thank you for taking part in this survey</p>
        <p>
          brought to you by <span className="text-2xl font-bold text-pink-500 ms-2">Formify</span>
        </p>
      </footer>
    </div>
  );
};

export default ResponseForm;
