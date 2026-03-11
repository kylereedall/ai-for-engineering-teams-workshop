# Spec Template for Workshop

## Feature: HealthScoreCalculator

### Context
- Comprehensive customer health scoring system for the Customer Intelligence Dashboard
- Provides predictive analytics for customer relationship health and churn risk
- Consists of two parts: a pure-function library (`lib/healthCalculator.ts`) and a `CustomerHealthDisplay` UI widget
- Integrates with `CustomerSelector` to update scores in real time when customer selection changes
- Outputs are used by sales/support teams to prioritize customer outreach

### Requirements

#### Core Algorithm (`lib/healthCalculator.ts`)
- Calculate a health score on a 0–100 scale using a weighted multi-factor model:
  - Payment history: 40%
  - Engagement metrics: 30%
  - Contract information: 20%
  - Support satisfaction: 10%
- Classify risk level from the final score:
  - Healthy: 71–100
  - Warning: 31–70
  - Critical: 0–30
- Individual scoring functions for each factor, composed by a main `calculateHealthScore` function
- Input validation with descriptive error messages for all data inputs
- Edge case handling for new customers and missing/null data fields
- Trend analysis support for improving vs. declining customers

#### Data Inputs
- **Payment**: days since last payment, average payment delay, overdue amount
- **Engagement**: login frequency, feature usage count, support ticket count
- **Contract**: days until renewal, contract value, recent upgrades flag
- **Support**: average resolution time, satisfaction scores, escalation count

#### UI Component (`CustomerHealthDisplay`)
- Display overall health score with color-coded visualization consistent with dashboard health indicators
- Expandable breakdown panel showing individual factor scores
- Loading and error states consistent with other dashboard widgets
- Real-time score updates on customer selection change via `CustomerSelector`

### Constraints
- Tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- All calculator functions must be pure (no side effects) for predictability and testability
- Strict TypeScript interfaces for all data structures, inputs, and return types — no `any`
- Custom error classes extending `Error` for exception handling
- JSDoc comments on all functions explaining business logic and mathematical formulas
- Caching considered for repeated calculations to minimize computational overhead
- Color coding must match existing dashboard health indicator conventions (red/yellow/green)
- File location: `lib/healthCalculator.ts` for logic; component follows project naming conventions

### Acceptance Criteria

#### Algorithm
- [ ] `calculateHealthScore` returns a score between 0 and 100 for valid inputs
- [ ] Weighted factors sum correctly: Payment 40% + Engagement 30% + Contract 20% + Support 10% = 100%
- [ ] Risk level classification matches thresholds: Healthy (71–100), Warning (31–70), Critical (0–30)
- [ ] Each individual factor scoring function returns a normalized 0–100 sub-score
- [ ] Invalid or missing input fields produce descriptive validation errors (not silent failures)
- [ ] New customers with no history produce a defined default score, not an exception
- [ ] All functions are pure — same inputs always produce same outputs with no side effects

#### UI Component
- [ ] Overall health score is displayed with correct color coding matching dashboard conventions
- [ ] Factor breakdown panel is hidden by default and expands on user interaction
- [ ] Loading state is shown while score is being calculated
- [ ] Error state is shown when calculation fails, consistent with other dashboard widgets
- [ ] Score updates immediately when a new customer is selected in `CustomerSelector`

#### Testing
- [ ] Unit tests cover all individual factor scoring functions
- [ ] Boundary condition tests verify correct behavior at score thresholds (0, 30, 31, 70, 71, 100)
- [ ] Realistic customer data scenarios produce expected risk level classifications
- [ ] Mathematical accuracy verified: weighted sum matches manual calculation
- [ ] Input validation tests confirm correct errors for each invalid input type
