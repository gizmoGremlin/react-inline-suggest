import { GetSuggestionValueFn } from './types';
export declare function filterSuggestions<T>(value: string, suggestions: T[], ignoreCase: boolean, getSuggestionValue?: GetSuggestionValueFn<T>): T[];
export declare function getNeedleFromString(text: string, current: string): string;
export declare function getNextSafeIndexFromArray<T>(array: T[], current: number): number;
export declare function getPreviousSafeIndexFromArray<T>(array: T[], current: number): number;
