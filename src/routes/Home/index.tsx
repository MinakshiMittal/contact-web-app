import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  AddAccountModal,
  ClosedSidebar,
  ContactsTable,
  EditModal,
  ExtendedSidebar,
  ManageAccount,
  Search,
  VideoCallModal,
  ViewProfileModal,
} from "../../components";
import { AddContactModal } from "../../components/AddContactModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  contactsListSelector,
  fetchContactsList,
} from "../../store/slices/contactsListSlice";
import { userSelector } from "../../store/slices/userSlice";
import { addContactDetailsInitialState } from "../../utils/constants";
import { addContactIcon } from "../../utils/icons";
import NoContacts from "../../assets/NoContacts.png";

export const Home = () => {
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewProfileModalVisible, setViewProfileModalVisible] = useState(false);
  const [viewDetails, setViewDetails] = useState({
    ...addContactDetailsInitialState,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [edit, setEdit] = useState("");
  const [updateProfilPictureModalVisible, setUpdateProfilePictureModalVisible] =
    useState(false);
  const user = useAppSelector(userSelector);
  const contactsList = useAppSelector(contactsListSelector);
  const dispatch = useAppDispatch();
  const [videoCallModalVisible, setVideoCallModalVisible] = useState(false);
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [manageAccountVisible, setManageAccountVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchContactsList(user.user.email));
  }, [dispatch, user.user.email]);

  return (
    <>
      <div className="flex h-screen w-full flex">
        {!showSidebar && (
          <ClosedSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
        {showSidebar && (
          <ExtendedSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            setViewProfileModalVisible={setViewProfileModalVisible}
            setViewDetails={setViewDetails}
            setEdit={setEdit}
            setAddAccountModalVisible={setAddAccountModalVisible}
            setManageAccountVisible={setManageAccountVisible}
          />
        )}
        <div className="bg-gray-100 w-full flex flex-col">
          <Search
            setViewProfileModalVisible={setViewProfileModalVisible}
            setViewDetails={setViewDetails}
            setEdit={setEdit}
            contacts={contactsList.contacts}
          />
          <div className="flex flex-col bg-white m-4 font-semibold text-light-black">
            <div className="flex items-center justify-between">
              <h1 className="p-4">All Contacts</h1>
              <div className="shadow-default w-7 h-7 rounded-lg flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  className="text-purple cursor-pointer"
                  icon={addContactIcon}
                  onClick={() => setAddContactModalVisible(true)}
                />
              </div>
            </div>
            {contactsList.contacts.length > 0 && (
              <ContactsTable
                setViewProfileModalVisible={setViewProfileModalVisible}
                setViewDetails={setViewDetails}
                setEdit={setEdit}
              />
            )}
          </div>
          {!contactsList.contacts.length && (
            <div className="flex flex-col justify-center items-center w-full h-inherit mt-10">
              <img className="w-40 h-40" src={NoContacts} alt="no contact" />
              <h1>No contact in the account</h1>
            </div>
          )}
        </div>
      </div>
      {addContactModalVisible && (
        <AddContactModal
          setAddContactModalVisible={setAddContactModalVisible}
          setUpdateProfilePictureModalVisible={
            setUpdateProfilePictureModalVisible
          }
          updateProfilePictureModalVisible={updateProfilPictureModalVisible}
        />
      )}
      {viewProfileModalVisible && (
        <ViewProfileModal
          setViewProfileModalVisible={setViewProfileModalVisible}
          details={viewDetails}
          setEditModalVisible={setEditModalVisible}
          setVideoCallModalVisible={setVideoCallModalVisible}
        />
      )}
      {editModalVisible && (
        <EditModal
          dataToBeEdited={viewDetails}
          setEditModalVisible={setEditModalVisible}
          edit={edit}
          setUpdateProfilePictureModalVisible={
            setUpdateProfilePictureModalVisible
          }
          updateProfilePictureModalVisible={updateProfilPictureModalVisible}
        />
      )}
      {videoCallModalVisible && <VideoCallModal />}
      {addAccountModalVisible && (
        <AddAccountModal
          setAddAccountModalVisible={setAddAccountModalVisible}
        />
      )}
      {manageAccountVisible && (
        <ManageAccount
          setManageAccountVisible={setManageAccountVisible}
          setAddAccountModalVisible={setAddAccountModalVisible}
        />
      )}
    </>
  );
};
