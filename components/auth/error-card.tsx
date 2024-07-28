import { CardHeader } from "@nextui-org/react";
import { Header } from "./cardHeader";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <div>
      <CardWrapper headerLabel="Oops!! Something Went Wrong"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
      children 
      >
      </CardWrapper>
    </div>
  );
};
