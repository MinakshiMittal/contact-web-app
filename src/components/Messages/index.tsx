import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { MessageBox } from "..";
import { db } from "../../firebase";
import { sendMessageAPI, trimEmail } from "../../services/apiMessages";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getOneUserMessagesSuccess,
  messagesSelector,
} from "../../store/slices/messagesSlice";
import { userSelector } from "../../store/slices/userSlice";
import {
  angleLeft,
  bars,
  ellipsisVertical,
  phone,
  send,
} from "../../utils/icons";

type MessagesProps = {
  setChatActionModalVisible: (chatactionModalVisible: boolean) => void;
};

export const Messages = ({ setChatActionModalVisible }: MessagesProps) => {
  const [msg, setMsg] = useState("");
  const [blocked, setBlocked] = useState(false);
  const messages = useAppSelector(messagesSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleSendMessage = async () => {
    setMsg("");
    console.log("blocked", messages.blocked);
    db.ref(
      `/chats/${trimEmail(messages?.receiverEmail)}/${trimEmail(
        user?.user?.email
      )}/blocked`
    ).on("value", (snapshot) => setBlocked(snapshot.val().blocked));
    sendMessageAPI({
      message: msg,
      email: user?.user?.email,
      receiverEmail: messages?.receiverEmail,
      blocked,
    });
    db.ref(
      `/chats/${trimEmail(user?.user?.email)}/${trimEmail(
        messages?.receiverEmail
      )}/`
    ).on("value", (snapshot) => {
      if (snapshot.exists()) {
        let messages = snapshot.val();
        messages = Object.values(messages);
        messages.length = messages.length - 1;
        dispatch(getOneUserMessagesSuccess(messages));
      }
    });
  };

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="h-24 bg-white flex items-center justify-between p-4 w-full">
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={bars}
            className="text-purple text-2xl font-bold shadow-default cursor-pointer ml-2 mr-6"
          />
          <div className="shadow-default cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center mr-4 bg-white">
            <FontAwesomeIcon
              icon={angleLeft}
              className="text-purple  text-lg"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-light-black">
              {messages.receiverName}
            </h1>
            <p className="text-light-black text-sm">
              +91 {messages.receiverNumber}
            </p>
          </div>
        </div>
        <div className="flex-center">
          <div className="shadow-default cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center mr-4 bg-white">
            <FontAwesomeIcon icon={phone} className="text-purple  text-lg" />
          </div>
          <div
            className="shadow-default cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center mr-4 bg-white"
            onClick={() => setChatActionModalVisible(true)}
          >
            <FontAwesomeIcon
              icon={ellipsisVertical}
              className="text-purple text-lg"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col ">
        {messages?.messages?.map((msg) => {
          return <MessageBox msg={msg} key={msg.createdAt} />;
        })}
      </div>
      <div className="fixed bottom-2 right-2 w-full flex items-center justify-center">
        <input
          type="text"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
          placeholder={
            messages.blocked
              ? "You blocked the user. You can't send any more messages."
              : "Type a message"
          }
          className="w-11/12 h-12 text-xl rounded-[12px] shadow-inner-default placeholder:pl-4 placeholder:text-lg hover:border-purple hover:border-2 mr-2"
          disabled={messages.blocked ? true : false}
        />

        <button
          type="button"
          className="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon
            icon={send}
            className="text-white text-xl cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};
