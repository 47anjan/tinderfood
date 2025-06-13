"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cuisines } from "@/lib/constants";
import { useSearchParams, useRouter } from "next/navigation";

const CuisinesHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const country = searchParams.get("country");

  const isExist = cuisines.some((item) => item.value === country);

  if (!country || !isExist)
    return (
      <div className="text-lg font-bold text-slate-800">
        We&apos;re sorry, but we don&apos;t have information about cuisines from{" "}
        {country}.
      </div>
    );

  return (
    <div className="flex items-center gap-4 flex-col sm:flex-row justify-between">
      <div>
        <h2 className="font-bold text-xl sm:text-2xl capitalize">
          {country} Cuisines
        </h2>
      </div>
      <div>
        <Select
          onValueChange={(value) => {
            router.push(`/cuisines?country=${value}`);
          }}
          defaultValue={country}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select a Cuisines" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cuisines</SelectLabel>

              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine.id} value={cuisine.value}>
                  {cuisine.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default CuisinesHeader;
