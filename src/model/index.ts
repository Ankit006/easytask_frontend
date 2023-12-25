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

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface IHeader extends IUser {
  role: "Admin" | "Member";
}
