import { TroliState } from 'src/app/troli-state-store/model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const getTroliState = createSelector(
  createFeatureSelector('troliEntries'),
  (state: TroliState[]) => {
    return state;
  }
);


