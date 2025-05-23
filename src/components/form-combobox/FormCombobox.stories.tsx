import { Meta, StoryObj } from "@storybook/react/*";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { FormCombobox } from "./FormCombobox";
import { Button } from "../button/Button";
import { useMemo } from "react";

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

const meta = {
  title: "Form/FormCombobox",
  component: FormCombobox,
  args: {
    label: "label",
    name: "name",
    disabled: false,
    control: undefined,
    options: cars,
  },
  argTypes: {
    control: {
      table: {
        disable: true,
      },
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormCombobox>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: "" }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-2 items-end">
        {children}
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    placeholder: "Select a car...",
    className: "w-full",
    slotProps: {},
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormCombobox {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    className: "w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormCombobox {...args} />
      <Button type="submit" className="w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export const ProgrammaticChanges = () => {
  const formSchema = useMemo(
    () =>
      z.object({
        name: z.number({ message: "Name is required" }),
      }),
    [],
  );
  const options = useMemo(
    () => [
      { value: 1, label: "one" },
      { value: 2, label: "two" },
      { value: 3, label: "three" },
    ],
    [],
  );
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: undefined as unknown as number }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-2 items-end">
        <FormCombobox label="Label" name="name" disabled={false} options={options} className="w-full" clearable={true} />
        <Button type="submit" className="w-24">
          Submit
        </Button>
        <Button
          type="button"
          className="w-24"
          onClick={() => {
            form.setValue("name", 1);
          }}
        >
          Set One
        </Button>
        <Button
          type="button"
          className="w-24"
          onClick={() => {
            form.setValue("name", undefined as unknown as number);
          }}
        >
          Clear Name
        </Button>
      </form>
    </Form>
  );
};

export default meta;
