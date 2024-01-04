export const backendAPI = {
  signup: `/auth/signup`,
  login: `/auth/signin`,
  company: `/company`,
  user: "/user",
  notifications: "/user/notifications",
  header: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/header`;
  },
  searchUsers: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/users`;
  },
  sendJoinRequest: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/users/request`;
  },
};

export const backendUrl = "http://localhost:5000";
