
import { createLandmarkAction } from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import ProvinceInput from "@/components/form/ProvinceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import MapWrapper from "@/components/map/MapWrapper";


const CreateLandmark = async () => {

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Landmark
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createLandmarkAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
            />

            <CategoryInput />
          </div>

          <TextAreaInput name="description" />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
            />
            <ProvinceInput />
          </div>

          <ImageInput/>

          <MapWrapper />

          <SubmitButton text="create landmark" size="lg" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateLandmark;
