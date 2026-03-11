Verify a React component against quality criteria: $ARGUMENTS

The component path is `$ARGUMENTS` (strip leading `@` if present, e.g. `@components/CustomerCard.tsx` → `src/components/CustomerCard.tsx`). Prepend `src/` if the path doesn't already start with `src/`.

Work through each check below. For every check, output ✅ PASS or ❌ FAIL with a specific explanation.

---

## Check 1: File Exists

Confirm the component file exists at the resolved path. If it does not exist, stop here and report ❌ FAIL — file not found.

---

## Check 2: TypeScript Types

Read the component file. Verify:
- A TypeScript props interface or type is defined (not using `any` for props)
- All props have explicit types with correct optionality (`?` for optional fields)
- No use of `any` type anywhere in the component
- Props interface covers all fields the component actually uses

Report each sub-issue as a separate finding if ❌.

---

## Check 3: Compatibility with Mock Customer Data

Read `src/data/mock-customers.ts`. The `Customer` interface is:
```ts
interface Customer {
  id: string;
  name: string;
  company: string;
  healthScore: number;
  email?: string;
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
  domains?: string[];
  createdAt?: string;
  updatedAt?: string;
}
```

Verify the component's props interface is compatible — i.e., it can accept a `Customer` object (or a subset of its fields) without type errors. Check that:
- Required props in the component's interface exist as fields in `Customer`
- Field types match (e.g. `healthScore` is `number`, `domains` is `string[] | undefined`)
- The component handles optional fields (`domains`, `email`, etc.) defensively (guards against `undefined`)

Simulate rendering with these representative mock customers:
1. **John Smith** — healthScore: 85, two domains → tests green health + multi-domain
2. **Sarah Johnson** — healthScore: 45, one domain → tests yellow health + single domain
3. **Michael Brown** — healthScore: 15, three domains → tests red health + domain count badge
4. **A customer with no domains** (e.g. `{ id: '9', name: 'Test User', company: 'Test Co', healthScore: 50 }`) → tests missing optional fields

For each mock customer, trace through the component logic and report whether it would render without errors.

---

## Check 4: Responsive Design

Read the component's Tailwind CSS classes. Verify responsive behavior at these breakpoints:
- **Mobile** (`< 640px`, no prefix): layout is usable, no horizontal overflow, text is readable, tap targets are adequate
- **Tablet** (`sm:` / `md:` prefix, 640px–1023px): layout adapts appropriately if responsive classes are present
- **Desktop** (`lg:` / `xl:` prefix, ≥ 1024px): layout takes advantage of wider space if relevant

Check for common responsive issues:
- Fixed pixel widths that could overflow on small screens (e.g. `w-[400px]` without a max constraint)
- Text that might overflow its container (missing `truncate`, `overflow-hidden`, or `break-words`)
- Flex/grid layouts without `flex-wrap` or responsive column overrides
- Images or icons without size constraints

If the component uses no responsive prefixes, note this as a warning but not necessarily a failure — assess whether the base styles are inherently mobile-friendly.

---

## Check 5: Health Score Color Logic (if applicable)

If the component displays a health score indicator, verify the color thresholds match the project standard:
- **Red**: score 0–30 (poor)
- **Yellow / amber**: score 31–70 (moderate)
- **Green**: score 71–100 (good)

Trace the conditional logic (ternary, if/else, or lookup) and confirm the boundary values are correct.

---

## Summary Report

After all checks, output a summary table:

| Check | Status | Notes |
|-------|--------|-------|
| File exists | ✅/❌ | ... |
| TypeScript types | ✅/❌ | ... |
| Mock data compatibility | ✅/❌ | ... |
| Responsive design | ✅/❌ | ... |
| Health score logic | ✅/❌/N/A | ... |

Then state the overall verdict:
- **ALL PASS** — component is ready
- **ISSUES FOUND** — list each ❌ finding with the file path and line number where the issue is, and a concrete suggested fix
