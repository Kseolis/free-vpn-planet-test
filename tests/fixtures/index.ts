import { mergeTests } from '@playwright/test';
import { pagesTest } from './pages';

export const test = mergeTests(pagesTest);
export { expect } from '@playwright/test';
