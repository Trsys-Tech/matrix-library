import { Meta, StoryObj } from "@storybook/react/*";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { FormInput } from "./FormInput";
import { Button } from "../button/Button";

const meta = {
  title: "Form/FormInput",
  component: FormInput,
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
} satisfies Meta<typeof FormInput>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(3),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: "" }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mtx-w-96 mtx-flex mtx-flex-col mtx-gap-2 mtx-items-end">
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
    className: "mtx-w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormInput {...args} />
    </FormWrapper>
  ),
};

export const InForm: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    className: "mtx-w-full",
  },
  render: ({ ...args }) => (
    <FormWrapper>
      <FormInput {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export const Numeric: Story = {
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    readOnly: true,
    className: "mtx-w-full",
  },
  tags: ["autodocs"],
  render: ({ ...args }) => (
    <FormWrapper>
      <FormInput {...args} slotProps={{ textFieldProps: { slotProps: { inputProps: { type: "number" } } } }} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
