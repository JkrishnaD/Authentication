import { CiCircleCheck } from "react-icons/ci";

interface formSuccessProps {
  message?: string;
}
export const FormSuccess = ({ message }: formSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div
      className="bg-emerald-500/15 p-2 rounded flex 
    items-center font-sans justify-start text-center text-emerald-500 "
    >
      <CiCircleCheck className="h-5 w-5" />
      <p className="text-emerald-500 text-sm px-2">{message}</p>
    </div>
  );
};
