import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { angleLeft, close } from "../../utils/icons";
import Gmail from "../../assets/Gmail.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOtherAccounts, userSelector } from "../../store/slices/userSlice";

type AddAccountModalProps = {
  setAddAccountModalVisible: (addAccountModalVisible: boolean) => void;
};

export const AddAccountModal = ({
  setAddAccountModalVisible,
}: AddAccountModalProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const handleAddAnotherAccount = () => {
    console.log("hello", user.otherAccounts);
    dispatch(
      setOtherAccounts({
        email: user.user.email,
        users: user.otherAccounts,
      })
    );
    setAddAccountModalVisible(false);
  };

  return (
    <div className="modal-container">
      <div className="modal justify-start items-start w-1/5">
        <div
          className="close-container"
          onClick={() => setAddAccountModalVisible(false)}
        >
          <FontAwesomeIcon className="close" icon={close} />
        </div>
        <div className="flex-center mt-8">
          <FontAwesomeIcon className="text-purple mr-2" icon={angleLeft} />
          <h1 className="font-semibold text-xl">Add Account</h1>
        </div>
        <div
          className="flex-center cursor-pointer"
          onClick={handleAddAnotherAccount}
        >
          <div className="w-8 h-8 shadow-default rounded-lg flex-center m-6 pt-2 mr-2">
            <img src={Gmail} alt="whatsapp icon" />
          </div>
          <p>Google</p>
        </div>
      </div>
    </div>
  );
};
