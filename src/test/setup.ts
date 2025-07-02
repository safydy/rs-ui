// global setup file for Vitest
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend Vitest's `expect()` with Jest DOM matchers. (No need if we were using Jest directly)
expect.extend(matchers);