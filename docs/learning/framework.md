## Nextjs

- Good with various rendering patterns
- Routing is based on file system
- API routes

## Remix

- focus on server side rendering & Remix app needs to run on a server that supports nodejs runtime
  - can be deployed to Node.js server like Express
  - or serverless functions like AWS Lambda or Cloudflare Workers ir Deno Deploy
- route loaders: run on the server and provide data to the component on GET requests
- default export (component): component renders when a route matches the URL. It runs both on the server and the client
- actions: only run on the server and handle POST, PUT, PATCH, and DELETE. They can also provide data to the component
- data flow
  - route loaders provide data to the UI
  - forms post data to route actions that updte persistent state
  - loader data on the page is automaticlaly revalidated
- server vs client code execution
  - remix runs app on the server as well as in the browser. But not all code run in both places
  - during build step, compiler creates a server build and a client build: server build bundles everything into a single module. Client build splits the app up into multiple bundles to optimise loading & removes server code from the bundles
  - action, headers, loader are removed from client build
- performance: using progressive enhancement technique (focus on web content first, allowing people to access the basic content and functionality of a web page, whist users with additional browser features/ faster internet access receive enhanced version later)
  - HTML and JS and Data load in parallet (first byte is when JS first load)

## Astro

- island architecture aka partial/ selective hydration
  - client island: interactive JS UI component hydrated separately from the rest of the page
  - server island: dynamic UI component that is server rendered
- support multiple UI frameworks: React, Svelte, Vue...
- benefits: performance
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
