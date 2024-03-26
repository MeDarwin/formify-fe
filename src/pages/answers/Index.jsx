import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { CommonLoading } from "../../components/CommonLoading";
import { useGetResponsesQuery } from "../../reducer/services/formApi";

const Answers = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetResponsesQuery(slug, { skip: !slug });

  if (isLoading) return <CommonLoading />;

  if (isError)
    return <span className="badge badge-error badge-lg text-white py-5">☠️ {error?.message}</span>;

  return (
    <>
      <h1 className="text-3xl">User&apos;s Answers</h1>
      <div className="grid auto-cols-max grid-flow-col-dense gap-4 gap-y-2.5">
        {data?.responses?.length === 0 && <p className="text-center">No responses yet</p>}
        {data.responses.map((response) => (
          <div key={response?.date} className="card shadow-lg">
            <div className="card-body">
              <div className="card-title flex-col items-start gap-0">
                <h2 className="text-3xl text-primary">User: {response?.user?.name}</h2>
                <p className="text-xs text-gray-400">{response?.date}</p>
              </div>
              <div className="flex flex-col gap-1">
                {response?.answers.length === 0 && <p>Answer is empty</p>}
                {Object.entries(response?.answers).map(([key, value], index) => (
                  <Fragment key={key}>
                    <div
                      className={`flex flex-nowrap gap-x-2 px-3 rounded-md ${
                        index % 2 === 0 && "bg-primary/5"
                      }`}
                    >
                      <span className="min-w-40 max-w-min-w-40">{key}</span>
                      <span className="w-auto">:</span>
                      <span className="w-max">
                        {value?.split(",").join(", ") ?? <span className="text-error">EMPTY</span>}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Answers;
