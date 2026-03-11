Generate a spec for the component: $ARGUMENTS

Follow these steps:

1. Check if `requirements/$ARGUMENTS.md` exists (use lowercase kebab-case filename, e.g. "CustomerCard" → `requirements/customer-card.md`). If it exists, read it for context. If not, proceed without it.

2. Read `templates/spec-template.md` for the required structure.

3. Generate a complete spec following the template structure with these sections. Each section must exist AND have meaningful content.
   - **Context**: Purpose, role in the application, how it fits the system, who uses it
   - **Requirements**: Functional requirements, UI requirements, data requirements, integration requirements
   - **Constraints**: Tech stack (Next.js 15, React 19, TypeScript, Tailwind CSS), performance, design, file/naming conventions, TypeScript props interface, security
   - **Acceptance Criteria**: Testable success criteria, edge cases, UX validation, integration points

4. Save the output to `specs/$ARGUMENTS-spec.md` using kebab-case (e.g. "CustomerCard" → `specs/customer-card-spec.md`).
