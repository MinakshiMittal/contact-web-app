import { useState } from "react";
import { ChatActionModal, DeleteModal, Messages } from "../../components";

export const AllMessages = () => {
  const [chatActionModalVisible, setChatActionModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <>
      <Messages setChatActionModalVisible={setChatActionModalVisible} />
      {chatActionModalVisible && (
        <ChatActionModal
          setChatActionModalVisible={setChatActionModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal setDeleteModalVisible={setDeleteModalVisible} />
      )}
    </>
  );
};
