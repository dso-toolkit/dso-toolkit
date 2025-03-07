import { Templates } from "../../templates";
import { children } from "../../components/footer/footer.content";

export function footerPartial(templates: Templates) {
  const { footerTemplate } = templates;
  return footerTemplate({ children: children(templates) });
}
