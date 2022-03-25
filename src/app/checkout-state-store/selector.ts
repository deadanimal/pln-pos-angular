import { CheckoutState } from 'src/app/checkout-state-store/model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const getCheckoutState = createSelector(
  createFeatureSelector('checkoutEntries'),
  (state: CheckoutState[]) => {
    return state;
  }
);


