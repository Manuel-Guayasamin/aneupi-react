export const Input = ({
  label,
  name,
  type = "text",
  register,
  errors,
  required,
  validate,
  ...rest
}) => (
  <div>
    <div className="flex items-center justify-between relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>

    <input
      id={name}
      type={type}
      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
      placeholder={label}
      {...register(name, {
        required: required ? "Este campo es obligatorio" : false,
        validate: validate, // Include custom validation function here
      })}
      {...rest}
    />
    {errors[name] && (
        <span className="right-0 mb-2 text-white badge badge-error badge-sm">
          {errors[name].message}
        </span>
    )}
  </div>
);
