export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-5 h-5 rounded-full bg-gradient-to-r from-sky-500 to-gray-50 animate-spin"></div>
      <span className="text-sm text-gray-50 font-sans font-semibold px-2">
        Loading..!
      </span>
    </div>
  );
};
