import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  contactsListSelector,
  deleteContact,
} from "../../store/slices/contactsListSlice";
import { userSelector } from "../../store/slices/userSlice";
import { trash, view } from "../../utils/icons";
import { ContactDetails } from "../../utils/types";

type ContactsTableProps = {
  setViewProfileModalVisible: (viewPrfileModalVisible: boolean) => void;
  setViewDetails: (viewDetails: ContactDetails) => void;
  setEdit: (edit: string) => void;
};

export const ContactsTable = ({
  setViewProfileModalVisible,
  setViewDetails,
  setEdit,
}: ContactsTableProps) => {
  const contactsList = useAppSelector(contactsListSelector);

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const handleView = (contact: ContactDetails) => {
    setViewProfileModalVisible(true);
    setViewDetails(contact);
    setEdit("contact");
  };

  const handleDelete = (contact: ContactDetails) => {
    dispatch(
      deleteContact({
        contactId: contact.id,
        email: user?.user?.email,
        contactsList: contactsList.contacts,
      })
    );
  };

  return (
    <table className="table-fixed m-4 text-center">
      <thead>
        <tr>
          <th className="text-left rounded-l-2xl">Name</th>
          <th className="text-left">Email</th>
          <th className="text-left">Phone Number</th>
          <th className="text-center rounded-r-2xl">Actions</th>
        </tr>
      </thead>
      <tbody className="font-medium text-lg">
        {contactsList?.contacts?.map((contact) => {
          return (
            <tr className="h-12 w-full" key={contact?.id}>
              <td className="p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 border rounded-full mr-2">
                    {contact?.profileURL && (
                      <img
                        src={contact?.profileURL}
                        alt="profile"
                        className="rounded-full w-8 h-8"
                      />
                    )}
                    {!contact?.profileURL && (
                      <p className="text-purple">{contact?.name[0]}</p>
                    )}
                  </div>
                  <div>{contact?.name}</div>
                </div>
              </td>
              <td className="text-left">{contact?.email}</td>
              <td className="text-left">+91 {contact?.number}</td>
              <td>
                <div className="flex items-center justify-center text-purple">
                  <div
                    className="text-purple shadow-default mr-2 w-8 h-8 flex-center rounded-xl cursor-pointer text-md"
                    onClick={() => handleView(contact)}
                  >
                    <FontAwesomeIcon icon={view} />
                  </div>
                  <div className="text-red-500 shadow-default ml-2 w-8 h-8 flex-center rounded-xl cursor-pointer">
                    <FontAwesomeIcon
                      icon={trash}
                      onClick={() => handleDelete(contact)}
                    />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
