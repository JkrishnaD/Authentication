import { BsExclamationTriangle } from "react-icons/bs";

interface formErrorProps {
  message?: string;
}
export const FormError = ({ message }: formErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div
      className="bg-red-500/15 p-2 rounded flex 
    items-center font-sans justify-start text-center text-red-500 "
    >
      <BsExclamationTriangle className="h-4 w-4" />
      <p className="text-red-500 text-sm px-2">{message}</p>
    </div>
  );
};
