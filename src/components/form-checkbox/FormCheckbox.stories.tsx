import { Meta, StoryObj } from "@storybook/react/*";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../form/Form";
import { Button } from "../button/Button";
import { FormCheckbox } from "./FormCheckbox";

const meta = {
  title: "Form/FormCheckbox",
  component: FormCheckbox,
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
} satisfies Meta<typeof FormCheckbox>;

export type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.boolean().refine(val => val === true, {
    message: "please check the checkbox",
  }),
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { name: false }, resolver: zodResolver(formSchema) });
  const handleSubmit = form.handleSubmit(data => console.log(data));
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mtx-w-96 mtx-flex mtx-flex-col mtx-gap-2">
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
      <FormCheckbox {...args} />
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
      <FormCheckbox {...args} />
      <Button type="submit" className="mtx-w-24">
        Submit
      </Button>
    </FormWrapper>
  ),
};

export default meta;
