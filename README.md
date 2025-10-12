# OrangeHRM Test Automation Framework

## Project Overview

This project was created for **Safeguard Global** as part of the interview process. It demonstrates automated testing capabilities using modern test automation practices and tools.

## Requirements Fulfilled

**Requirement:** Develop a test framework and implement tests for OrangeHRM

**Instructions Completed:**
1. ✅ **Module Selection:** Tests implemented for the **Recruitment module**
2. ✅ **Authentication:** Uses login details from the OrangeHRM demo site (Admin/admin123)
3. ✅ **Technology Stack:** Built with **TypeScript** and Playwright

## Test Coverage

The framework includes comprehensive tests for the OrangeHRM Recruitment module:

### Candidates Tab (6 Tests)
- Page load and UI element verification
- Add new candidate functionality (happy path)
- Candidate search functionality
- Job title filter functionality
- Candidate status filter functionality
- Required field validation

### Vacancies Tab (6 Tests)
- Page load and UI element verification
- Add new vacancy functionality (happy path) 
- Vacancy search and filter functionality
- Vacancy status filter functionality
- Hiring manager filter functionality
- Required field validation

**Total:** 12 automated tests covering core recruitment workflows

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

## Test Data

The framework uses:
- **Login Credentials:** Admin / admin123 (as provided on OrangeHRM demo site)
- **Dynamic Test Data:** Generated with timestamps to avoid conflicts
- **Search Test Data:** Predefined candidate names for search functionality
