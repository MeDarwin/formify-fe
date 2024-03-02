//TODO: split into multiple components
export const Home = () => {
  return (
    <>
      {/* -------------------------------- FORM LIST ------------------------------- */}
      <article className="mb-8">
        <span className="flex items-center gap-x-4">
          <h1 className="text-4xl text-pink-500 text-nowrap leading-none">
            Your Created Form
          </h1>
          <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
        </span>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-x-4 gap-y-3 mt-3">
          {[...new Array(5)].map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-violet-500 px-2 py-4 hover:outline-dashed hover:outline-2 hover:outline-pink-500"
            >
              <p className="text-primary">Form Title {index + 1}</p>
            </div>
          ))}
        </div>
      </article>
      {/* -------------------------------- FORM LIST ------------------------------- */}
      <div className="flex flex-col w-full">
        <div className="divider"></div>
      </div>
      {/* ------------------------------- FORM DETAIL ------------------------------ */}
      <article className="mb-8">
        <span className="flex items-center gap-x-4">
          <span className="block h-7 w-full bg-gradient-to-r from-pink-500 to-violet-500"></span>
          <h1 className="text-4xl text-pink-500 text-nowrap leading-none">
            Detail of Form X
          </h1>
        </span>
        <div className="card w-full md:w-3/4 mx-auto bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-lg btn-outline justify-center btn-error text-3xl hover:before:content-['delete'] before:text-white line-clamp-6">💣</button>
            </div>
          </div>
        </div>
      </article>
      {/* ------------------------------- FORM DETAIL ------------------------------ */}
    </>
  );
};
