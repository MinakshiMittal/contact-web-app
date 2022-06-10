export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  email: string;
  name: string;
  number: string;
  whatsApp: string;
  company: string;
  isLoggedIn?: boolean;
  profileURL: string;
};

export type UserInitialState = {
  user: User;
  otherAccounts: string[];
};

export type LoadingInitialState = {
  loading: boolean;
  loadingMessage: string;
};

export type ErrorInitialState = {
  hasErrors: boolean;
  errorMessage: string;
};

export type ToastInitialState = {
  showToast: boolean;
  successMessage: string;
};

export type LoginPayload = {
  type: string;
  payload: LoginCredentials;
};

export type SignUpPayload = {
  type: string;
  payload: SignUpCredentials;
};

export type ContactDetails = {
  id?: string;
  name: string;
  email: string;
  number: string;
  whatsApp: string;
  company: string;
  profileURL: string;
};

export type ContactsList = ContactDetails[];

export type ContactListsInitialState = {
  contacts: ContactsList;
};

export type AddContactPayload = {
  contactDetails: ContactDetails;
  email: string;
  contactsList: ContactsList;
};

export type UpdateContactPayload = {
  contactId: string | undefined;
  email: string | null;
  contactsList: ContactsList;
};

export type UpdateProfilePayload = {
  type: string;
  payload: User;
};

export type DataAsDataUrl = {
  dataUrl: string;
  format: string;
};

export type Message = {
  message: string;
  status: string;
  createdAt: number;
};

export type MessageInitialState = {
  messages: Message[];
  currentChat: {
    messages: Message[];
    receiverEmail: string;
    blocked: boolean;
    receiverName: string;
    receiverNumber: string;
  };
};
export type GetMessagesPayload = {
  email: string;
  receiverEmail: string;
};

export type SendMessagePayload = {
  message: string;
  email: string;
  receiverEmail: string;
  blocked: boolean;
};

export type SetReceiver = {
  receiverEmail: string;
  blocked: boolean;
  receiverName: string;
  receiverNumber: string;
};

export type AddAnotherAccountPayload = {
  email?: string;
  users: string[];
};
