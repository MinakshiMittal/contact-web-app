import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../store/hooks";
import { userSelector } from "../../store/slices/userSlice";
import { close, edit, plus, trash } from "../../utils/icons";

type ManageAccountProps = {
  setManageAccountVisible: (manageAccountVisible: boolean) => void;
  setAddAccountModalVisible: (addAccountModalVisible: boolean) => void;
};

export const ManageAccount = ({
  setManageAccountVisible,
  setAddAccountModalVisible,
}: ManageAccountProps) => {
  const user = useAppSelector(userSelector);
  console.log(user.otherAccounts);

  const handleAddAccount = () => {
    setAddAccountModalVisible(true);
    setManageAccountVisible(false);
  };
  return (
    <div className="modal-container">
      <div className="modal items-start p-4">
        <div
          className="close-container"
          onClick={() => setManageAccountVisible(false)}
        >
          <FontAwesomeIcon className="close" icon={close} />
        </div>
        <h1 className="font-semibold text-xl">Manage Account</h1>
        <div className="flex items-center justify-between w-full">
          {user.otherAccounts?.map((otherAccount) => {
            return (
              <div className="flex items-center justify-between w-full mt-6">
                <p className="ml-8 text-lg font-medium">{otherAccount}</p>
                <div className="flex mr-8">
                  <div className="text-yellow-600 shadow-default mr-2 w-8 h-8 flex-center rounded-xl cursor-pointer text-md">
                    <FontAwesomeIcon icon={edit} />
                  </div>
                  <div className="text-red-500 shadow-default mr-2 w-8 h-8 flex-center rounded-xl cursor-pointer text-md">
                    <FontAwesomeIcon icon={trash} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <div
          className="flex p-4 items-center mt-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleAddAccount}
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
