import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { camera, close, edit, message, phone, video } from "../../utils/icons";
import WhatsApp from "../../assets/WhatsApp.png";
import Gmail from "../../assets/Gmail.png";
import Company from "../../assets/Company.png";
import { ContactDetails, User } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userSelector } from "../../store/slices/userSlice";
import {
  getOneUserMessagesSuccess,
  setReceiver,
} from "../../store/slices/messagesSlice";
import { useEffect } from "react";
import { db } from "../../firebase";
import { setUserAPI, trimEmail } from "../../services/apiMessages";

type ViewProfileModalProps = {
  setViewProfileModalVisible: (viewProfileModalVisible: boolean) => void;
  details: ContactDetails | User;
  setEditModalVisible: (editModalVisible: boolean) => void;
  setVideoCallModalVisible: (videoCallModalVisible: boolean) => void;
};

export const ViewProfileModal = ({
  setViewProfileModalVisible,
  details,
  setEditModalVisible,
  setVideoCallModalVisible,
}: ViewProfileModalProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEditModalVisible(true);
    setViewProfileModalVisible(false);
  };

  useEffect(() => {
    db.ref(
      `/chats/${trimEmail(user?.user?.email)}/${trimEmail(details?.email)}`
    ).on("value", (snapshot) => {
      if (snapshot.exists()) {
        let messages = snapshot.val();
        messages = Object.values(messages);
        dispatch(
          setReceiver({
            receiverEmail: details?.email,
            receiverName: details?.name,
            receiverNumber: details?.number,
            blocked: messages[messages.length - 1].blocked,
          })
        );
        messages.length = messages.length - 1;
        dispatch(getOneUserMessagesSuccess(messages));
      } else {
        setUserAPI({ email: user?.user?.email, receiverEmail: details?.email });
        dispatch(getOneUserMessagesSuccess([]));
      }
    });
    return () => {};
  }, []);

  const handleMessages = async (details: ContactDetails) => {
    navigate("/all-messages");
    setViewProfileModalVisible(false);
  };

  const handleVideoClick = () => {
    setViewProfileModalVisible(false);
    setVideoCallModalVisible(true);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div
          className="close-container"
          onClick={() => setViewProfileModalVisible(false)}
        >
          <FontAwesomeIcon className="close" icon={close} />
        </div>
        <h1 className="font-semibold text-light-black text-3xl mt-20">
          {details?.name}
        </h1>
        <h2 className="text-gray-500 text-lg font-medium">
          +91 {details?.number}
        </h2>
        <div className="flex-center m-4">
          <div className="w-16 h-16 self-center rounded-full top-0 bg-white  shadow-inner-default flex-center m-4">
            <div className="w-12 cursor-pointer flex-center h-12 border rounded-full shadow-default bg-white text-blue text-xl">
              <FontAwesomeIcon icon={phone} />
            </div>
          </div>
          <div className="w-16 h-16 self-center rounded-full top-0 bg-white shadow-inner-default  flex-center m-4">
            <div
              className="w-12 cursor-pointer flex-center h-12 border rounded-full shadow-default bg-white text-purple text-xl"
              onClick={handleVideoClick}
            >
              <FontAwesomeIcon icon={video} />
            </div>
          </div>
          <div className="w-16 h-16 self-center rounded-full top-0 bg-white  shadow-inner-default flex-center m-4">
            <div
              className="w-12 cursor-pointer flex-center h-12 border rounded-full shadow-default bg-white text-emerald-600 text-2xl"
              onClick={() => handleMessages(details)}
            >
              <FontAwesomeIcon icon={message} />
            </div>
          </div>
          <div className="w-16 h-16 self-center rounded-full top-0 bg-white  shadow-inner-default flex-center m-4">
            <div
              className="w-12 cursor-pointer flex-center h-12 border rounded-full shadow-default bg-white text-yellow-600 text-xl"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={edit} />
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="flex-center m-10">
          <div className="flex items-center">
            <div className="w-8 h-8 shadow-default rounded-lg flex-center m-6">
              <img src={WhatsApp} alt="whatsapp icon" />
            </div>
            <div>
              <p className="text-sm font-normal text-light-black">WhatsApp</p>
              <p className="font-medium text-light-black">
                {details?.whatsApp}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 shadow-default rounded-lg flex-center m-6">
              <img src={Gmail} alt="whatsapp icon" />
            </div>
            <div>
              <p className="text-sm font-normal text-light-black">Email</p>
              <p className="font-medium text-light-black">{details?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 shadow-default rounded-lg flex-center text-2xl m-6">
              <img src={Company} alt="whatsapp icon" className="w-10" />
            </div>
            <div>
              <p className="text-sm font-normal text-light-black">Company</p>
              <p className="font-medium text-light-black">{details?.company}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-48 h-48 self-center rounded-full top-16 bg-gray-100 flex shadow-inner-default items-center justify-center">
        <div className="w-36 h-36 border rounded-full shadow-default bg-white bg-home-page flex-center">
          {details?.profileURL && (
            <img
              className="h-full w-full rounded-full"
              src={details?.profileURL}
              alt="profile"
            />
          )}
          {!details?.profileURL && (
            <p className="text-purple text-7xl font-medium">{details?.name[0]}</p>
          )}
        </div>
        <div className="absolute w-14 h-14 cursor-pointer top-0 right-6 bg-white rounded-full shadow-default flex items-center justify-center">
          <FontAwesomeIcon className="text-purple text-2xl" icon={camera} />
        </div>
      </div>
    </div>
  );
};
