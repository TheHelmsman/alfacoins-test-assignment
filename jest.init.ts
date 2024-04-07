import 'regenerator-runtime/runtime';
import { RouterLinkStub, config } from '@vue/test-utils';

config.global.stubs = {
  RouterLink: RouterLinkStub,
};
config.global.mocks = {
  $t: (label: string) => label,
};
config.global.directives = {
  clickOutside: () => null,
};

jest.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (label: string) => label }),
  createI18n: () => ({ global: { t: (label: string) => label } }),
}));
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  startCase: (str: string) => str,
  capitalize: (str: string) => str,
  debounce: jest.fn(),
}));
jest.mock('@/router', () => ({ replace: jest.fn() }));
