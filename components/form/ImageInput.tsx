"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

type ImageInputProps = {
  defaultImage?: string;
};

const ImageInput = ({ defaultImage }: ImageInputProps) => {
  const name = "image";
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  // ล้าง URL.createObjectURL เมื่อเปลี่ยนรูป
  useEffect(() => {
    return () => {
      if (preview && !defaultImage) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, defaultImage]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>

      {/* แสดงรูป preview ถ้ามี */}
      {preview && (
        <div className="my-2">
          <img
            src={preview}
            alt="preview"
            className="w-48 h-auto rounded-md border"
          />
        </div>
      )}

      <Input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        required={!defaultImage}
      />
    </div>
  );
};

export default ImageInput;