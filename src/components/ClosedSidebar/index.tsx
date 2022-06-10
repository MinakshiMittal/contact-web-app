import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bars, user } from "../../utils/icons";

type ClosedSidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};

export const ClosedSidebar = ({
  showSidebar,
  setShowSidebar,
}: ClosedSidebarProps) => {
  return (
    <div className="w-1/12 bg-white flex flex-col items-center ">
      <div
        className={`sm:w-[56px] w-4/12 h-14 bg-gradient rounded-[52px] rounded-bl-[14px] shadow-3xl flex-center shadow-default mb-10 m-3`}
      >
        <div className="shadow-default rounded-lg">
          <FontAwesomeIcon
            className="w-[20px] h-[20px] text-white rounded-[6px]"
            icon={user}
          />
        </div>
      </div>
      <FontAwesomeIcon
        icon={bars}
        className="text-purple text-3xl cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      />
    </div>
  );
};
