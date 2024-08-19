import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <div>
      <CardWrapper headerLabel="Oops!! Something Went Wrong"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"      >
      </CardWrapper>
    </div>
  );
};
