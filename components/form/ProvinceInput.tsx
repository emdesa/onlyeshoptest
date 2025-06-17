import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { provinces } from "@/utils/provinces";

const ProvinceInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = "province";

  return (
    <div className="mb-2">
      <Label className="mb-2 capitalize " htmlFor={name}>
        {name}
      </Label>
      <Select
        defaultValue={defaultValue || provinces[65].PROVINCE_NAME}
        name={name}
        required
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((item) => {
            return (
              <SelectItem key={item.PROVINCE_ID} value={item.PROVINCE_NAME}>
                <span className="capitalize flex items-center gap-4">
                  {item.PROVINCE_NAME}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export default ProvinceInput;
