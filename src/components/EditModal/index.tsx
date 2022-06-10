import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, UpdateProfilePictureModal } from "..";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  contactsListSelector,
  editContact,
} from "../../store/slices/contactsListSlice";
import { updateProfile, userSelector } from "../../store/slices/userSlice";
import { addContactDetailsInitialState } from "../../utils/constants";
import {
  validateContactForm,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../../utils/helper";
import { angleRight, camera, close } from "../../utils/icons";
import { ContactDetails } from "../../utils/types";
import { dataChangeHandler } from "./helper";

type EditModalProps = {
  dataToBeEdited: ContactDetails;
  setEditModalVisible: (editModalVisible: boolean) => void;
  edit: string;
  setUpdateProfilePictureModalVisible: (
    updateProfilePictureModalVisible: boolean
  ) => void;
  updateProfilePictureModalVisible: boolean;
};

export const EditModal = ({
  dataToBeEdited,
  setEditModalVisible,
  edit,
  setUpdateProfilePictureModalVisible,
  updateProfilePictureModalVisible,
}: EditModalProps) => {
  const [errors, setErrors] = useState({ ...addContactDetailsInitialState });
  const [updatedData, setUpdatedData] = useState({ ...dataToBeEdited });
  const [url, setUrl] = useState<string | undefined>();

  const { name, email, company, whatsApp, number, profileURL } = dataToBeEdited;
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const contactsList = useAppSelector(contactsListSelector);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dataChangeHandler(event, updatedData, setUpdatedData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateContactForm(updatedData, setErrors);
    if (valid) {
      if (edit === "contact") {
        dispatch(
          editContact({
            contactDetails: updatedData,
            email: user.user.email,
            contactsList: contactsList.contacts,
          })
        );
      } else if (edit === "user") {
        dispatch(updateProfile(updatedData));
      }
      setEditModalVisible(false);
    }
  };
  console.log("co", updatedData);

  const handleEmailOnBlur = () => {
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handleNameOnBlur = () => {
    const error = validateName(name);
    setErrors({ ...errors, name: error });
  };

  const handleNumberOnBlur = () => {
    const error = validatePhoneNumber(number);
    setErrors({ ...errors, number: error });
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal">
          <div className="close-container">
            <FontAwesomeIcon
              className="close"
              icon={close}
              onClick={() => setEditModalVisible(false)}
            />
          </div>
          <div className="flex flex-col mt-32 w-10/12">
            <form onSubmit={handleSubmit}>
              <Input
                value={name}
                id="name"
                placeholder="Name"
                type="text"
                onChange={changeHandler}
                onBlur={handleNameOnBlur}
                error={errors.name}
              />
              <Input
                value={email}
                id="email"
                placeholder="Email"
                type="email"
                onChange={changeHandler}
                onBlur={handleEmailOnBlur}
                error={errors.email}
              />
              <Input
                value={number}
                id="number"
                placeholder="Number"
                type="number"
                onChange={changeHandler}
                onBlur={handleNumberOnBlur}
                error={errors.number}
              />
              <Input
                value={whatsApp}
                id="whatsApp"
                placeholder="WhatsApp"
                type="number"
                onChange={changeHandler}
                onBlur={() => {}}
                error={errors.whatsApp}
              />
              <Input
                value={company}
                id="company"
                placeholder="Company"
                type="text"
                onChange={changeHandler}
                onBlur={() => {}}
                error={errors.company}
              />
              <div className="flex-center cursor-pointer">
                <p
                  className="font-semibold text-purple text-lg flex items-center"
                  onClick={() => setEditModalVisible(false)}
                >
                  Cancel
                  <FontAwesomeIcon className="ml-2 text-xs" icon={angleRight} />
                </p>
                <Button type="submit" text="Continue" />
              </div>
            </form>
          </div>
        </div>
        <div className="absolute w-48 h-48 self-center rounded-full top-0 bg-gray-100 flex shadow-inner-default items-center justify-center">
          <div className="w-36 h-36 border rounded-full shadow-default bg-white bg-home-page">
            {(profileURL || url) && (
              <img
                className="h-full w-full rounded-full"
                src={url ? url : profileURL}
                alt="profile"
              />
            )}
          </div>
          <div
            className="absolute w-14 h-14 cursor-pointer top-0 right-6 bg-white rounded-full shadow-default flex items-center justify-center"
            onClick={() => setUpdateProfilePictureModalVisible(true)}
          >
            <FontAwesomeIcon className="text-purple text-2xl" icon={camera} />
          </div>
        </div>
      </div>
      {updateProfilePictureModalVisible && (
        <UpdateProfilePictureModal
          setUpdateProfilePictureModalVisible={
            setUpdateProfilePictureModalVisible
          }
          setUrl={setUrl}
          setContactDetails={setUpdatedData}
          contactDetails={updatedData}
        />
      )}
    </>
  );
};
