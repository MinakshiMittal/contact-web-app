import { ChangeEvent, useState } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Button } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { close } from "../../utils/icons";
import { ContactDetails } from "../../utils/types";
import { useAppDispatch } from "../../store/hooks";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import { setError } from "../../store/slices/errorSlice";

type UpdateProfilePictureModalProps = {
  setUpdateProfilePictureModalVisible: (
    updateProfilePictureModalVisible: boolean
  ) => void;
  setUrl: (url: string | undefined) => void;
  setContactDetails: (contactDetails: ContactDetails) => void;
  contactDetails: ContactDetails;
};

export const UpdateProfilePictureModal = ({
  setUpdateProfilePictureModalVisible,
  setUrl,
  setContactDetails,
  contactDetails,
}: UpdateProfilePictureModalProps) => {
  const [image, setImage] = useState<File>();
  const dispatch = useAppDispatch();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    try {
      dispatch(showLoading("Updating profile picture"));
      const imageRef = ref(storage, `image/${image?.name}`);
      console.log("imgref", imageRef);
      await uploadBytes(imageRef, image as Blob | Uint8Array | ArrayBuffer);
      const imageURL = await getDownloadURL(imageRef);
      console.log(imageURL);
      if (imageURL) {
        dispatch(hideLoading());
        setUrl(imageURL);
        setUpdateProfilePictureModalVisible(false);
        setContactDetails({ ...contactDetails, profileURL: imageURL });
      }
    } catch (error) {
      console.log(error, "err");
      dispatch(setError("Something went wrong. Try again."));
    }
  };
  return (
    <>
      <div className="modal-container">
        <div className="flex flex-col items-center sm:w-3/5 w-11/12 border rounded-xl justify-center bg-white absolute p-4">
          <div className="close-container">
            <FontAwesomeIcon
              className="close"
              icon={close}
              onClick={() => setUpdateProfilePictureModalVisible(false)}
            />
          </div>
          <input
            type="file"
            className="h-12 text-xl rounded-2xl shadow-inner-default placeholder:pl-4 placeholder:text-lg hover:border-purple hover:border pt-2 pl-2 cursor-pointer mb-10 mt-4"
            onChange={handleImageChange}
          />
          <Button
            className="sm:mt-0"
            type="button"
            text="Save"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};
