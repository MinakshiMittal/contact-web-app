import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import { angleRight } from "../../utils/icons";

type ButtonProps = {
  text: string;
  type: "reset" | "button" | "submit" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const Button = ({ text, type, onClick, className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-gradient text-white p-3 font-semibold px-14 m-10 sm:my-10 my-4 rounded-3xl hover:rounded-full text-md hover:px-[55px] hover:border-2 border-purple hover:p-[11px] shadow-default ${className}`}
      onClick={onClick}
    >
      {text}
      <FontAwesomeIcon className="pl-4 text-sm" icon={angleRight} />
    </button>
  );
};
