import { getDbConnection } from "./db";

export const Summaries = async (userId: string) => {
  const sqlConnection = await getDbConnection();
  const summaries =
    await sqlConnection`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC`;

  return summaries;
};
