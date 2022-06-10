import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "..";
import { db } from "../../firebase";
import { trimEmail } from "../../services/apiMessages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteChat, messagesSelector } from "../../store/slices/messagesSlice";
import { userSelector } from "../../store/slices/userSlice";
import { angleRight, trash, close } from "../../utils/icons";
import { Message } from "../../utils/types";

export type DeleteModalProps = {
  setDeleteModalVisible: (deleteModalVisible: boolean) => void;
};

export const DeleteModal = ({ setDeleteModalVisible }: DeleteModalProps) => {
  const messages = useAppSelector(messagesSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    messages.messages.map((message: Message) =>
      db
        .ref(
          `/chats/${trimEmail(user?.user?.email)}/${trimEmail(
            messages?.receiverEmail
          )}/${message.createdAt}`
        )
        .remove()
    );
    dispatch(deleteChat());
    setDeleteModalVisible(false);
  };

  return (
    <div className="modal-container">
      <div className="modal pt-8 w-2/5">
        <div className="close-container">
          <FontAwesomeIcon className="close" icon={close} />
        </div>
        <div className="w-16 h-16 self-center rounded-full top-0 bg-gray-100 shadow-inner-default flex-center">
          <div className="w-12 h-12 border rounded-full shadow-default bg-white bg-home-page flex-center">
            <FontAwesomeIcon className="text-red-700 text-2xl" icon={trash} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-light-black mb-2">
          Are you sure?
        </h1>
        <p className="text-light-black">
          Do you really want to delete the messages?
        </p>
        <div className="flex-center cursor-pointer">
          <p
            className="font-semibold text-purple text-lg flex items-center"
            onClick={() => setDeleteModalVisible(false)}
          >
            Cancel
            <FontAwesomeIcon className="ml-2 text-xs" icon={angleRight} />
          </p>
          <Button type="submit" text="Sure" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};
