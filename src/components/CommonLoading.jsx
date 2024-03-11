export const CommonLoading = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-x-10 w-fit mx-auto my-20">
        <span className="text-primary text-xl font-semibold italic">Getting busy...</span>
        <span className="loading text-primary loading-bars loading-lg"></span>
      </div>
    </div>
  );
};
