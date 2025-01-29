/* eslint-disable camelcase */
import { Meta, StoryObj } from "@storybook/react/*";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormDateRangePicker } from "./FormDateRangePicker";

const meta = {
  title: "Form/FormDateRangePicker",
  component: FormDateRangePicker,
  args: {
    label: "label",
    name: "name",
    disabled: false,
    control: undefined,
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
} satisfies Meta<typeof FormDateRangePicker>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  dateRange: z.object(
    {
      from: z.date({ required_error: "From date is required" }),
      to: z.date({ required_error: "To date is required" }),
    },
    { message: "Date range is required" },
  ),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { dateRange: undefined }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-56 flex flex-col gap-2 items-end">
        {children}
      </form>
    </Form>
  );
};

export const Default: Story = {
  args: {
    label: "Label",
    name: "dateRange",
    disabled: false,
    className: "w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDateRangePicker {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "dateRange",
    disabled: false,
    className: "w-96",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormDateRangePicker {...args} />
      <Button type="submit" className="w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
