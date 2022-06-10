import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
  type: string;
  placeholder: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  id,
  onBlur,
  className,
}: InputProps) => {
  return (
    <div className={`mb-8 mx-2 ${className}`}>
      <input
        type={type}
        className={`w-full h-12 text-xl rounded-[12px] shadow-inner-default placeholder:pl-4 placeholder:text-lg  hover:border-purple hover:border-2 `}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        id={id}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
