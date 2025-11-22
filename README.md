
# Playwright TypeScript Test Automation Template

## Project Overview

This repository is a template for future Playwright projects using TypeScript. It provides a ready-to-use structure, configuration, and sample tests for rapid setup and best practices in test automation.

## Application Under Test

The template includes example tests for [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com).

- **Login Credentials:** Admin / admin123


## Example Test Coverage

Sample tests are provided for the OrangeHRM Recruitment module:

- Candidates Tab: UI verification, add candidate, search, filters, validation
- Vacancies Tab: UI verification, add vacancy, search, filters, validation

Total: 12 automated tests covering core recruitment workflows

## Technology Stack

- **Framework:** Playwright with TypeScript
- **Pattern:** Page Object Model (POM)
- **Target Application:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)
- **Browser:** Chromium (configurable for Firefox/Safari)
- **Node.js:** Required runtime environment

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-mcp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

### Execute All Tests
```bash
npm test
```
or
```bash
npx playwright test
```

### List All Available Tests
```bash
npm run test:list
```
or
```bash
npx playwright test --list
```

### Run Specific Test File
```bash
npx playwright test tests/candidates.spec.ts
npx playwright test tests/vacancies.spec.ts
```

### Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### Run Tests with Debug Mode
```bash
npx playwright test --debug
```

## Test Configuration

The framework is configured with:
- **Base URL:** https://opensource-demo.orangehrmlive.com
- **Browser:** Chromium (default)
- **Parallel Execution:** Enabled
- **Screenshots:** On failure only
- **Videos:** On failure only
- **Traces:** On first retry
