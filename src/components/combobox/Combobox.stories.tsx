import React from "react";
import { Meta } from "@storybook/react/*";

import { cn } from "../../lib/utils";
import { Button } from "../button/Button";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from "./Combobox";
import { Check, ChevronDown } from "@trsys-tech/matrix-icons";

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
        <Button
          variant="text"
          role="combobox"
          aria-expanded={open}
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-sm border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:outline-none focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-text-300 disabled:border-none [&>span]:line-clamp-1 [&_svg]:disabled:text-text-300"
        >
          {value ? cars.find(car => car.value === value)?.label : "Select a car..."}
          <ChevronDown className="opacity-50" />
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
                <Check className={cn("ml-auto", value === car.value ? "opacity-100" : "opacity-0")} />
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default meta;
