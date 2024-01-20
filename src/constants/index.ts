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
  memberData: (companyId: string | undefined, memberId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/member/${memberId}`;
  },
  group: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/group`;
  },
  removeGroup: (companyId: string | undefined, groupdId: string) => {
    return `${backendAPI.company}/${companyId}/group/delete/${groupdId}`;
  },
  assignMemberToGroup: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/group/member`;
  },
  removeMemberFromGroup: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/group/member/remove`;
  },
  removeNotification: (notificationId: string) => {
    return `/user/remove-notifcation?notificationId=${notificationId}`;
  },
};

export const backendUrl = "http://localhost:5000";
