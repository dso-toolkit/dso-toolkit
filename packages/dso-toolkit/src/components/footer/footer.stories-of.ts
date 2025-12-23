import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { Footer } from "./footer.models.js";

interface FooterStories {
  Footer: StoryObj<Record<string, never>, Renderer>;
}

export interface FooterTemplates<TemplateFnReturnType> {
  footerTemplate: (footer: Footer<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
}

interface FooterStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  FooterTemplates<TemplateFnReturnType>
> {}

export function footerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function footerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: FooterStoriesParameters<Implementation, Templates, TemplateFnReturnType>): FooterStories {
  return {
    Footer: {
      render: templateContainer.render(storyTemplates, (_args, { footerTemplate, children }) =>
        footerTemplate({ children }),
      ),
    },
  };
}
