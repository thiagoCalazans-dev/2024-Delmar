import { z } from "zod";

export const Login = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha de ter ao menos 4 digitos"),
});
export type Login = z.infer<typeof Login>;
