import { Message } from "../../utils/types";

type MessageBoxProps = {
  msg: Message;
  key: number;
};

export const MessageBox = ({ msg }: MessageBoxProps) => {
  return (
    <div
      key={msg.createdAt}
      className={`rounded-3xl border bg-gradient text-white max-w-[40%] m-4 p-4 flex flex-col ${
        msg.status === "sent"
          ? "items-end rounded-br-sm self-end"
          : "rounded-bl-sm self-start items-start"
      }`}
    >
      <p>{msg.message}</p>
    </div>
  );
};
