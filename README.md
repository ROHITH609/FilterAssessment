# FilterAssessment

FilterAssessment is a small Angular demo app that showcases cascading filters (Country → State → City) and a mutual-exclusivity system for promotional offers. It pairs practical filter dependency logic with a playful, baby-themed UI (custom selects, checkboxes, badges and responsive cards).

## Features
- Cascading location filters with parent → child enable/disable logic
- Real-time selection summary panel
- Mutually-exclusive promotional toggles
- Decorative, responsive UI with accessible controls

## Prerequisites
- Node.js (16 or later recommended)
- npm (comes with Node.js) or yarn
- Angular CLI (optional, for development helpers): `npm install -g @angular/cli`

## Clone and run
1. Clone the repository:

```bash
git clone https://github.com/ROHITH609/FilterAssessment.git
cd FilterAssessment
```

2. Install dependencies:

```bash
npm install
# or: yarn install
```

3. Run the development server:

```bash
npm start
# or: ng serve
```

4. Open the app: navigate to `http://localhost:4200/` in your browser.

## Tests
- Run unit tests:

```bash
npm test
# or: ng test
```

## Build
- Create a production build:

```bash
npm run build
# or: ng build --configuration production
```

## Notes & Troubleshooting
- If the app doesn't start, ensure your Node and npm versions meet the prerequisites.
- If you see template compilation errors, run `npm install` then restart the server.
- The UI is intentionally decorative; you can tweak colors and spacing in `src/app/app.css`.

If you'd like, I can add a screenshot, CI workflow, or a short walkthrough video link to this README.
