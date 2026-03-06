import { HOMEPAGE_TESTIMONIAL_EXPERIMENT, type TestVariant } from './abTest';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

const callClarity = (...args: any[]) => {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') {
    return;
  }
  window.clarity(...args);
};

export const setHomepageExperimentContext = (
  variant: TestVariant,
  assignmentSource: 'preview' | 'randomized' | 'inactive_default',
) => {
  callClarity('set', 'ab_experiment', HOMEPAGE_TESTIMONIAL_EXPERIMENT.name);
  callClarity('set', 'ab_variant', variant);
  callClarity('set', 'ab_source', assignmentSource);
};

export const trackHomepageExperimentEvent = (
  eventName: 'homepage_view' | 'cta_click' | 'contact_form_submit',
  variant: TestVariant,
) => {
  callClarity('event', `${HOMEPAGE_TESTIMONIAL_EXPERIMENT.name}_${eventName}_${variant}`);
};
