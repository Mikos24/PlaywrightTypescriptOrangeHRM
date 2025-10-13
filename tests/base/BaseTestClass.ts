import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { TestData } from '../utils/testData';

/**
 * Base test class that provides common functionality for all tests
 * Handles login operations and provides easy access to common page objects
 */
export class BaseTestClass {
  public readonly page: Page;
  public readonly loginPage: LoginPage;
  public readonly recruitmentPage: RecruitmentPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.recruitmentPage = new RecruitmentPage(page);
  }

  /**
   * Performs the complete login flow
   * This method should be called in beforeEach hooks
   */
  async performLogin(): Promise<void> {
    await this.loginPage.navigateToLogin();
    await this.loginPage.login(TestData.LOGIN_CREDENTIALS.username, TestData.LOGIN_CREDENTIALS.password);
  }

  /**
   * Login and navigate to Candidates page
   */
  async loginAndNavigateToCandidates(): Promise<void> {
    await this.performLogin();
    await this.recruitmentPage.navigateToCandidates();
  }

  /**
   * Login and navigate to Vacancies page
   */
  async loginAndNavigateToVacancies(): Promise<void> {
    await this.performLogin();
    await this.recruitmentPage.navigateToVacancies();
  }
}

/**
 * Helper function to create a base test instance
 */
export function createBaseTest(page: Page): BaseTestClass {
  return new BaseTestClass(page);
}