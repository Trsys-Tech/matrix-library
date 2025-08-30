import { Meta, StoryObj } from "@storybook/react/*";

import { Combobox } from "./Combobox";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";
import { Cat, Dog, Moon, Rabbit, Sun } from "lucide-react";
import { Gear } from "@trsys-tech/matrix-icons";

const cars: { label: string; value: string }[] = [
  { label: "Tesla", value: "tesla" },
  { label: "Ford", value: "ford" },
  { label: "Toyota", value: "toyota" },
  { label: "Mercedes", value: "mercedes" },
  { label: "Fiat", value: "fiat" },
  { label: "Nissan", value: "nissan" },
  { label: "Volkswagen", value: "volkswagen" },
  { label: "Audi", value: "audi" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Kia", value: "kia" },
  { label: "BMW", value: "BMW" },
  { label: "Renault", value: "renault" },
  { label: "Peugeot", value: "peugeot" },
  { label: "Opel", value: "opel" },
  { label: "Citroen", value: "citroen" },
  { label: "Mazda", value: "mazda" },
  { label: "Mini", value: "mini" },
  { label: "Seat", value: "seat" },
  { label: "Skoda", value: "skoda" },
  { label: "Smart", value: "smart" },
  { label: "Honda", value: "honda" },
  { label: "DS", value: "DS" },
  { label: "Lexus", value: "lexus" },
  { label: "Polestar", value: "polestar" },
  { label: "Volvo", value: "volvo" },
  { label: "Jaguar", value: "jaguar" },
];

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  args: {
    options: cars,
  },
  argTypes: {
    loading: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

export const Default: StoryObj<typeof meta> = {
  args: {},
  render: props => {
    return <Combobox options={cars} {...props} />;
  },
};

export const WithoutSearchInput: StoryObj<typeof meta> = {
  args: {
    showSearchInput: false,
  },
  render: ({ ...props }) => {
    return <Combobox options={cars} {...props} />;
  },
};

const options = [
  { value: 1, label: "one" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
];

export const WithNumbers: StoryObj<typeof meta> = {
  args: {
    options,
  },
  render: ({ ...props }) => {
    return <Combobox options={options} {...props} />;
  },
};

export const Clearable: StoryObj<typeof meta> = {
  args: {
    clearable: true,
  },
  render: ({ ...props }) => {
    return <Combobox options={cars} {...props} />;
  },
};

export const ProgrammaticChanges = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(cars);

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue);
  };

  const handleAddOption = () => {
    setOptions(prev => [...prev, { label: "New Option", value: "new-option" }]);
  };

  return (
    <div>
      <button onClick={handleAddOption} className="m-4 bg-gray-200 p-2 rounded-md">
        Add Option
      </button>
      <button onClick={() => setValue(undefined)} className="m-4 bg-red-200 p-2 rounded-md">
        Clear Selection
      </button>
      <Combobox options={options} value={value} onValueChange={handleChange} />
    </div>
  );
};

export const InModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={handleOpenChange} title="Modal Title">
        <Combobox options={cars} modalPopover />
      </Modal>
    </div>
  );
};

export const WithReactElement = () => {
  const options = [
    {
      label: (
        <span className="flex items-center gap-2">
          <Rabbit className="w-4 h-4" /> Rabbit
        </span>
      ),
      value: "rabbit",
      keyword: "rabbit",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <Cat className="w-4 h-4" /> Cat
        </span>
      ),
      value: "cat",
      keyword: "cat",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <Dog className="w-4 h-4" /> Dog
        </span>
      ),
      value: "dog",
      keyword: "dog",
    },
  ];
  return (
    <div>
      <Combobox options={options} modalPopover />
    </div>
  );
};

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const comboboxOptions = [
    {
      label: (
        <span className="flex items-center gap-2">
          <Sun className="w-4 h-4" /> Light
        </span>
      ),
      value: "light",
      keyword: "light",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <Moon className="w-4 h-4" /> Dark
        </span>
      ),
      value: "dark",
      keyword: "dark",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <Gear className="w-4 h-4" /> System
        </span>
      ),
      value: "system",
      keyword: "system",
    },
  ];
  console.log(theme);

  return <Combobox options={comboboxOptions} showSearchInput={false} value={theme} onValueChange={value => setTheme(value)} />;
}

export default meta;
