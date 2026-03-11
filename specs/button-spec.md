# Feature: Button Component

## Context
- Reusable button component for the Customer Intelligence Dashboard
- Used throughout the dashboard for primary actions and interactions
- Part of the design system to ensure visual and behavioral consistency
- Consumed by forms, dialogs, toolbars, and action panels across the dashboard

## Requirements

### Functional Requirements
- Accept `label`, `onClick`, and `variant` props
- Support three variants: `primary`, `secondary`, `danger`
- Include a loading state that displays a spinner and disables interaction
- Trigger `onClick` callback on user click (not triggered during loading state)

### User Interface Requirements
- Visual differentiation between variants:
  - `primary`: filled background, main brand color (blue)
  - `secondary`: outlined/ghost style, neutral color
  - `danger`: filled background, red to indicate destructive action
- Loading state: replace label with a spinner icon, disable pointer events
- Disabled state: reduced opacity, `not-allowed` cursor
- Hover and focus states for keyboard and mouse accessibility

### Accessibility Requirements
- Proper `aria-label` support via prop (falls back to `label` if not provided)
- `aria-busy="true"` when in loading state
- `aria-disabled="true"` when disabled or loading
- Focusable via keyboard with visible focus ring
- Meets WCAG 2.1 AA contrast requirements for all variants

### Integration Requirements
- Props-based API, no internal state beyond what is passed in
- Composable with parent form or action components
- Properly typed TypeScript interface exported from component file

## Constraints

### Technical Stack
- React 19
- TypeScript with strict mode
- Tailwind CSS for styling

### Design Constraints
- Maximum width: 200px
- Consistent padding and border-radius using Tailwind spacing scale
- Spinner must be inline and not cause layout shift

### File Structure and Naming
- Component file: `components/Button.tsx`
- Props interface: `ButtonProps` exported from component file
- Follow project naming conventions (PascalCase for components)

### Security Considerations
- `label` rendered as text content (not `dangerouslySetInnerHTML`) to prevent XSS
- No sensitive data passed through button props

## TypeScript Interface

```ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}
```

## Acceptance Criteria

- [ ] Renders with `primary`, `secondary`, and `danger` variants with distinct styles
- [ ] Displays spinner and disables click when `loading={true}`
- [ ] `onClick` is not called when `loading` or `disabled` is true
- [ ] `aria-label` uses `ariaLabel` prop when provided, otherwise falls back to `label`
- [ ] `aria-busy="true"` set during loading state
- [ ] `aria-disabled="true"` set when disabled or loading
- [ ] Maximum width does not exceed 200px
- [ ] Visible focus ring on keyboard navigation
- [ ] `ButtonProps` interface exported from component file
- [ ] No console errors or warnings
- [ ] Passes TypeScript strict mode checks
- [ ] Follows project code style and conventions
