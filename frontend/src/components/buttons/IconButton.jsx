export const IconButton = ({ children, ...rest }) => {
  return (
    <button
      className="rounded-full  p-2 hover:bg-gray-200/80  text-lg"
      {...rest}
    >
      {children}
    </button>
  );
};
