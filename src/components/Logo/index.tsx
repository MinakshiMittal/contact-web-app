import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "../../utils/icons";

export const Logo = () => {
  return (
    <div
      className={`sm:w-3/12 w-4/12 h-32 bg-white rounded-[52px] rounded-bl-[14px] shadow-3xl flex-center `}
    >
      <div className="shadow-default rounded-lg">
        <FontAwesomeIcon
          className="w-10 h-10 text-purple rounded-[6px] relative"
          icon={user}
        />
      </div>
    </div>
  );
};
