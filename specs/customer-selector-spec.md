# Spec Template for Workshop

## Feature: CustomerSelector

### Context
- Main customer selection interface for the Customer Intelligence Dashboard
- Top-level container component that renders a list of `CustomerCard` components
- Used by sales/support teams to quickly find and switch between customers
- Must handle large customer lists (100+) without performance degradation

### Requirements
- Display a list of customer cards, each showing name, company, and health score
- Search/filter customers in real time by name or company
- Highlight the currently selected customer card visually
- Persist the selected customer across page interactions (e.g. navigation, re-renders)
- Source data from `src/data/mock-customers.ts`

### Constraints
- Tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- Must efficiently render 100+ customer records (consider virtualization or pagination if needed)
- Search filtering must be client-side and synchronous (no API calls)
- Selection state managed via React state or context; persisted with `localStorage` or URL param
- Delegates individual card rendering to the `CustomerCard` component — no inline card markup
- Props interface and internal state typed strictly in TypeScript
- Follows project file/naming conventions (PascalCase component, kebab-case file)

### Acceptance Criteria
- [ ] All customers from mock data are rendered as `CustomerCard` components on load
- [ ] Typing in the search input filters the list by customer name or company name (case-insensitive)
- [ ] Clearing the search input restores the full customer list
- [ ] Clicking a customer card marks it as selected with a distinct visual highlight
- [ ] Only one customer can be selected at a time
- [ ] Selected customer persists after page interactions (scroll, tab switch, re-render)
- [ ] List renders without visible jank or layout shift for 100+ customers
- [ ] Component is fully typed; no `any` types in props or state
