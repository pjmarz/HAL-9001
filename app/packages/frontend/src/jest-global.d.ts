// This file contains global type declarations for Jest

import '@testing-library/jest-dom';

declare global {
  const jest: any;
  const describe: (description: string, callback: () => void) => void;
  const beforeEach: (callback: () => void) => void;
  const it: (description: string, callback: () => void) => void;
  const expect: any;
}

export {}; 