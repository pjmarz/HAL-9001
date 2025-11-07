// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: function mockMatchMedia(query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function mockAddListener() {},
      removeListener: function mockRemoveListener() {},
      addEventListener: function mockAddEventListener() {},
      removeEventListener: function mockRemoveEventListener() {},
      dispatchEvent: function mockDispatchEvent() {},
    };
  },
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe(): void {}
  disconnect(): void {}
  unobserve(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
}); 