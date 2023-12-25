export const backendAPI = {
  signup: `/auth/signup`,
  login: `/auth/signin`,
  company: `/company`,
  header: (companyId: string | undefined) => {
    return `${backendAPI.company}/${companyId}/header`;
  },
};
