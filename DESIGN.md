# Design

## Architecture

The project is split into two repositories with a clear boundary between reusable UI and application-specific behavior.

`assignment-mtg-ui` contains Vue 3 components, composables, design tokens, and styles. It does not import from the application.

`assignment-mtg-app` is the Nuxt consumer and owns pages, routing, application state, data fetching, and application-specific behavior.

The UI library is intentionally built on standard Vue 3 APIs rather than Nuxt-specific APIs, allowing it to be consumed by Vue applications and Vue-based frameworks such as Nuxt.

## Component Architecture

Components use a small, consistent API based on typed props, slots, and emits.

`POverlay` is the shared primitive for overlay behavior. Components such as `PSelect` and `PModal` can build on it instead of duplicating concerns such as teleporting, backdrop handling, positioning, and scroll locking.

`PSelect` uses a button as its trigger and a teleported listbox for the options. Its keyboard behavior is implemented at the component level because selection semantics are different from generic overlay behavior.

`PDataTable` uses a slot-driven API so consumers control cell presentation while the table owns structure, pagination, and table behavior.

Toast state is shared through the toast composable, with `PToastContainer` responsible for rendering the active queue.

## TypeScript and Public API

The public package entry point exports components, composables, and public types. Internal utilities remain private to the package.

Component props use explicit TypeScript interfaces and generic types where they provide useful inference. For example, `PSelect<T>` keeps the option value and `v-model` value type aligned.

The library avoids exposing implementation details as part of its public API.

## Accessibility

Accessibility is handled as part of the component implementation rather than left to consumers.

Form controls generate IDs for labels and supporting content and use `aria-describedby` and `aria-invalid` where appropriate.

`PSelect` exposes combobox/listbox semantics and supports keyboard interaction including Enter/Space, ArrowUp/ArrowDown, Home/End, and Escape.

The overlay architecture provides the foundation for modal focus management and keyboard handling without coupling those concerns to the consuming application.

## Theming and Styling

The library uses vanilla CSS and CSS custom properties rather than a component framework.

Design tokens define colors, spacing, typography, radii, and elevation. Light and dark values are defined at the token level, allowing components to consume the same variables without component-specific theme logic. Theme selection is exposed through a dedicated composable.

All components and CSS classes use an explicit `P` / `p-` namespace, such as `PButton` and `.p-button`, reducing naming collisions with consuming applications and other dependencies.

## Application State

The Nuxt application keeps reusable UI concerns in the library and application state in the app.

Team member fetching is simulated asynchronously to exercise loading, success, and failure states.

Pagination and filtering are persisted through route query parameters. The route is treated as the source of truth for this state, so reloading or sharing a URL preserves the current view.

## Testing

The UI library uses Vitest and Vue Test Utils for component and composable behavior.

The Nuxt application uses Cypress for end-to-end tests. This separates component behavior testing from browser-level application flows.

Tests focus on high-value behavior rather than implementation details: form updates and accessibility attributes, Select keyboard interaction, table pagination, toast lifecycle, and URL-persisted application state.

## Trade-offs

The implementation prioritizes clear boundaries and the highest-value assignment requirements over building a larger component framework.

The library does not introduce a CSS framework or external component kit. Vanilla CSS keeps the token system explicit and avoids unnecessary dependencies.

Some functionality was intentionally kept minimal due to the assignment scope and time constraints. In particular, the application demonstrates the components that are actively used by the Nuxt page rather than building a large showcase application around every library component.

The goal was to provide a small, understandable library with deliberate APIs and a clear separation between reusable UI primitives and application-specific logic.
