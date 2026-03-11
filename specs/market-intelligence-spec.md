# Spec Template for Workshop

## Feature: MarketIntelligenceWidget

### Context
- Market intelligence widget for the Customer Intelligence Dashboard
- Provides real-time market sentiment and news analysis for customer companies
- Composed of three layers: API route, service class, and UI component
- Receives company name from the selected customer in `CustomerSelector`
- Sits alongside existing dashboard widgets in a responsive grid layout

### Requirements

#### API Layer (`/api/market-intelligence/[company]`)
- Next.js App Router Route Handler accepting a `company` name path parameter
- Returns JSON with: sentiment (positive/neutral/negative), news article count, and top headlines
- Uses mock data generation for reliable, predictable output
- Simulates realistic API delay for authentic loading UX
- Validates and sanitizes the `company` input before processing
- Follows the same route structure and response format as existing customer management API routes

#### Service Layer (`MarketIntelligenceService`)
- Class-based service following established dashboard service patterns
- Generates realistic, company-specific mock headlines and sentiment scores
- Caches results with a 10-minute TTL to avoid redundant recalculation
- Centralised error handling via a custom `MarketIntelligenceError` class
- Pure function implementations for testability

#### UI Component (`MarketIntelligenceWidget`)
- Input field for manual company name entry with client-side validation
- Color-coded market sentiment indicator matching dashboard conventions (green = positive, yellow = neutral, red = negative)
- Display news article count and last-updated timestamp
- Show top 3 headlines with source name and publication date
- Loading state while fetching data
- Error state on fetch failure, consistent with other dashboard widgets
- Integrates into the main `Dashboard` component via company name prop from selected customer

### Constraints
- Tech stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS
- No `any` types; strict TypeScript interfaces for all data structures and API responses
- Error boundaries required around the widget for graceful failure handling
- Color coding must match existing dashboard health indicator system (green/yellow/red)
- Caching implemented at the service layer, not the component layer
- Input sanitization must prevent injection attacks; error messages must not leak sensitive info
- Component styling, spacing, and typography must match existing widget patterns
- Mock data only — no external API calls

### Acceptance Criteria

#### API
- [ ] `GET /api/market-intelligence/[company]` returns valid JSON with sentiment, news count, and headlines
- [ ] Response includes a simulated delay to trigger the loading state in the UI
- [ ] Invalid or empty company name parameter returns a descriptive 400 error
- [ ] Response format matches the structure expected by `MarketIntelligenceService`

#### Service
- [ ] `MarketIntelligenceService` generates company-specific mock headlines and a sentiment value
- [ ] Repeated calls within 10 minutes return cached results without recalculation
- [ ] Cache expires after 10 minutes and fresh data is generated on next call
- [ ] Errors are thrown as `MarketIntelligenceError` instances with descriptive messages

#### UI Component
- [ ] Company name input accepts manual entry and triggers a fetch on submit
- [ ] Widget auto-populates company name from the selected customer in `CustomerSelector`
- [ ] Sentiment indicator displays correct color (green/yellow/red) matching the returned value
- [ ] Top 3 headlines are displayed with source and publication date
- [ ] News article count and last-updated timestamp are visible
- [ ] Loading state is shown while the API request is in flight
- [ ] Error state is shown on API failure, consistent with other dashboard widgets
- [ ] Widget renders correctly within the dashboard responsive grid on mobile and desktop
