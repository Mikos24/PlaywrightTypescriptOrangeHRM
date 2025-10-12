export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export class TestData {
  static readonly LOGIN_CREDENTIALS = {
    username: 'Admin',
    password: 'admin123'
  };

  static generateCandidateData(): CandidateData {
    const timestamp = Date.now();
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe${timestamp}@test.com`,
      contactNumber: '1234567890'
    };
  }

  static readonly SEARCH_DATA = {
    candidateName: 'John',
    nonExistentCandidate: 'NonExistentCandidate123456'
  };
}