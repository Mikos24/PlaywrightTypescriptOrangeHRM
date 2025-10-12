import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class VacanciesPage extends BasePage {
  // Main elements
  readonly vacanciesTable: Locator;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // Filter elements
  readonly jobTitleDropdown: Locator;
  readonly vacancyDropdown: Locator;
  readonly hiringManagerDropdown: Locator;
  readonly statusDropdown: Locator;

  // Table elements
  readonly tableRows: Locator;
  readonly noRecordsMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main elements
    this.vacanciesTable = page.locator('.oxd-table');
    this.addButton = page.locator('button:has-text("Add")');
    this.searchButton = page.locator('button:has-text("Search")');
    this.resetButton = page.locator('button:has-text("Reset")');

    // Filter elements
    this.jobTitleDropdown = page.locator('.oxd-select-text').nth(0);
    this.vacancyDropdown = page.locator('.oxd-select-text').nth(1);
    this.hiringManagerDropdown = page.locator('.oxd-select-text').nth(2);
    this.statusDropdown = page.locator('.oxd-select-text').nth(3);

    // Table elements
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noRecordsMessage = page.locator('text=No Records Found');
  }

  /**
   * Verify vacancies page is loaded
   */
  async verifyVacanciesPageLoaded(): Promise<void> {
    await this.verifyUrl(/.*recruitment\/viewJobVacancy/);
    await this.verifyElementVisible(this.vacanciesTable);
  }

  /**
   * Verify all main UI elements are present
   */
  async verifyMainUIElements(): Promise<void> {
    await this.verifyElementVisible(this.addButton);
    await this.verifyElementVisible(this.searchButton);
    await this.verifyElementVisible(this.resetButton);
    
    const filterCount = await this.getElementCount(this.page.locator('.oxd-select-text'));
    if (filterCount === 0) {
      throw new Error('No filter dropdowns found');
    }
  }

  /**
   * Click Add button to navigate to Add Vacancy page
   */
  async clickAddVacancy(): Promise<void> {
    await this.clickElement(this.addButton);
  }

  /**
   * Select job title from dropdown
   */
  async selectJobTitle(): Promise<void> {
    await this.clickElement(this.jobTitleDropdown);
    
    const options = this.page.locator('.oxd-select-option');
    const optionCount = await this.getElementCount(options);
    
    if (optionCount > 0) {
      await this.clickElement(options.first());
    }
  }

  /**
   * Select status from dropdown
   */
  async selectStatus(): Promise<void> {
    const dropdowns = this.page.locator('.oxd-select-text');
    const dropdownCount = await this.getElementCount(dropdowns);
    
    if (dropdownCount >= 2) {
      await this.clickElement(dropdowns.nth(1));
      
      const options = this.page.locator('.oxd-select-option');
      const optionCount = await this.getElementCount(options);
      
      if (optionCount > 0) {
        await this.clickElement(options.first());
      }
    }
  }

  /**
   * Select hiring manager from dropdown
   */
  async selectHiringManager(): Promise<void> {
    await this.clickElement(this.hiringManagerDropdown);
    
    const options = this.page.locator('.oxd-select-option');
    const optionCount = await this.getElementCount(options);
    
    if (optionCount > 0) {
      await this.clickElement(options.first());
    }
  }

  /**
   * Reset all filters
   */
  async resetFilters(): Promise<void> {
    await this.clickElement(this.resetButton);
  }

  /**
   * Get vacancy count from table
   */
  async getVacancyCount(): Promise<number> {
    try {
      await this.tableRows.first().waitFor({ timeout: 5000 });
      return await this.getElementCount(this.tableRows);
    } catch {
      return 0;
    }
  }

  /**
   * Verify no vacancies found message
   */
  async verifyNoVacanciesFound(): Promise<void> {
    await this.verifyElementVisible(this.noRecordsMessage);
  }
}