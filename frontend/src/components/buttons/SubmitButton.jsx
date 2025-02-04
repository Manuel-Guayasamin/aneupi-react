export const SubmitButton = ({ children, className, ...rest }) => {
  return (
    <button className={`flex-1 btn btn-primary ${className}`} {...rest}>
      {children}
    </button>
  );
};
