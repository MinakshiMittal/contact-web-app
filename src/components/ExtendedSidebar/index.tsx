import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../store/hooks";
import { contactsListSelector } from "../../store/slices/contactsListSlice";
import { userSelector } from "../../store/slices/userSlice";
import { bars, plus, settings, user } from "../../utils/icons";
import { User } from "../../utils/types";

type ExtendedSidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  setViewProfileModalVisible: (viewProfileModal: boolean) => void;
  setViewDetails: (viewDetails: User) => void;
  setEdit: (edit: string) => void;
  setManageAccountVisible: (manageAccountVisible: boolean) => void;
  setAddAccountModalVisible: (addAccountModalVisible: boolean) => void;
};

export const ExtendedSidebar = ({
  setShowSidebar,
  showSidebar,
  setViewProfileModalVisible,
  setViewDetails,
  setEdit,
  setManageAccountVisible,
  setAddAccountModalVisible,
}: ExtendedSidebarProps) => {
  const userData = useAppSelector(userSelector);
  const contactsList = useAppSelector(contactsListSelector);
  const userDetails = useAppSelector(userSelector);

  const handleProfileClick = () => {
    setViewProfileModalVisible(true);
    setViewDetails(userDetails.user);
    setEdit("user");
  };

  return (
    <div className="w-4/12 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`sm:w-[56px] w-4/12 h-14 bg-gradient rounded-[52px] rounded-bl-[14px] shadow-3xl flex-center shadow-default m-3`}
          >
            <div className="shadow-default rounded-lg">
              <FontAwesomeIcon
                className="w-[20px] h-[20px] text-white rounded-[6px]"
                icon={user}
              />
            </div>
          </div>
          <h1>Contact Book</h1>
        </div>
        <FontAwesomeIcon
          icon={bars}
          className="text-purple text-3xl cursor-pointer mr-4"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <div className="w-48 h-48 self-center rounded-full top-0 bg-gray-100 flex shadow-inner-default items-center justify-center">
        <div className="w-36 h-36 border rounded-full shadow-default bg-white">
          {userData?.user?.profileURL && (
            <img
              src={
                userData?.user?.profileURL
                  ? userData?.user?.profileURL
                  : userData?.user?.name[0]
              }
              alt="profile"
              className="w-36 h-36 rounded-full"
            />
          )}
        </div>
      </div>
      <h1 className="self-center mt-4 font-semibold text-light-black">
        {userData?.user?.name}
      </h1>
      <p className="self-center text-light-black mb-6">
        {userData?.user?.email}
      </p>
      <hr />
      <div className="m-4">
        <div
          className="flex items-center p-4 mt-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="w-8 h-8 rounded-lg shadow-default flex-center mr-4">
            {userData?.user?.profileURL && (
              <img
                src={
                  userData?.user?.profileURL
                    ? userData?.user?.profileURL
                    : userData?.user?.name[0]
                }
                alt="profile"
                className="rounded-full w-6 h-6"
              />
            )}
          </div>
          <p className="text-lg font-medium text-light-black mr-8">
            {userData?.user?.email}
          </p>
          <p className="text-xl text-purple">{contactsList.contacts.length}</p>
        </div>
        <div
          className="flex p-4 items-center mt-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => setManageAccountVisible(true)}
        >
          <div className="text-purple text-xl rounded-lg shadow-default w-8 h-8 flex-center mr-4">
            <FontAwesomeIcon icon={settings} />
          </div>
          <p className="text-lg font-medium text-light-black mr-8">
            Manage Account
          </p>
        </div>
        <div
          className="flex p-4 items-center mt-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => setAddAccountModalVisible(true)}
        >
          <div className="text-purple text-xl rounded-lg shadow-default w-8 h-8 flex-center mr-4">
            <FontAwesomeIcon icon={plus} />
          </div>
          <p className="text-lg font-medium text-light-black mr-8">
            Add Account
          </p>
        </div>
      </div>
    </div>
  );
};
