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
  profilePic: ImageType | null;
}

export interface ICompanyMember extends IUser {
  role: "Admin" | "Member";
}

export interface ISearchedUser extends IUser {
  isMember: boolean;
}

export interface IJoinRequestNotification {
  _id: string;
  type: "JOIN_REQUEST";
  companyDetail: {
    companyLogo: null | ImageType;
    companyName: string;
  };
  buttonAction: {
    accept: string;
    cancel: string;
  };
  timestamp: string;
}
