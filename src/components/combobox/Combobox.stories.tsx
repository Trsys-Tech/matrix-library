import { Meta, StoryObj } from "@storybook/react/*";

import { Combobox } from "./Combobox";

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
  render: ({ ...props }) => {
    return <Combobox {...props} />;
  },
};

export const WithoutSearchInput: StoryObj<typeof meta> = {
  args: {
    showSearchInput: false,
  },
  render: ({ ...props }) => {
    return <Combobox {...props} />;
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
    return <Combobox {...props} />;
  },
};

export const Clearable: StoryObj<typeof meta> = {
  args: {
    clearable: true,
  },
  render: ({ ...props }) => {
    return <Combobox {...props} />;
  },
};

export default meta;
