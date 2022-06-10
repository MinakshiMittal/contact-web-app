import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../store/hooks";
import { hideErrors } from "../../store/slices/errorSlice";
import { close } from "../../utils/icons";

type ErrorBoxProps = {
  errorMessage: string;
};

export const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="modal-container">
      <div className="flex flex-col sm:w-1/4 w-11/12 border rounded-xl top-1/3 bg-white absolute p-4 pr-12">
        <h1 className="text-light-black text-red-500 font-semibold">ERROR</h1>
        <p className="mt-4 text-lg">{errorMessage}</p>
        <FontAwesomeIcon
          className="absolute right-4 text-lg font-bold text-red-500 cursor-pointer"
          icon={close}
          onClick={() => dispatch(hideErrors())}
        />
      </div>
    </div>
  );
};
