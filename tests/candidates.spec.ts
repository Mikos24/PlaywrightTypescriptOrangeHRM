import { test, expect } from '@playwright/test';
import { BaseTestClass } from './base/BaseTestClass';
import { CandidatesPage } from './pages/CandidatesPage';
import { AddCandidatePage } from './pages/AddCandidatePage';
import { TestData } from './utils/testData';

test.describe('Recruitment - Candidates Tab - Sanity Tests', () => {
  let baseTest: BaseTestClass;
  let candidatesPage: CandidatesPage;
  let addCandidatePage: AddCandidatePage;

  test.beforeEach(async ({ page }) => {
    // Initialize base test and perform login + navigation
    baseTest = new BaseTestClass(page);
    await baseTest.loginAndNavigateToCandidates();

    // Initialize page objects
    candidatesPage = new CandidatesPage(page);
    addCandidatePage = new AddCandidatePage(page);
  });
  
  test('TC_CANDIDATES_001 - Verify Candidates Page Load and Basic UI Elements', async ({ page }) => {
    // Verify URL contains the correct candidates path
    await expect(page).toHaveURL(/.*recruitment\/viewCandidates/);
    
    // Verify main UI elements are visible
    await expect(candidatesPage.candidatesTable).toBeVisible();
    await expect(candidatesPage.addButton).toBeVisible();
    await expect(candidatesPage.searchButton).toBeVisible();
    await expect(candidatesPage.resetButton).toBeVisible();
    
    // Verify filter dropdowns are present
    const filterDropdowns = page.locator('.oxd-select-text');
    await expect(filterDropdowns).toHaveCount(5); // Job Title, Vacancy, Hiring Manager, Status + one more
  });

  test('TC_CANDIDATES_002 - Add New Candidate - Happy Path', async ({ page }) => {
    // Click Add button and verify navigation to Add Candidate page
    await candidatesPage.clickAddCandidate();
    await expect(page).toHaveURL(/.*recruitment\/addCandidate/);
    
    // Verify Add Candidate form elements are visible
    await expect(addCandidatePage.firstNameInput).toBeVisible();
    await expect(addCandidatePage.lastNameInput).toBeVisible();
    await expect(addCandidatePage.saveButton).toBeVisible();
    
    // Fill candidate details and save
    const candidateData = TestData.generateCandidateData();
    await addCandidatePage.fillCandidateDetails(candidateData);
    await addCandidatePage.giveConsent();
    await addCandidatePage.saveCandidate();

    // Verify successful save by checking we stay on add candidate page with candidate ID in URL
    await expect(page).toHaveURL(/.*recruitment\/addCandidate\/\d+/);
    // Verify form fields are still visible (indicating we're still on the add candidate page after save)
    await expect(addCandidatePage.firstNameInput).toBeVisible();
  });

  test('TC_CANDIDATES_003 - Search Candidate Functionality', async ({ page }) => {
    // Perform search by candidate name
    await candidatesPage.searchCandidateByName(TestData.SEARCH_DATA.candidateName);
    
    // Verify search was performed and table is still visible
    await expect(candidatesPage.candidatesTable).toBeVisible();
    await expect(candidatesPage.candidateNameInput).toHaveValue(TestData.SEARCH_DATA.candidateName);
    
    // Reset search and verify filters are cleared
    await candidatesPage.resetFilters();
    await expect(candidatesPage.candidatesTable).toBeVisible();
    await expect(candidatesPage.candidateNameInput).toHaveValue('');
  });

  test('TC_CANDIDATES_004 - Job Title Filter Functionality', async ({ page }) => {
    // Verify job title dropdown is present and functional
    await expect(candidatesPage.jobTitleDropdown).toBeVisible();
    
    // Select a job title and perform search
    await candidatesPage.selectJobTitle();
    await candidatesPage.clickElement(candidatesPage.searchButton);
    
    // Verify search results are displayed
    await expect(candidatesPage.candidatesTable).toBeVisible();
    
    // Reset filters and verify table is still visible
    await candidatesPage.resetFilters();
    await expect(candidatesPage.candidatesTable).toBeVisible();
  });

  test('TC_CANDIDATES_005 - Candidate Status Filter Functionality', async ({ page }) => {
    // Verify status dropdown is present and functional
    await expect(candidatesPage.statusDropdown).toBeVisible();
    
    // Select a status and perform search
    await candidatesPage.selectStatus();
    await candidatesPage.clickElement(candidatesPage.searchButton);
    
    // Verify search results are displayed
    await expect(candidatesPage.candidatesTable).toBeVisible();
    
    // Reset filters and verify table is still visible
    await candidatesPage.resetFilters();
    await expect(candidatesPage.candidatesTable).toBeVisible();
  });

  test('TC_CANDIDATES_006 - Add Candidate Required Field Validation', async ({ page }) => {
    // Navigate to Add Candidate page
    await candidatesPage.clickAddCandidate();
    await expect(page).toHaveURL(/.*recruitment\/addCandidate/);
    
    // Try to save without filling required fields
    await addCandidatePage.saveCandidate();
    
    // Verify validation errors are displayed
    await expect(addCandidatePage.errorMessages).toHaveCount(3); // Expecting errors for required fields
    await expect(addCandidatePage.errorMessages.first()).toBeVisible();
    
    // Cancel and verify return to candidates page
    await addCandidatePage.cancelCandidateCreation();
    await expect(page).toHaveURL(/.*recruitment\/viewCandidates/);
    await expect(candidatesPage.candidatesTable).toBeVisible();
  });
});