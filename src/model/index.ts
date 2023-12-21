interface ImageType {
  fileId: string;
  url: string;
}

export interface ICompany {
  _id: string;
  name: string;
  address: string;
  country: string;
  pinCode: string;
  adminId: string;
  members: string[];
  logo: ImageType | null;
}
