import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { CommonLoading } from "../../components/CommonLoading";
import { useGetBySlugQuery } from "../../reducer/services/formApi";

const ResponseForm = () => {
  const { slug } = useParams();
  const { data, isLoading, isFetching, isError } = useGetBySlugQuery(slug, { skip: !slug });

  const renderMultiAnswer = useCallback((choice_type, choices) => {
    switch (choice_type) {
      case "multiple choice":
        return choices.split(",").map((choice, index) => (
          <label key={index} className="label cursor-pointer justify-start gap-x-3">
            <input type="radio" name={choices} className="radio" value={choice} />
            <span className="label-text">{choice}</span>
          </label>
        ));
      case "checkboxes":
        return (
          <>
            <p className="text-xs text-gray-400">May select more than one</p>
            {choices.split(",").map((choice, index) => (
              <label key={index} className="label cursor-pointer justify-start gap-x-3">
                <input type="checkbox" name={choices} className="checkbox" value={choice} />
                <span className="label-text">{choice}</span>
              </label>
            ))}
          </>
        );
      case "dropdown":
        return (
          <select className="select select-bordered w-full" defaultValue={""}>
            <option value="">Select one</option>
            {choices.split(",").map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        );
    }
  }, []);

  const renderSingleAnswer = useCallback((choice_type) => {
    switch (choice_type) {
      case "short answer":
        return (
          <input type="text" className="input input-bordered w-full" placeholder="short answer" />
        );
      case "paragraph":
        return <textarea className="input input-bordered min-h-40" placeholder="paragraph" />;
      case "date":
        return <input type="date" className="input input-bordered w-full" />;
      case "time":
        return <input type="time" className="input input-bordered w-full" />;
    }
  }, []);

  if (isError) return <div>Something went wrong!</div>;

  if (isLoading || isFetching) return <CommonLoading />;

  return (
    <div className="block w-full mx-auto container px-3 lg:px-0">
      <div className="w-full lg:w-1/2 mx-auto card card-bordered shadow-lg mt-16 mb-5 ">
        <div className="card-body">
          <h1 className="text-4xl font-bold italic text-primary flex-wrap leading-none flex -mb-3">
            {data?.form.name}
          </h1>
          <p className="text-lg text-base-content ">{data?.form.description}</p>
          <p className="text-sm text-gray-400">
            <span className="block font-bold">
              One response per user:{" "}
              {data?.form.limit_one_response ? (
                <span className="text-success">YES</span>
              ) : (
                <span className="text-error">NO</span>
              )}
            </span>
          </p>
          {data?.form?.questions.map(({ id, name, choice_type, choices, is_required }, index) => (
            <div key={id} className="card border">
              <div className="card-body flex-wrap flex-col gap-y-1">
                <p className={`card-title ${is_required ? "required" : ""}`}>
                  {index + 1}. {name}
                </p>
                {["multiple choice", "dropdown", "checkboxes"].includes(choice_type)
                  ? renderMultiAnswer(choice_type, choices)
                  : renderSingleAnswer(choice_type)}
              </div>
            </div>
          ))}
          <div className="card-footer">
            <button className="btn btn-primary btn-block mt-3">Submit response</button>
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
