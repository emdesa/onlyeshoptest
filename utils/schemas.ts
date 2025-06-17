import { z, ZodSchema } from "zod";


// const profileSchema = z.string().min(2,{message:"more then two"});

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "firstName more than two" }),
  lastName: z.string().min(2, { message: "lastName more than two" }),
  userName: z.string().min(2, { message: "userName more than two" }),
});

const validatedImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return file.size <= maxFileSize;
  }, "File size must less then 1MB");
};

export const imageSchema = z.object({
  image: validatedImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must more then 2 character" })
    .max(30, { message: "name must less then 30 character" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "detail must more then 2 character" })
    .max(500, { message: "detail must less then 500 character" }),
  price: z.coerce.number().int().min(0, { message: "price must more then 0" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});


export const validatedWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("❌ Zod Validation Errors", result.error.format());
    const errors = result.error.errors.map((error) => `${error.path.join('.')}: ${error.message}`);
    throw new Error(errors.join(", "));
  }
  return result.data;
};
