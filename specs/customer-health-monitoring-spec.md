# Spec Template for Workshop

## Feature: CustomerHealthMonitoring

### Context
- Unified customer health monitoring system for the Customer Intelligence Dashboard
- Combines the `HealthScoreCalculator` (multi-factor scoring) with the `PredictiveAlerts` rules engine into a cohesive monitoring layer
- Used by sales/support teams to proactively identify at-risk customers before churn
- Integrates with `CustomerSelector` for real-time updates when the selected customer changes
- Consists of three layers: scoring library (`lib/healthCalculator.ts`), alerts engine (`lib/alerts.ts`), and a `CustomerHealthMonitoringWidget` UI component

### Requirements

#### Health Score Engine (`lib/healthCalculator.ts`)
- Calculate a 0–100 health score from four weighted factors:
  - Payment history: 40%
  - Engagement metrics: 30%
  - Contract information: 20%
  - Support satisfaction: 10%
- Risk classification: Healthy (71–100), Warning (31–70), Critical (0–30)
- Individual pure scoring functions per factor composed by a main `calculateHealthScore` function
- Input validation with descriptive errors; graceful defaults for new/incomplete customer data
- Trend detection: flag whether a customer's score is improving or declining over time

#### Alerts Rules Engine (`lib/alerts.ts`)
- Pure `alertEngine` function evaluating all rules against current customer data
- **High Priority alerts** (immediate action required):
  - Payment overdue >30 days OR health score drops >20 points in 7 days
  - Login frequency drops >50% vs 30-day average
  - Contract expires in <90 days AND health score <50
- **Medium Priority alerts** (monitor closely):
  - >3 support tickets in 7 days OR any escalated ticket
  - No new feature usage in 30 days for growing accounts
- Deduplication: suppress duplicate alerts for the same customer/issue
- Cooldown periods to prevent alert spam and fatigue
- Alert prioritization weighted by customer ARR and urgency
- Audit trail: log all triggered alerts and user actions

#### UI Component (`CustomerHealthMonitoringWidget`)
- Overall health score with color-coded indicator (green/yellow/red) matching dashboard conventions
- Expandable factor breakdown (payment, engagement, contract, support sub-scores)
- Real-time alert list grouped by priority (high = red, medium = yellow)
- Alert detail panel with recommended actions and contextual data
- Alert dismissal and action-taken tracking
- Historical alerts view
- Loading and error states consistent with other dashboard widgets
- Auto-updates when selected customer changes in `CustomerSelector`

### Constraints
- Tech stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS
- All engine functions must be pure — no side effects, deterministic output
- No `any` types; strict TypeScript interfaces for all alert types, customer data, and return values
- Custom error classes extending `Error` for exception handling
- JSDoc comments on all functions documenting business logic and mathematical formulas
- Color coding must match existing dashboard conventions (red/yellow/green)
- No sensitive customer data exposed in alert message strings
- Rate limiting on alert generation; audit trail logging required
- Caching for health score calculations to support real-time dashboard responsiveness
- Component must fit within the existing responsive dashboard grid layout

### Acceptance Criteria

#### Health Score Engine
- [ ] `calculateHealthScore` returns a value between 0 and 100 for valid inputs
- [ ] Weighted factors sum correctly: 40% + 30% + 20% + 10% = 100%
- [ ] Risk level correctly classified at all thresholds (0, 30, 31, 70, 71, 100)
- [ ] Missing or null input fields produce descriptive validation errors, not silent failures
- [ ] New customers with no history receive a defined default score without throwing
- [ ] Trend flag correctly identifies improving vs declining score over time

#### Alerts Engine
- [ ] All five alert rules trigger correctly under their defined conditions
- [ ] High priority alerts are distinguished from medium priority in output
- [ ] Duplicate alerts for the same customer/issue are suppressed within the cooldown window
- [ ] Alert prioritization accounts for customer ARR and urgency weighting
- [ ] Triggered alerts are logged to the audit trail with timestamp and customer ID
- [ ] No sensitive customer data appears in alert message strings

#### UI Component
- [ ] Health score displays with correct color coding matching the risk level
- [ ] Factor breakdown panel is collapsed by default and expands on interaction
- [ ] Active alerts are listed, grouped by priority with correct color indicators
- [ ] Selecting an alert opens a detail panel with recommended actions
- [ ] Dismissing an alert removes it from the active list and logs the action
- [ ] Historical alerts view shows past alerts with resolution status
- [ ] Loading state shown while data is fetching; error state shown on failure
- [ ] Widget updates in real time when a new customer is selected in `CustomerSelector`
- [ ] Layout is responsive and fits the dashboard grid on mobile and desktop

#### Testing
- [ ] Unit tests cover all five alert rule functions and all four factor scoring functions
- [ ] Boundary condition tests verify correct behaviour at score and rule thresholds
- [ ] Deduplication and cooldown logic validated with time-based test scenarios
- [ ] Realistic multi-risk-profile customer scenarios produce expected alert sets
- [ ] Input validation tests confirm correct errors for each invalid data type
