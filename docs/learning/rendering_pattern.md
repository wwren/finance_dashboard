# Rendering pattern

UX measurement: Core Web Vitals (CWV). Optimising CWV optimise user experience and SEO.

## Web vitials

- time to first byte
- first contentful paint
- largest contentful paint
- time to interactive

## Developer experience:

- fast build times
- low server costs
- dynamic content
- easy rollbacks

> Performance is a mix of web vitals and developer experience

## Terminology

- Rendering
- Server-side rendering: rendering an app on the server to send HTML, rather than JS to the client
- Client-side rendering: rendering an app in a browser, using JS to modify the DOM
- hydration/ rehydration: static HTML gets 'hydrated' by JS functionality (JS attaches event listeners and makes components interactive)
- Prerendering: running a client-side application at build time to generate HTML files

## Rendering patterns Overview

- SSR
- ISR
- SSG
- CSR
- RSC

### Static rendering

- HTML for the entire page gets generated at build time and does not change until the next build
- HTML content is static and cacheable on CDN
- most suitable for pages do not change often and display the same data no matterh who requests them

#### Variation of static rendering to cater dynamic/ customised content

- Plain static rendering
- Static with client-side fetch
  - Best for pages that: data that should refresh on every page load
  - Examples:
    - user-specific: profile page
- Incremental static regeneration
  - Best for pages that should be generated on a certain interval/ on-demand
- On-demand ISR
  - pages regenerated on certain events
