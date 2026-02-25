import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js components that might cause issues in tests
vi.mock('next/image', () => ({
  default: (props: any) => {
    return React.createElement('img', props);
  },
}));

// Mock Next.js router if your components use useRouter()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
