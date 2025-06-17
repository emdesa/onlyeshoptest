import { fetchLandmarkDetail, editLandmarkAction } from "@/actions/actions";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import FormInput from "@/components/form/FormInput";
import CategoryInput from "@/components/form/CategoryInput";
import ProvinceInput from "@/components/form/ProvinceInput";
import ImageInput from "@/components/form/ImageInput";
import MapWrapper from "@/components/map/MapWrapper";
import { SubmitButton } from "@/components/form/Buttons";

type tParams = Promise<{ id: string }>;

const EditLandmarkPage = async ({ params }: { params: tParams }) => {
  const { id }:{ id: string } = await params;
  const landmark = await fetchLandmarkDetail({ id });

  if (!landmark) return <div>Landmark not found</div>;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Landmark</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={editLandmarkAction}>
          {/* ส่ง id ไปด้วยใน form */}
          <input type="hidden" name="id" value={landmark.id} />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
              defaultValue={landmark.name}
            />

            <CategoryInput defaultValue={landmark.category} />
          </div>

          <TextAreaInput
            name="description"
            defaultValue={landmark.description}
          />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
              defaultValue={landmark.price?.toString()}
            />
            <ProvinceInput defaultValue={landmark.province} />
          </div>

          <ImageInput defaultImage={landmark.image} />

          <MapWrapper defaultLat={landmark.lat} defaultLng={landmark.lng} />

          <SubmitButton text="update landmark" size="lg" />
        </FormContainer>
      </div>
    </section>
  );
};

export default EditLandmarkPage;
