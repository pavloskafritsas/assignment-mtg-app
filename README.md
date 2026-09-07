# Assignment MTG App

A Nuxt 4 client-rendered application demonstrating the use of the `assignment-mtg-ui` component library.

The application provides a team member table with client-side simulated API fetching, pagination, filtering, URL state persistence, and toast feedback.

## Requirements

* Node.js
* Corepack

Enable Corepack:

```bash
corepack enable
```

The repository declares its package manager and version in `package.json`.

## Repository Setup

The application depends on the local assignment-mtg-ui package, so both repositories should be cloned inside the same parent directory.

Expected structure:

```text
assignment-mtg/
├── assignment-mtg-ui/
└── assignment-mtg-app/
```

Clone both repositories into the same directory:

```bash
mkdir assignment-mtg
cd assignment-mtg

git clone <ui-repository-url> assignment-mtg-ui
git clone <app-repository-url> assignment-mtg-app

cd assignment-mtg-app
```
Then install the application dependencies:

```bash
pnpm install
```

The UI library is consumed as a local package dependency from the sibling assignment-mtg-ui repository.

## Dev

Start the development server:

```bash
pnpm dev
```

The application runs with Nuxt SSR disabled and is rendered on the client.

## Environment

The application supports simulated API failures through:

```env
NUXT_PUBLIC_SIMULATE_API_ERRORS=true
```

When enabled, the simulated team member request has a chance of failing. This is used to demonstrate the application's error and toast states.

For deterministic E2E testing, disable simulated failures:

```bash
NUXT_PUBLIC_SIMULATE_API_ERRORS=false pnpm dev
```

## Team Members

The main page displays team members using the `PDataTable` component from the UI library.

The application simulates an asynchronous API request rather than relying on a real backend. The composable responsible for fetching team members exposes loading and error state and returns paginated data.

Pagination is represented in the URL:

```text
/?page=2
```

The URL is the source of truth for the current page, allowing pagination state to survive a page reload.

Filtering by role is also persisted through the route query so that the current view can be shared or restored after navigation/reload.

## UI Library

The application consumes the reusable components from `assignment-mtg-ui` rather than implementing application-specific versions of those components.

Example:

```ts
import {
  PDataTable,
  PToastContainer,
  useToast,
} from 'assignment-mtg-ui'
```

The library stylesheet is loaded globally by Nuxt.

## Testing

The application uses Cypress for end-to-end testing.

Run the E2E suite:

```bash
pnpm test:e2e
```

Open Cypress interactively:

```bash
pnpm test:e2e:open
```

The E2E tests cover important user flows such as:

* pagination updating the URL
* pagination state surviving a reload
* filter state being persisted in the URL

The tests run against the application in a real browser rather than testing Nuxt internals directly.

## Architecture

Application-specific concerns remain in the Nuxt application, while reusable UI behavior remains in the separate `assignment-mtg-ui` package.

The main boundaries are:

* `assignment-mtg-ui` — reusable Vue components, composables, styles, and design tokens
* `assignment-mtg-app` — pages, application state, simulated API/data fetching, routing, and application-specific behavior

The route query is used as the source of truth for persisted table state, keeping pagination and filtering synchronized with the browser URL.
