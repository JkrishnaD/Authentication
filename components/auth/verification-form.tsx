"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
        return;
      })
      .catch((error) => {
        setError("Something Went Wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <>
      <CardWrapper
        headerLabel="Confirm Your Verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back To Login"
      >
        <div className="flex justify-center w-full flex-col gap-y-2 items-center py-4">
          {!success && !error && <BeatLoader color="#ff7a00" />}
          <FormSuccess message={success} />
          
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </>
  );
};
