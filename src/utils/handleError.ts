import { MainReponse } from "./types"

export const handleError = (error: unknown) => {
  const e = error as MainReponse<undefined>;
  return e.message;
}