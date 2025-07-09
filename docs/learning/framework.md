## Nextjs

- Good with various rendering patterns
- Routing is based on file system
- API routes

## Remix

## Astro

- Island architecture aka partial/ selective hydration
  - client island: interactive JS UI component hydrated separately from the rest of the page
  - server island: dynamic UI component that is server rendered
- support multiple UI frameworks: React, Svelte, Vue...
- Benefits: performance
  - JS load is smaller
  - parallel loading: low-priority island doesn't block the high-priority island. Two load in parallel and hydrate in isolation

## Gatsby

- all Gatsby pages are hydrated into React
- static pages:
  - automatically: pages under src/pages folder
  - programaticlaly: pages created using createPage API
- hybrid app pages: static pages + pages make external services and APIs in order to make interactive and dynamic behaviour
- client only routes: pages that are not pre-generated at build time
  - single page application using React Router uses client only routes
  - client route vs dynamic route
    - client route is about how the routing is handled
    - dynamic route are routes with variable parts
- data fetching happens at build time & also run time
  - build time to use useStaticQuery
  - run time to use fetch
- rendering options:
  - static generation: pages are generated at build server & loaded to CDN. build server is gone after build
    - also support incremental builds so subsequent builds only rebuild the parts of site that changes
  - deferred static generation: defer building certain pages until the first time a user requests it => site's build time is optimised
    - build server needs to keep running after the intial build
  - server-side rendering: page built on the server on each page request - better SEO
