Review a spec file for completeness and quality: $ARGUMENTS

Resolve the spec path from `$ARGUMENTS` (strip leading `@` if present, e.g. `@specs/customer-card-spec.md` → `specs/customer-card-spec.md`).

Read both files:
1. The spec file at the resolved path
2. `templates/spec-template.md` (the reference template)

---

## Check 1: Required Sections Present

Verify the spec contains all four required top-level sections. Each must exist as a `###` heading:

| Section | Required |
|---------|----------|
| `### Context` | ✅ required |
| `### Requirements` | ✅ required |
| `### Constraints` | ✅ required |
| `### Acceptance Criteria` | ✅ required |

Report ✅ PRESENT or ❌ MISSING for each.

---

## Check 2: Section Content Quality

For each section that is present, assess whether it has **meaningful content** (not just the placeholder text from the template). A section fails if it:
- Contains only the template's example bullet text verbatim (e.g. "Purpose and role in the application")
- Has fewer than 2 bullet points or sentences
- Is vague to the point of being unactionable

### Context
Must answer:
- What is the component's purpose?
- Where does it fit in the application?
- Who uses it and when?

### Requirements
Must cover at least two of:
- Functional requirements (what it must do)
- UI/UX requirements
- Data requirements
- Integration requirements

### Constraints
Must specify at least:
- Tech stack (should mention Next.js, React, TypeScript, or Tailwind CSS)
- At least one of: naming conventions, TypeScript props, performance limits, or design constraints

### Acceptance Criteria
Must have:
- At least 3 checkbox items (`- [ ]`)
- Criteria that are **testable** (concrete, not vague like "looks good")
- At least one edge case (e.g. empty state, missing optional field, boundary value)

---

## Check 3: Acceptance Criteria Testability

For each `- [ ]` criterion, classify it as:
- **Testable** — has a concrete, observable outcome (e.g. "displays red indicator when healthScore < 30")
- **Vague** — too subjective to verify (e.g. "component looks correct")

List any vague criteria and suggest a rewritten, testable version.

---

## Check 4: Consistency

Check for internal consistency between sections:
- Fields mentioned in Requirements are reflected in Constraints (e.g. if Requirements mentions `domains` array, Constraints should define its type)
- Acceptance Criteria cover the key behaviors listed in Requirements (no requirement is entirely untested)

List any gaps found.

---

## Summary Report

Output a results table:

| Check | Status | Details |
|-------|--------|---------|
| Context present & complete | ✅/❌ | ... |
| Requirements present & complete | ✅/❌ | ... |
| Constraints present & complete | ✅/❌ | ... |
| Acceptance Criteria present & complete | ✅/❌ | ... |
| Criteria are testable | ✅/⚠️/❌ | X of Y criteria are testable |
| Sections are internally consistent | ✅/⚠️/❌ | ... |

Then give an overall verdict:
- **SPEC APPROVED** — all checks pass; spec is ready for `/implement`
- **NEEDS REVISION** — list each ❌ or ⚠️ finding with specific, actionable suggestions for what to add or rewrite
