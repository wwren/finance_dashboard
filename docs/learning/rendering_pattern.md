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
  - Disadvantages:
    - strong possibility of layout shift, if the size of the skeleton UI does not match the content rendered eventually
    - high server costs: call API once per page request
    - LCP is bad since the largest content can only be displayed after the API call
- Static with getStaticProps
  - Access the data provider and fetch data at build time on the server - generate the HTML with the data on the server, so a skeleton component is not required while the data loads, as the page will be rendered with the data
  - Downside: for sites with hundreds of pages built statically, calling getStaticProps for each page can result in long build time. If using external API can run a large usage bill. Also, renewing data requires a new build (use ISR)
- Incremental static regeneration
  - ISR is hybrid - allows to pre-render only certain static pages and render the dynamic pages on-demand when user request them
  - Best for pages that should be generated on a certain interval/ on-demand
- On-demand ISR
  - pages regenerated on certain events

### Server-side rendering

SSR generate the HTML for every request. Most suitable for pages containing highly personalised data - data based on user cookie/ data obtained from the user's request. Also suitable for pages that should be render-blocking, maybe based on authentication state. Downside: TTFB is bad, as the server needs to generate the HTML for every request.

## Conclusion

On-demand ISR for the main dashboard page (on-demand for any data change - new stocks added to the list or removed from the list). UI: clicking on the refresh button will run the API to generate a new stock list, check if any changes from the last one. If so, update the list & frontend listen to such webhook event.
