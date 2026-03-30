import type { Preview } from "@storybook/react";
import "../src/index.css";
import { Title, Subtitle, Primary, Controls, Stories, useOf, Markdown, DocsContext } from "@storybook/blocks";
import { useContext } from "react";

const getDescriptionFromResolvedOf = (resolvedOf: any) => {
  switch (resolvedOf.type) {
    case "story": {
      return resolvedOf.story.parameters.docs?.description?.story || null;
    }
    case "meta": {
      const { parameters, component } = resolvedOf.preparedMeta;
      const metaDescription = parameters.docs?.description?.component;
      if (metaDescription) {
        return metaDescription;
      }
      return (
        parameters.docs?.extractComponentDescription?.(component, {
          component,
          parameters,
        }) || null
      );
    }
    case "component": {
      const {
        component,
        projectAnnotations: { parameters },
      } = resolvedOf;
      return (
        parameters.docs?.extractComponentDescription?.(component, {
          component,
          parameters,
        }) || null
      );
    }
    default: {
      throw new Error(`Unrecognized module type resolved from 'useOf', got: ${resolvedOf.type}`);
    }
  }
};

const ModifiedDescription = (props: any) => {
  const { of } = props;

  if ("of" in props && of === undefined) {
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  }
  const resolvedOf = useOf(of || "meta");

  // if @param exists, only show description up to @param
  let description = getDescriptionFromResolvedOf(resolvedOf);

  if (description) {
    description = description.split("@param")[0];
  }

  return <Markdown>{description}</Markdown>;
};

const CustomDocsPage = () => {
  const { componentStories } = useContext(DocsContext);
  const visibleStories = componentStories();
  return (
    <>
      <Title />
      <Subtitle />
      <ModifiedDescription />
      <Primary />
      <Controls />
      {visibleStories.length > 1 && <Stories />}
    </>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: CustomDocsPage,
    },
  },
};

export default preview;
