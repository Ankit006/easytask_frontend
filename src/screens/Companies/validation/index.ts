import { z } from "zod";
export const companyFormValidation = z.object({
  name: z.string().refine((value) => value !== "", {
    message: "Company name is required",
  }),
  address: z.string().refine((value) => value !== "", {
    message: "Address is required",
  }),
  country: z.string().refine((value) => value !== "", {
    message: "Country is required",
  }),
  pinCode: z.string().refine((value) => value !== "", {
    message: "Pin code is required",
  }),
});

export type CompanyFormValueType = z.infer<typeof companyFormValidation>;
