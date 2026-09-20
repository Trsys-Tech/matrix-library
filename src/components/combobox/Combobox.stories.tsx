import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Combobox, type ComboboxProps } from "./Combobox";
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

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  args: {
    options: cars,
  },
  argTypes: {
    className: {
      control: false,
      description: "Additional classes to apply to the component.",
    },
    loading: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<ComboboxProps<string>>;

type StringStory = StoryObj<ComboboxProps<string>>;
type NumberStory = StoryObj<ComboboxProps<number>>;

const handleExtraAction = fn();

export const Default: StringStory = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithoutSearchInput: StringStory = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Combobox {...args} value={value} onValueChange={setValue} showSearchInput={false} />;
  },
};

const options = [
  { value: 1, label: "one" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
];

const reactElementOptions: ComboboxProps<string>["options"] = [
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Rabbit className="mtx-w-4 mtx-h-4" /> Rabbit
      </span>
    ),
    value: "rabbit",
    keyword: "rabbit",
  },
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Cat className="mtx-w-4 mtx-h-4" /> Cat
      </span>
    ),
    value: "cat",
    keyword: "cat",
  },
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Dog className="mtx-w-4 mtx-h-4" /> Dog
      </span>
    ),
    value: "dog",
    keyword: "dog",
  },
];

const themeOptions: ComboboxProps<string>["options"] = [
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Sun className="mtx-w-4 mtx-h-4" /> Light
      </span>
    ),
    value: "light",
    keyword: "light",
  },
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Moon className="mtx-w-4 mtx-h-4" /> Dark
      </span>
    ),
    value: "dark",
    keyword: "dark",
  },
  {
    label: (
      <span className="mtx-flex mtx-items-center mtx-gap-2">
        <Gear className="mtx-w-4 mtx-h-4" /> System
      </span>
    ),
    value: "system",
    keyword: "system",
  },
];

export const WithNumbers: NumberStory = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return <Combobox {...args} options={options} value={value} onValueChange={setValue} />;
  },
};

export const Clearable: StringStory = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Combobox {...args} value={value} onValueChange={setValue} clearable />;
  },
};

export const WithExtraActions: NumberStory = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <Combobox
        {...args}
        options={options}
        value={value}
        onValueChange={setValue}
        extraContent={
          <Button className="mtx-m-2" onClick={handleExtraAction}>
            Extra Action
          </Button>
        }
      />
    );
  },
};

export const ProgrammaticChanges: StringStory = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [options, setOptions] = useState<{ label: string; value: string }[]>(cars);

    const handleChange = (newValue: string | undefined) => {
      setValue(newValue);
    };

    const handleAddOption = () => {
      setOptions(prev => (prev.some(option => option.value === "new-option") ? prev : [...prev, { label: "New Option", value: "new-option" }]));
    };

    return (
      <div>
        <button type="button" onClick={handleAddOption} className="mtx-m-4 mtx-bg-gray-200 mtx-p-2 mtx-rounded-md">
          Add Option
        </button>
        <button type="button" onClick={() => setValue(undefined)} className="mtx-m-4 mtx-bg-red-200 mtx-p-2 mtx-rounded-md">
          Clear Selection
        </button>
        <Combobox {...args} options={options} value={value} onValueChange={handleChange} />
      </div>
    );
  },
};

export const InModal: StringStory = {
  render: args => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen} title="Modal Title">
          <Combobox {...args} value={value} onValueChange={setValue} modalPopover />
        </Modal>
      </div>
    );
  },
};

export const WithReactElement: StringStory = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <Combobox {...args} options={reactElementOptions} value={value} onValueChange={setValue} modalPopover />;
  },
};

export const ThemeToggle: StringStory = {
  render: args => {
    const [theme, setTheme] = useState("light");

    return <Combobox {...args} options={themeOptions} showSearchInput={false} value={theme} onValueChange={setTheme} />;
  },
};

export default meta;
