import { children } from "../../components/footer/footer.content";
import { Templates } from "../../templates";

export function footerPartial(templates: Templates) {
  const { footerTemplate } = templates;
  return footerTemplate({ children: children(templates) });
}
