import React from "react";

export interface IMutationValues {
  name: string;
  address: string;
  country: string;
  pinCode: string;
}

export type CreateCompanyFormDialogProps = {
  setOpenCompanyFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
