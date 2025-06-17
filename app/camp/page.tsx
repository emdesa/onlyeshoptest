import Link from "next/link";
import { fetchMyLandmarks } from "@/actions/actions";
import MyLandmarkList from "@/components/myLandmark/MyLandmarkList";
import { Button } from "@/components/ui/button"; // ✅ เพิ่มปุ่มจาก shadcn/ui
import { FilePlus2 } from "lucide-react";

const MyLandmarksPage = async () => {
  const landmarks = await fetchMyLandmarks();

  return (
    <main className="p-6">
      {/* ✅ ส่วนหัวพร้อมปุ่ม */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Landmarks</h1>

        {/* ✅ ใช้ Button จาก shadcn และครอบ Link ด้วย asChild */}
        <Button
          asChild
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-sm"
        >
          <Link href="/camp/create"><FilePlus2/> Create Landmark</Link>
        </Button>
      </div>

      <MyLandmarkList landmarks={landmarks} />
    </main>
  );
};

export default MyLandmarksPage;
