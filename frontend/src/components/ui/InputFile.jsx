import { useRef } from "react";

export const InputFile = ({
  children,
  onChange,
  className,
  accept,
  ...rest
}) => {
  const fileInput = useRef(null);
  const openFileInput = () => {
    fileInput.current.click();
  };

  return (
    <div onClick={openFileInput} className={className}>
      {children}
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        ref={fileInput}
        accept={accept ? accept : "., image/png,image/"}
        {...rest}
      />
    </div>
  );
};
