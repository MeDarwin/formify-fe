/* eslint-disable react/prop-types */
export const CommonLoading = ({ isFloating = false }) => {
  return (
    <div className={`w-full ${isFloating && "fixed top-0 h-full bg-white z-50"}`}>
      <div className="flex items-center gap-x-10 w-fit mx-auto my-20">
        <span className="text-primary text-xl font-semibold italic">Getting busy...</span>
        <span className="loading text-primary loading-bars loading-lg"></span>
      </div>
    </div>
  );
};
