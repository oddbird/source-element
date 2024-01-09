import conditionMatch from "./condition-match.js";
class SourceElement extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "source-element", SourceElement);
    }
  }

  findMatch() {
    const sources = [...this.children].filter(child => child.tagName === 'SCRIPT-SOURCE');
    return sources.find(source => {
      const withMedia = source.attributes['when']?.value;
      const withLang = source.attributes['lang']?.value;
      const withHash = source.attributes['hash']?.value;
      const withParam = source.attributes['param']?.value;
      const withParamValue = source.attributes['paramValue']?.value;
      const withSupport = source.attributes['support']?.value;
      return conditionMatch({
        withMedia,
        withLang,
        withHash,
        withParam,
        withParamValue,
        withSupport,
      });
    })
  }

  appendScript() {
    const match = this.findMatch();
    if (!match) return;

    match.setAttribute('active', '');
    const script = document.createElement("script");

    script.type = 'module';
    script.src = match.attributes['src'].value;

    document.getElementsByTagName('head')[0].appendChild(script);

  }

  constructor() {
    super();
    this.appendScript();
  }

  connectedCallback() {
    // Start here...
  }
}

SourceElement.register();
