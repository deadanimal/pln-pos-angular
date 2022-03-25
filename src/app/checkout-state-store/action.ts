import { createAction, props } from '@ngrx/store';
import { CheckoutState } from 'src/app/checkout-state-store/model';

export const addCheckoutState = createAction('add_checkout_state', props<CheckoutState>());
export const clearCheckoutState = createAction('clear_checkout_state');
