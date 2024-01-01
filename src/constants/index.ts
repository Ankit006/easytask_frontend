export const backendAPI = {
  signup: `/auth/signup`,
  login: `/auth/signin`,
  company: `/company`,
  header: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/header`;
  },
  searchUsers: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/users`;
  },
};

export const backendUrl = "http://localhost:5000";
