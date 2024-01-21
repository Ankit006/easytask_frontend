import { z } from "zod";

export const AssignGroupToMemberFormSchema = z.object({
  groupId: z.string(),
});
