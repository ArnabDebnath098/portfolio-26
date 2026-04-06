@AGENTS.md

## Code Standards

- **`data-id` on every element**: All JSX elements (divs, spans, sections, buttons, etc.) MUST have a `data-id` attribute with a descriptive kebab-case name scoped to the component (e.g. `data-id="hero-section-title"`). This applies to both static and mapped/iterable elements. For mapped elements, append the index or key (e.g. `data-id={`project-card-${i}`}`).

- **No inline styles**: Never use the `style={{}}` prop. All styling must be done via Tailwind classes or CSS custom properties defined in stylesheets. If a value must be dynamic (e.g. colors from data), use CSS variables set via `style={{ '--var': value }}` and reference them in Tailwind with `text-[var(--var)]` or in a CSS file — but never put layout, spacing, typography, or color directly in `style`.
