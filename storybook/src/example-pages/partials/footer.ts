import { children } from "../../components/footer/footer.content.js";
import { footerTemplate } from "../../components/footer/footer.template.js";

export function footerPartial() {
  return footerTemplate({ children: children() });
}
