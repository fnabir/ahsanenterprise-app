import { getDatabaseReference } from "./helpers";
import { remove } from "firebase/database";

export async function deleteFile(fileNo: number, fileYear: number) {
  const fileRef = getDatabaseReference(`files/${fileYear}/${fileNo}`);

  try {
    await remove(fileRef);

    //showToast("Deleted", "Deleted the file successfully.", "success");
  } catch (error) {
    //showToast("Failed", `Failed to delete the file: ${error.message}`, "error");
  }
}
