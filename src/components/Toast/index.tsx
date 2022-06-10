import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { circleCheck } from "../../utils/icons";

type ToastProps = {
  toastMessage: string;
};

export const Toast = ({ toastMessage }: ToastProps) => {
  return (
    <div className="absolute bottom-6 left-10 border-2 border-emerald-400 bg-white h-14 flex items-center px-4">
      <p className="text-lg font-semibold mr-8 text-emerald-400">{toastMessage}</p>
      <FontAwesomeIcon className="text-emerald-400 text-lg" icon={circleCheck} />
    </div>
  );
};
