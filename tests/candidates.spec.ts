import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { AddCandidatePage } from './pages/AddCandidatePage';
import { TestData } from './utils/testData';

test.describe('Recruitment - Candidates Tab - Sanity Tests', () => {
  
  test('TC_CANDIDATES_001 - Verify Candidates Page Load and Basic UI Elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);

    // Login to OrangeHRM
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);

    // Navigate to Candidates
    await recruitmentPage.navigateToCandidates();

    // Verify page load and UI elements
    await candidatesPage.verifyCandidatesPageLoaded();
    await candidatesPage.verifyMainUIElements();
  });

  test('TC_CANDIDATES_002 - Add New Candidate - Happy Path', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);
    const addCandidatePage = new AddCandidatePage(page);

    // Login and navigate to candidates
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
    await recruitmentPage.navigateToCandidates();

    // Add new candidate
    await candidatesPage.clickAddCandidate();
    await addCandidatePage.verifyAddCandidatePageLoaded();
    
    const candidateData = TestData.generateCandidateData();
    await addCandidatePage.fillCandidateDetails(candidateData);
    await addCandidatePage.giveConsent();
    await addCandidatePage.saveCandidate();

    // Verify success
    await addCandidatePage.verifySuccess();
  });

  test('TC_CANDIDATES_003 - Search Candidate Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);

    // Login and navigate to candidates
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
    await recruitmentPage.navigateToCandidates();

    // Perform search
    await candidatesPage.searchCandidateByName(TestData.SEARCH_DATA.candidateName);
    await candidatesPage.verifyElementVisible(candidatesPage.candidatesTable);

    // Reset search
    await candidatesPage.resetFilters();
    await candidatesPage.verifyElementVisible(candidatesPage.candidatesTable);
  });

  test('TC_CANDIDATES_004 - Job Title Filter Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);

    // Login and navigate to candidates
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
    await recruitmentPage.navigateToCandidates();

    // Apply job title filter
    await candidatesPage.selectJobTitle();
    await candidatesPage.clickElement(candidatesPage.searchButton);
    await candidatesPage.verifyElementVisible(candidatesPage.candidatesTable);

    // Reset filters
    await candidatesPage.resetFilters();
  });

  test('TC_CANDIDATES_005 - Candidate Status Filter Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);

    // Login and navigate to candidates
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
    await recruitmentPage.navigateToCandidates();

    // Apply status filter
    await candidatesPage.selectStatus();
    await candidatesPage.clickElement(candidatesPage.searchButton);
    await candidatesPage.verifyElementVisible(candidatesPage.candidatesTable);

    // Reset filters
    await candidatesPage.resetFilters();
  });

  test('TC_CANDIDATES_006 - Add Candidate Required Field Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const candidatesPage = new CandidatesPage(page);
    const addCandidatePage = new AddCandidatePage(page);

    // Login and navigate to candidates
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
    await recruitmentPage.navigateToCandidates();

    // Try to save without required fields
    await candidatesPage.clickAddCandidate();
    await addCandidatePage.saveCandidate();
    await addCandidatePage.verifyValidationErrors();

    // Cancel and return
    await addCandidatePage.cancelCandidateCreation();
    await candidatesPage.verifyElementVisible(candidatesPage.candidatesTable);
  });
});