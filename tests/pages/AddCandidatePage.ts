import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddCandidatePage extends BasePage {
  // Form elements
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly contactNumberInput: Locator;
  readonly consentCheckbox: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[placeholder="Type here"]').nth(0);
    this.contactNumberInput = page.locator('input[placeholder="Type here"]').nth(1);
    this.consentCheckbox = page.locator('.oxd-checkbox-input');
    this.saveButton = page.locator('button:has-text("Save")');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.errorMessages = page.locator('.oxd-input-field-error-message');
    this.successMessage = page.locator('.oxd-alert--success');
  }

  /**
   * Verify navigation to Add Candidate page
   */
  async verifyAddCandidatePageLoaded(): Promise<void> {
    await this.verifyUrl(/.*recruitment\/addCandidate/);
  }

  /**
   * Fill candidate personal details
   */
  async fillCandidateDetails(candidateData: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
  }): Promise<void> {
    await this.fillInput(this.firstNameInput, candidateData.firstName);
    await this.fillInput(this.lastNameInput, candidateData.lastName);
    await this.fillInput(this.emailInput, candidateData.email);
    await this.fillInput(this.contactNumberInput, candidateData.contactNumber);
  }

  /**
   * Give consent by checking the checkbox
   */
  async giveConsent(): Promise<void> {
    const checkboxCount = await this.getElementCount(this.consentCheckbox);
    if (checkboxCount > 0) {
      await this.consentCheckbox.first().check();
    }
  }

  /**
   * Save the candidate
   */
  async saveCandidate(): Promise<void> {
    await this.clickElement(this.saveButton);
  }

  /**
   * Cancel candidate creation
   */
  async cancelCandidateCreation(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  /**
   * Verify validation errors are displayed
   */
  async verifyValidationErrors(): Promise<void> {
    await this.errorMessages.first().waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Verify success message or navigation
   */
  async verifySuccess(): Promise<void> {
    const candidatesTable = this.page.locator('.oxd-table');
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      await candidatesTable.waitFor({ state: 'visible', timeout: 3000 });
    }
  }
}