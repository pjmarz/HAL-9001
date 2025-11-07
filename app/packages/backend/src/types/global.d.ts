// Global type declarations for the backend

declare global {
  const jest: any;
  const describe: (description: string, callback: () => void) => void;
  const beforeEach: (callback: () => void) => void;
  const it: (name: string, callback: () => void) => void;
  const expect: any;
}

export {}; 