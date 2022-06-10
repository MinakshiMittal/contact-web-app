import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../firebase";
import { trimEmail } from "../../services/apiMessages";
import { useAppSelector } from "../../store/hooks";
import { messagesSelector } from "../../store/slices/messagesSlice";
import { userSelector } from "../../store/slices/userSlice";
import { close } from "../../utils/icons";

type ChatActionModalProps = {
  setChatActionModalVisible: (chatActionModalVisible: boolean) => void;
  setDeleteModalVisible: (deleteModalVisible: boolean) => void;
};

export const ChatActionModal = ({
  setChatActionModalVisible,
  setDeleteModalVisible,
}: ChatActionModalProps) => {
  const messages = useAppSelector(messagesSelector);
  const user = useAppSelector(userSelector);

  const handleDelete = () => {
    setChatActionModalVisible(false);
    setDeleteModalVisible(true);
  };

  const handleBlock = () => {
    db.ref(
      `/chats/${trimEmail(user?.user?.email)}/${trimEmail(
        messages?.receiverEmail
      )}/blocked/`
    ).set({
      blocked: !messages.blocked,
    });
    setChatActionModalVisible(false);
  };

  return (
    <div className="modal-container">
      <div className="modal w-1/5 m-4 top-12 right-6 pr-8">
        <div
          className="close-container"
          onClick={() => setChatActionModalVisible(false)}
        >
          <FontAwesomeIcon className="close" icon={close} />
        </div>
        <p
          className="cursor-pointer text-lg font-semibold text-light-black border-b-2 border-gray-100 w-full mx-6 pl-4 py-2 mt-8"
          onClick={handleDelete}
        >
          Delete
        </p>
        <p
          className="cursor-pointer text-lg font-semibold text-light-black border-b-2 border-gray-100 w-full mx-6 py-2 pl-4"
          onClick={handleBlock}
        >
          {messages.blocked ? "Unblock" : "Block"}
        </p>
        <p className="cursor-pointer text-lg font-semibold text-light-black w-full mx-6 py-2 pl-4">
          Share
        </p>
      </div>
    </div>
  );
};
