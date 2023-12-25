class SourceElement extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "source-element", SourceElement);
    }
  }

  static findMatch = node => {
    const sources = [...node.children].filter(child => child.tagName === 'SCRIPT-SOURCE');
    return sources.find(source => {
      const when = source.attributes['when']?.value;
      const lang = source.attributes['lang']?.value;
      if (!when && !lang) return true;

      const whenMatch = when ? window.matchMedia && window.matchMedia(when).matches : true;
      const langMatch = lang ? navigator.languages.includes(lang) : true;
      return whenMatch && langMatch;
    })
  }

  static appendScript = node => {
    const match = SourceElement.findMatch(node);

    if (!match) return;

    match.setAttribute('active', true);
    const script = document.createElement("script");

    script.type = 'module';
    script.src = match.attributes['src'].value;

    document.getElementsByTagName('head')[0].appendChild(script);

  }

  constructor() {
    super();
    SourceElement.appendScript(this);
  }

  connectedCallback() {
    // Start here...
  }
}

SourceElement.register();
