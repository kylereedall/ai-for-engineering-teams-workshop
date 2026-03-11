Implement a React component from a specification file: $ARGUMENTS

Follow these steps carefully:

## Step 1: Read the Specification

Read the spec file at `$ARGUMENTS` (strip the leading `@` if present, e.g. `@specs/customer-card-spec.md` → `specs/customer-card-spec.md`).

Extract from the spec:
- **Component name** from the `## Feature:` heading (e.g. `CustomerCard`)
- **Requirements** section — functional behavior, UI, data, integration
- **Constraints** section — tech stack, conventions, TypeScript types
- **Acceptance Criteria** section — the checklist of testable criteria you must satisfy

## Step 2: Inspect Existing Code

Before writing anything:
1. Check `src/components/` for any existing version of this component
2. Check `src/data/` for relevant mock data or types referenced in the spec
3. Check `src/app/page.tsx` to understand how components are used in the app
4. Read any files the spec references (e.g. mock data files, related components)

## Step 3: Generate the Component

Create the component at `src/components/[ComponentName].tsx` where `[ComponentName]` is the PascalCase name from the spec.

Requirements for the implementation:
- Use Next.js 15, React 19, TypeScript, and Tailwind CSS
- Export the component as the default export
- Define a TypeScript props interface with all fields correctly typed
- Implement all functional requirements from the spec
- Follow project conventions: PascalCase component name, no external UI libraries beyond Tailwind

## Step 4: Verify Against Acceptance Criteria

Go through **each acceptance criterion** from the spec one by one and verify your implementation satisfies it. For each criterion:
- State whether it is ✅ satisfied or ❌ not satisfied
- Briefly explain how the implementation satisfies it (or what is missing)

## Step 5: Iteratively Refine

If any criteria are ❌ not satisfied:
1. Identify what changes are needed
2. Update the component file
3. Re-verify all criteria
4. Repeat until every criterion is ✅ satisfied

## Step 6: Report Completion

Once all criteria are satisfied, output a summary:
- Component file path created
- List of all acceptance criteria with ✅ status
- Any notable implementation decisions or trade-offs
