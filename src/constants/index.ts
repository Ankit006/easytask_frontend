export const backendAPI = {
  signup: `/auth/signup`,
  login: `/auth/signin`,
  company: `/company`,
  user: "/user",
  notifications: "/user/notifications",
  joinCompany: "/user/join-company",
  header: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/header`;
  },
  searchUsers: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/users`;
  },
  sendJoinRequest: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/users/request`;
  },
  memberList: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/members`;
  },
  group: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/group`;
  },
  removeNotification: (notificationId: string) => {
    return `/user/remove-notifcation?notificationId=${notificationId}`;
  },
};

export const backendUrl = "http://localhost:5000";
