import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useEffect, useState } from "react";
import { search } from "../../utils/icons";
import { ContactDetails, ContactsList } from "../../utils/types";

type SearchProps = {
  setViewProfileModalVisible: (viewProfileModalVisible: boolean) => void;
  setViewDetails: (viewDetails: ContactDetails) => void;
  setEdit: (edit: string) => void;
  contacts: ContactsList;
};

export const Search = ({
  setViewProfileModalVisible,
  setEdit,
  setViewDetails,
  contacts,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<
    SetStateAction<ContactDetails[]>
  >([]);

  useEffect(() => {
    const results = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm, contacts]);

  const handleSearchResultClick = (contact: ContactDetails) => {
    setViewProfileModalVisible(true);
    setEdit("contact");
    setViewDetails(contact);
    setSearchTerm("");
  };

  return (
    <>
      <div className="m-4  bg-gray-200 rounded-xl">
        <div className="flex items-center">
          <FontAwesomeIcon icon={search} className="p-2 pl-4 text-gray-400" />
          <input
            className="h-12 w-full rounded-r-xl bg-gray-200 text-light-black font-medium"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value.toLowerCase())
            }
          />
        </div>
        {searchTerm && searchResult.length > 0 && (
          <div className="bg-white p-2">
            {Array.isArray(searchResult) &&
              searchResult.map((contact: ContactDetails) => {
                return (
                  <p
                    className="m-2 text-lg text-light-black hover:bg-gray-50 font-medium p-2 cursor-pointer"
                    onClick={() => handleSearchResultClick(contact)}
                    key={contact.id}
                  >
                    {contact.name}
                  </p>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};
