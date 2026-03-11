# Spec Template for Workshop

## Feature: PredictiveIntelligence

### Context
- Unified predictive intelligence layer for the Customer Intelligence Dashboard
- Combines the `PredictiveAlerts` rules engine with `MarketIntelligenceService` to correlate internal customer risk signals with external market conditions
- Used by sales/support teams to take proactive action on at-risk customers before churn, informed by real-time market context
- Composed of: `lib/alerts.ts` (rules engine), `MarketIntelligenceService` + API route (`/api/market-intelligence/[company]`), and a `PredictiveIntelligenceWidget` UI component
- Integrates with `CustomerSelector` and `CustomerHealthMonitoringWidget` for real-time updates

### Requirements

#### Alerts Rules Engine (`lib/alerts.ts`)
- Pure `alertEngine` function evaluating all rules against current customer data
- **High Priority alerts** (immediate action):
  - Payment overdue >30 days OR health score drops >20 points in 7 days
  - Login frequency drops >50% vs 30-day average
  - Contract expires in <90 days AND health score <50
- **Medium Priority alerts** (monitor closely):
  - >3 support tickets in 7 days OR any escalated ticket
  - No new feature usage in 30 days for growing accounts
- Alert prioritization weighted by customer ARR and urgency
- Deduplication: suppress duplicate alerts for the same customer/issue within a cooldown window
- Audit trail: log all triggered alerts, user dismissals, and actions taken
- Business hours awareness for alert delivery timing

#### Market Intelligence Service (`MarketIntelligenceService` + `/api/market-intelligence/[company]`)
- Next.js App Router Route Handler at `/api/market-intelligence/[company]`
- Returns JSON: market sentiment (positive/neutral/negative), news article count, top 3 headlines with source and publication date, last-updated timestamp
- Mock data generation scoped to the company name for realistic, predictable output
- Simulated API delay to produce authentic loading UX
- Service-layer caching with 10-minute TTL
- Custom `MarketIntelligenceError` class for centralised error handling
- Input validation and sanitization on the company name parameter

#### Correlation Layer
- Surface market sentiment alongside internal alert priority to give teams combined risk context
- Flag customers with active High Priority alerts whose market sentiment is also negative — highest combined risk
- Correlation is presentational (no new scoring); displayed as contextual enrichment in the UI

#### UI Component (`PredictiveIntelligenceWidget`)
- Alert list grouped by priority (High = red, Medium = yellow) with recommended actions per alert
- Market intelligence panel: sentiment indicator (green/yellow/red), news count, last-updated timestamp, top 3 headlines
- Combined risk callout when a customer has High Priority alerts AND negative market sentiment
- Alert detail panel with dismissal and action-taken tracking
- Historical alerts view
- Company name auto-populated from selected customer; manual override input supported
- Loading and error states consistent with other dashboard widgets
- Real-time updates when selected customer changes in `CustomerSelector`

### Constraints
- Tech stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS
- All rules engine and market intelligence functions must be pure with no side effects
- No `any` types; strict TypeScript interfaces for all alert types, market data, and API responses
- Custom error classes extending `Error`; no sensitive data in error messages or logs
- Color coding must match existing dashboard conventions (red/yellow/green)
- Caching implemented at the service layer only; UI component remains stateless regarding cache
- Rate limiting on the API route; audit trail logging required for all alert state changes
- Mock data only — no external API calls
- Component fits within the existing responsive dashboard grid layout

### Acceptance Criteria

#### Alerts Engine
- [ ] All five alert rules trigger correctly under their defined threshold conditions
- [ ] High and Medium priority alerts are correctly distinguished in engine output
- [ ] Duplicate alerts for the same customer/issue are suppressed within the cooldown window
- [ ] Alert output is ordered by combined priority score (ARR × urgency weighting)
- [ ] All triggered alerts and user actions are written to the audit trail with timestamp and customer ID
- [ ] No sensitive customer data appears in alert message strings

#### Market Intelligence
- [ ] `GET /api/market-intelligence/[company]` returns valid JSON with sentiment, news count, headlines, and timestamp
- [ ] Response includes simulated delay sufficient to trigger the loading state
- [ ] Empty or invalid company name returns a descriptive 400 error
- [ ] Repeated calls within 10 minutes return cached results
- [ ] Cache expires after 10 minutes; fresh data generated on next call
- [ ] Errors thrown as `MarketIntelligenceError` with descriptive messages; no stack traces exposed

#### Correlation
- [ ] Customers with active High Priority alerts and negative market sentiment are flagged with the combined risk callout
- [ ] Combined risk callout is absent when either condition is not met
- [ ] Correlation display updates in real time when alert state or market sentiment changes

#### UI Component
- [ ] Alert list renders grouped by priority with correct color indicators
- [ ] Each alert shows recommended actions in its detail panel
- [ ] Dismissing an alert removes it from the active list and logs the action
- [ ] Historical alerts view shows past alerts with resolution status
- [ ] Market sentiment displays correct color coding matching the returned value
- [ ] Top 3 headlines display source and publication date
- [ ] Company name is auto-populated from `CustomerSelector`; manual input overrides it
- [ ] Loading state shown while fetching; error state shown on failure, consistent with other widgets
- [ ] Widget updates immediately when a new customer is selected
- [ ] Layout is usable on mobile and desktop within the dashboard grid
