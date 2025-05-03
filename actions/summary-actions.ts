"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  console.log("summary", summaryId);
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();
    const result = await sql`
    DELETE FROM pdf_summaries 
    WHERE id = ${summaryId} AND user_id = ${userId} 
    RETURNING id
  `;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    console.log("result", result);
    return { success: false };
  } catch (error) {
    console.log("error", error);
    return { success: false };
  }
}
