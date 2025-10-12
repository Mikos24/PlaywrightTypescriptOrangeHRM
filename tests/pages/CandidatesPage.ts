import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CandidatesPage extends BasePage {
  // Main elements
  readonly candidatesTable: Locator;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // Filter elements
  readonly jobTitleDropdown: Locator;
  readonly vacancyDropdown: Locator;
  readonly hiringManagerDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly candidateNameInput: Locator;

  // Table elements
  readonly tableRows: Locator;
  readonly noRecordsMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main elements
    this.candidatesTable = page.locator('.oxd-table');
    this.addButton = page.locator('button:has-text("Add")');
    this.searchButton = page.locator('button:has-text("Search")');
    this.resetButton = page.locator('button:has-text("Reset")');

    // Filter elements
    this.jobTitleDropdown = page.locator('.oxd-select-text').nth(0);
    this.vacancyDropdown = page.locator('.oxd-select-text').nth(1);
    this.hiringManagerDropdown = page.locator('.oxd-select-text').nth(2);
    this.statusDropdown = page.locator('.oxd-select-text').nth(3);
    this.candidateNameInput = page.locator('input[placeholder="Type for hints..."]').first();

    // Table elements
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noRecordsMessage = page.locator('text=No Records Found');
  }

  /**
   * Verify candidates page is loaded
   */
  async verifyCandidatesPageLoaded(): Promise<void> {
    await this.verifyUrl(/.*recruitment\/viewCandidates/);
    await this.verifyElementVisible(this.candidatesTable);
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
   * Click Add button to navigate to Add Candidate page
   */
  async clickAddCandidate(): Promise<void> {
    await this.clickElement(this.addButton);
  }

  /**
   * Search for a candidate by name
   */
  async searchCandidateByName(candidateName: string): Promise<void> {
    await this.fillInput(this.candidateNameInput, candidateName);
    await this.clickElement(this.searchButton);
  }

  /**
   * Select job title from dropdown
   */
  async selectJobTitle(jobTitle?: string): Promise<void> {
    await this.clickElement(this.jobTitleDropdown);
    
    const options = this.page.locator('.oxd-select-option');
    const optionCount = await this.getElementCount(options);
    
    if (optionCount > 0) {
      if (jobTitle) {
        await this.clickElement(options.locator(`text=${jobTitle}`));
      } else {
        await this.clickElement(options.first());
      }
    }
  }

  /**
   * Select status from dropdown
   */
  async selectStatus(status?: string): Promise<void> {
    const statusDropdowns = this.page.locator('.oxd-select-text');
    const dropdownCount = await this.getElementCount(statusDropdowns);
    
    if (dropdownCount >= 4) {
      await this.clickElement(statusDropdowns.nth(3));
      
      const options = this.page.locator('.oxd-select-option');
      const optionCount = await this.getElementCount(options);
      
      if (optionCount > 0) {
        if (status) {
          await this.clickElement(options.locator(`text=${status}`));
        } else {
          await this.clickElement(options.first());
        }
      }
    }
  }

  /**
   * Reset all filters
   */
  async resetFilters(): Promise<void> {
    await this.clickElement(this.resetButton);
  }

  /**
   * Get candidate count from table
   */
  async getCandidateCount(): Promise<number> {
    try {
      await this.tableRows.first().waitFor({ timeout: 5000 });
      return await this.getElementCount(this.tableRows);
    } catch {
      return 0;
    }
  }

  /**
   * Verify no candidates found message
   */
  async verifyNoCandidatesFound(): Promise<void> {
    await this.verifyElementVisible(this.noRecordsMessage);
  }
}