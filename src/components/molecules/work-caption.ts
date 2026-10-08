// 作品の説明（説明文・リンク・タグ）を拡大表示の下に描く。Lightbox と EmbedViewer で共通に使う。
// タグ色はフィルターと同じ tagTone() → tag-tones.css → tokens.css を使う。
import { tagTone } from "../../lib/tag-visuals";

export interface WorkCaption {
  description?: string;
  link?: { href: string; label: string };
  tags?: string[];
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string) => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

/** container の中身を caption で置き換える。何も無ければ container を隠す */
export function renderWorkCaption(container: HTMLElement, caption: WorkCaption | undefined): void {
  container.replaceChildren();
  if (!caption) {
    container.hidden = true;
    return;
  }
  if (caption.description) container.append(el("p", "work-caption__description", caption.description));
  if (caption.link) {
    const a = el("a", "work-caption__link", caption.link.label);
    a.href = caption.link.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    container.append(a);
  }
  const meta = el("div", "work-caption__meta");
  for (const tag of caption.tags ?? []) {
    const tagEl = el("span", "work-caption__tag", tag);
    tagEl.dataset.tone = tagTone(tag);
    meta.append(tagEl);
  }
  if (meta.childElementCount > 0) container.append(meta);
  container.hidden = container.childElementCount === 0;
}

/** organism が data-caption に JSON で埋めた説明を読む */
export function readWorkCaption(json: string | undefined): WorkCaption | undefined {
  if (!json) return undefined;
  try {
    return JSON.parse(json) as WorkCaption;
  } catch {
    return undefined;
  }
}
