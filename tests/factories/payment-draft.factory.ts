import { Factory } from 'fishery';
import './_seed';

export type PaymentMethod = 'card' | 'crypto' | 'other';
export type PaymentPlan = 'month' | 'year';

export interface PaymentDraft {
  method: PaymentMethod;
  plan: PaymentPlan;
}

export interface PaymentDraftTransient {
  /** Switch to crypto in one call: paymentDraftFactory.build({}, { transient: { crypto: true } }). */
  crypto?: boolean;
  /** Switch to yearly plan: paymentDraftFactory.build({}, { transient: { yearly: true } }). */
  yearly?: boolean;
}

export const paymentDraftFactory = Factory.define<PaymentDraft, PaymentDraftTransient>(
  ({ transientParams }) => ({
    method: transientParams.crypto ? 'crypto' : 'card',
    plan: transientParams.yearly ? 'year' : 'month',
  }),
);
