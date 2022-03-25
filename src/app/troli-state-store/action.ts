import { createAction, props } from '@ngrx/store';
import { TroliState } from 'src/app/troli-state-store/model';

export const addTroliState = createAction('add_troli_state', props<TroliState>());
export const clearTroliState = createAction('clear_troli_state');
