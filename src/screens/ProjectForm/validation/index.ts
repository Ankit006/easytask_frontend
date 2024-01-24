import { z } from "zod";

export const createProjectFormSchema = z.object({
  name: z.string().refine((data) => data !== "", {
    message: "Project name is required",
  }),
  projectDesc: z.string().refine((data) => data !== "", {
    message: "Project description is required",
  }),
  projectCost: z.string().refine((data) => data !== "", {
    message: "Project cost is required",
  }),
  projectDeadLine: z.string().refine((data) => data !== "", {
    message: "Project dead line date is required",
  }),
});
