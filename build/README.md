# CI/CD Pipeline Files for Playwright Tests

This folder contains pipeline configuration files for running Playwright tests in different CI/CD environments.

## Available Pipeline Files

### 1. Azure DevOps Pipeline (`azure-pipelines.yml`)
- **Usage**: Place this file in the root of your repository or reference it in your Azure DevOps pipeline setup
- **Features**:
  - Triggers on main/develop branch changes
  - Caches node_modules for faster builds
  - Installs Playwright browsers with dependencies
  - Publishes test results and HTML reports
  - Stores test artifacts

### 2. GitHub Actions Workflow (`github-actions.yml`)
- **Usage**: Move this file to `.github/workflows/` in your repository
- **Features**:
  - Runs on push/PR to main/develop branches
  - Matrix strategy for Node.js versions
  - Uploads test results and reports as artifacts
  - Publishes test results with detailed reporting

### 3. Jenkins Pipeline (`Jenkinsfile`)
- **Usage**: Place this file in the root of your repository for Jenkins Pipeline projects
- **Features**:
  - Polls SCM for changes every 5 minutes
  - Requires NodeJS plugin in Jenkins
  - Archives test artifacts
  - Publishes HTML reports
  - Email notifications on failure

## Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- Playwright dependencies installed
- CI/CD environment configured

### Configuration Updates Made
The `playwright.config.ts` has been updated with CI-friendly settings:
- Parallel test execution control
- Multiple reporters (HTML, JUnit, JSON)
- Retry logic for CI environments
- Enhanced failure capture (screenshots, videos, traces)

### Environment Variables
All pipelines use the `CI=true` environment variable to enable CI-specific configurations.

### Test Results
- **JUnit XML**: `test-results/junit-report.xml`
- **JSON Results**: `test-results/test-results.json` 
- **HTML Report**: `playwright-report/index.html`
- **Screenshots/Videos**: Stored in `test-results/` on failure

## Running Tests Locally
```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

## Customization
You can modify these pipeline files according to your specific requirements:
- Change trigger conditions
- Adjust Node.js versions
- Modify test commands
- Add additional stages/steps
- Configure different notification methods