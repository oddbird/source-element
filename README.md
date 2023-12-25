# `source-element`

A Web Component for conditionally loading scripts based on user-specific
conditions. 

This is inspired by the
[Picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) and
[Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
elements, and wondering what possibilities we could enable by allowing the
browser to determine what JavaScript files to laod.

* We could load translation files only in the user's language.
* We could load a simpler site for users requesting [reduced
  data](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)
  or [reduced
  motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion),
  and a complex Three.js site for everyone else.

As a Web Component, this is still happening after the page loads – but if this
was moved into the browser, we could see even more speed and data improvements.

**[Demo](https://oddbird.github.io/source-element/index.html)**

## Examples

### Media Query

Load separate JavaScript files based on any media query match, in this case
light/dark theme preference.

```html
<script type="module" src="source-element.js"></script>

<source-element>
  <script-source
    src="scripts/dark.js"
    when="(prefers-color-scheme: dark)"
  ></script-source>
  <script-source
    src="scripts/light.js"
    when="(prefers-color-scheme: light)"
  ></script-source>
</source-element>
```

### Language

Load just the needed translations with the `lang` attribute. This looks to see
if an exact match is present in `navigator.languages`.

```html
<script type="module" src="source-element.js"></script>

<source-element>
  <script-source src="scripts/es.js" lang="es"></script-source>
  <script-source src="scripts/de.js" lang="de"></script-source>
  <script-source src="scripts/en.js" lang="en"></script-source>
</source-element>
```

## Fallback

Ideally, we would have a `script` element that would be used as a fallback if
the SourceElement component fails to load. However, it does not seem possible to
have a `script` element in the DOM without loading the script.

For now, you can set a default by not adding any conditions. Because elements
are checked in the order they appear in the DOM, this must be last.

```html
<script type="module" src="source-element.js"></script>

<source-element>
  <script-source src="scripts/es.js" lang="es"></script-source>
  <script-source src="scripts/de.js" lang="de"></script-source>
  <script-source src="scripts/en.js"></script-source>
</source-element>
```

## Features

This Web Component allows you to:

- Check for…

## Installation

You have a few options (choose one of these):

1. ~~Install via [npm](https://www.npmjs.com/package/@oddbird/source-element):
   `npm install @oddbird/source-element`~~ NOT AVAILABLE YET
1. [Download the source manually from GitHub](https://github.com/oddbird/source-element/releases)
   into your project.
1. ~~Skip this step and use the script directly via a 3rd party CDN (not
   recommended for production use)~~ NOT AVAILABLE YET

### Usage

Make sure you include the `<script>` in your project (choose one of these):

```html
<!-- Host yourself -->
<script type="module" src="source-element.js"></script>
```

## Credit

With thanks to the following people:

- [Zach Leatherman](https://zachleat.com) for the conditional inspiration in [is-land](https://github.com/11ty/is-land).
- David Darnes for the [Component Template](https://github.com/daviddarnes/component-template).