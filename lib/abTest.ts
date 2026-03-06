export const HOMEPAGE_TESTIMONIAL_EXPERIMENT = {
  name: 'homepage_testimonial_position_v1',
  storageKey: 'ab_homepage_testimonial_position_v1',
  startDateIso: '2026-03-06T00:00:00.000Z',
  endDateIso: '2026-04-15T23:59:59.999Z',
} as const;

export type TestVariant = 'A' | 'B';
export type AssignmentSource = 'preview' | 'randomized' | 'inactive_default';

export interface ExperimentAssignment {
  variant: TestVariant;
  source: AssignmentSource;
  isPreview: boolean;
  isActive: boolean;
}

const PREVIEW_PARAM = 'ab';

const isInExperimentWindow = (now: Date): boolean => {
  const start = new Date(HOMEPAGE_TESTIMONIAL_EXPERIMENT.startDateIso);
  const end = new Date(HOMEPAGE_TESTIMONIAL_EXPERIMENT.endDateIso);
  return now >= start && now <= end;
};

const readPreviewVariant = (search: string): TestVariant | null => {
  const params = new URLSearchParams(search);
  const rawValue = params.get(PREVIEW_PARAM)?.toUpperCase();
  return rawValue === 'A' || rawValue === 'B' ? rawValue : null;
};

const readStoredVariant = (): TestVariant | null => {
  const value = window.localStorage.getItem(HOMEPAGE_TESTIMONIAL_EXPERIMENT.storageKey);
  return value === 'A' || value === 'B' ? value : null;
};

const writeStoredVariant = (variant: TestVariant) => {
  window.localStorage.setItem(HOMEPAGE_TESTIMONIAL_EXPERIMENT.storageKey, variant);
};

const assignRandomVariant = (): TestVariant => (Math.random() < 0.5 ? 'A' : 'B');

export const getHomepageExperimentAssignment = (search: string): ExperimentAssignment => {
  if (typeof window === 'undefined') {
    return { variant: 'A', source: 'inactive_default', isPreview: false, isActive: false };
  }

  const previewVariant = readPreviewVariant(search);
  if (previewVariant) {
    return { variant: previewVariant, source: 'preview', isPreview: true, isActive: true };
  }

  const active = isInExperimentWindow(new Date());
  if (!active) {
    return { variant: 'A', source: 'inactive_default', isPreview: false, isActive: false };
  }

  const stored = readStoredVariant();
  if (stored) {
    return { variant: stored, source: 'randomized', isPreview: false, isActive: true };
  }

  const randomized = assignRandomVariant();
  writeStoredVariant(randomized);
  return { variant: randomized, source: 'randomized', isPreview: false, isActive: true };
};

export const getStoredHomepageTestVariant = (): TestVariant | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return readStoredVariant();
};
