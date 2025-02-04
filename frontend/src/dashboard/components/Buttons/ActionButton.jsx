

const ActionButton = ({ ActionIcon, label, onClick }) => {
  return (
    <button
      className="flex items-center gap-4 px-4 py-2.5 ms-2 text-sm font-medium text-white dark:bg-blue-700 bg-colorcito hover:bg-slate-700 rounded-md dark:hover:bg-blue-800 focus:outline-none "
      onClick={onClick}
    >
      <ActionIcon className='text-xl' />
      <span >{label}</span>
    </button>
  );
};

export default ActionButton;