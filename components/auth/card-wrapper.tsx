"use client";

import React from "react";
import { Header } from "./cardHeader";
import { BackButton } from "./back-button";


interface cardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper: React.FC<cardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}) => {
  return (
    <div className="bg-white w-96 rounded-lg flex flex-col items-center justify-center p-3 font-semibold font-sans">
      <div>
        <div>
          <Header label={headerLabel} />
        </div>
        {children}
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </div>
    </div>
  );
};
