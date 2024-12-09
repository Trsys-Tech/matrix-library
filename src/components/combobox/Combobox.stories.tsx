import React from "react";
import { Meta } from "@storybook/react/*";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { CheckIcon } from "../Icons/CheckIcon";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  args: {},
  tags: ["autodocs"],
};

const cars = [
  { label: "Tesla", value: "Tesla" },
  { label: "Ford", value: "Ford" },
  { label: "Toyota", value: "Toyota" },
  { label: "Mercedes", value: "Mercedes" },
  { label: "Fiat", value: "Fiat" },
  { label: "Nissan", value: "Nissan" },
  { label: "Volkswagen", value: "Volkswagen" },
  { label: "Audi", value: "Audi" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Kia", value: "Kia" },
  { label: "BMW", value: "BMW" },
  { label: "Renault", value: "Renault" },
  { label: "Peugeot", value: "Peugeot" },
  { label: "Opel", value: "Opel" },
  { label: "Citroen", value: "Citroen" },
  { label: "Mazda", value: "Mazda" },
  { label: "Mini", value: "Mini" },
  { label: "Seat", value: "Seat" },
  { label: "Skoda", value: "Skoda" },
  { label: "Smart", value: "Smart" },
  { label: "Honda", value: "Honda" },
  { label: "DS", value: "DS" },
  { label: "Lexus", value: "Lexus" },
  { label: "Polestar", value: "Polestar" },
  { label: "Volvo", value: "Volvo" },
  { label: "Jaguar", value: "Jaguar" },
];

export const Default = () => {
  const [value, setValue] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? cars.find(framework => framework.value === value)?.label : "Select a car..."}
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search for a car..." />
        <ComboboxList>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxGroup>
            {cars.map(car => (
              <ComboboxItem
                key={car.value}
                value={car.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {car.label}
                <CheckIcon className={cn("ml-auto", value === car.value ? "opacity-100" : "opacity-0")} />
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default meta;
