import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitmentPage extends BasePage {
  // Navigation elements
  readonly recruitmentMenu: Locator;
  readonly candidatesTab: Locator;
  readonly vacanciesTab: Locator;

  constructor(page: Page) {
    super(page);
    this.recruitmentMenu = page.locator('text=Recruitment');
    this.candidatesTab = page.locator('text=Candidates');
    this.vacanciesTab = page.locator('text=Vacancies');
  }

  /**
   * Navigate to Recruitment module
   */
  async navigateToRecruitment(): Promise<void> {
    await this.clickElement(this.recruitmentMenu);
  }

  /**
   * Navigate to Candidates tab
   */
  async navigateToCandidates(): Promise<void> {
    await this.navigateToRecruitment();
    // Usually candidates is the default tab, but click if needed
  }

  /**
   * Navigate to Vacancies tab
   */
  async navigateToVacancies(): Promise<void> {
    await this.navigateToRecruitment();
    await this.clickElement(this.vacanciesTab);
  }
}