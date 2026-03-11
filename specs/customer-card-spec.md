# Spec Template for Workshop

## Feature: CustomerCard

### Context
- Individual customer display component for the Customer Intelligence Dashboard
- Used within the `CustomerSelector` container component to render each customer as a selectable card
- Provides at-a-glance customer information (name, company, health score, domains) for quick identification
- Serves as the foundation for domain health monitoring integration
- Used by sales/support teams scanning a list of customers

### Requirements
- Display customer name, company name, and health score
- Show customer domain(s) for health monitoring context
- Display domain count when a customer has multiple domains
- Color-coded health indicator based on score:
  - Red: score 0–30 (poor)
  - Yellow: score 31–70 (moderate)
  - Green: score 71–100 (good)
- Basic responsive design supporting mobile and desktop viewports
- Clean, card-based visual design
- Source data from `src/data/mock-customers.ts`
- Customer interface must support an optional `domains` array of website URLs

### Constraints
- Tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- Must be a pure presentational component (no internal data fetching)
- Props interface defined in TypeScript; all required fields typed strictly
- Follows project file/naming conventions (PascalCase component, kebab-case file)
- No external UI libraries beyond Tailwind CSS
- Component must not exceed a single card height suitable for list rendering
- Health score color logic must be self-contained within the component

### Acceptance Criteria
- [ ] Customer name and company name are rendered and visible
- [ ] Health score is displayed with the correct color indicator (red / yellow / green) based on score range
- [ ] At least one domain is shown when the `domains` array is populated
- [ ] Domain count badge is shown when a customer has more than one domain
- [ ] Component renders correctly when `domains` is undefined or empty
- [ ] Layout is usable on mobile (small screens) and desktop without overflow or clipping
- [ ] TypeScript props interface covers all fields with correct types and optionality
- [ ] Component is consumable inside `CustomerSelector` without additional wrappers
