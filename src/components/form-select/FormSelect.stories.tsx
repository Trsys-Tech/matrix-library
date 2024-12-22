import { Meta, StoryObj } from "@storybook/react/*";
import { FormSelect } from "./FormSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../form/Form";
import { useForm } from "react-hook-form";
import { Button } from "../button/Button";

const meta = {
  title: "Form/FormSelect",
  component: FormSelect,
  args: {
    label: "Label",
    name: "name",
    disabled: false,
    loading: false,
    loadingText: "",
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
} satisfies Meta<typeof FormSelect>;

type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  item: z.string().min(1, "Please select an item"),
});

const FormSelectWrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({ defaultValues: { item: "" }, resolver: zodResolver(formSchema) });
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
    name: "item",
    emptyOptionsText: "Empty",
    placeholder: "Select an item",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    className: "w-96",
  },
  render: ({ ...args }) => (
    <FormSelectWrapper>
      <FormSelect {...args} />
      <Button type="submit">Submit</Button>
    </FormSelectWrapper>
  ),
};

export default meta;
