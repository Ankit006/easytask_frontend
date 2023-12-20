import { z } from "zod";

const ACCEPTED_IMAGE_TYPE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  companyLogo: z
    .instanceof(File)
    .refine((f) => f.size < 2000000, {
      message: "Max image size is 5MB",
    })
    .refine((f) => ACCEPTED_IMAGE_TYPE.includes(f.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    })
    .optional(),
});

export type CompanyFormValueType = z.infer<typeof companyFormValidation>;
