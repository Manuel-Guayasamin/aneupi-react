const DshButton = ({ icon, text, onClick, className, iconClass, textClass }) => {
  const Icon = icon;
  return (
    <button onClick={onClick} className={`${className} flex items-center justify-center h-8 px-2 gap-x-2 font-medium rounded dsh-btn-icon`}>
      {icon && <Icon className={`${iconClass}`} />}
      {text && <span className={`${textClass} ml-1`}>{text}</span>}
    </button>
  );
};

export default DshButton;