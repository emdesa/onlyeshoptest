import { createClient } from "@supabase/supabase-js";

const bucket = "landmark-bucket";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStamp = Date.now();
  const newName = `LeeShop-${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });
  if (!data) throw new Error("image upload failed!!");

  //   const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')

  // console.log(data.publicUrl)
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}

//delete
export async function deleteFileFromStorage(fullUrl: string) {
  const filePath = fullUrl.replace(
    `${url}/storage/v1/object/public/${bucket}/`,
    ""
  );
  if (!filePath) throw new Error("Invalid file path");

  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw new Error("Failed to delete image from storage");
}
