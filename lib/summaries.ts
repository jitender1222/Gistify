import { getDbConnection } from "./db";

export const Summaries = async (userId: string) => {
  const sqlConnection = await getDbConnection();
  const summaries =
    await sqlConnection`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC`;

  return summaries;
};

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`SELECT 
    id,
    user_id,
    title,
    original_file_url,
    summary_text,
    status,
    created_at,
    updated_at,
    file_name,
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text,' ',''))+ 1 as word_count from pdf_summaries where id=${id}`;
    return summary;
  } catch (error) {
    console.log("Error fetching summary by id", error);
  }
}
