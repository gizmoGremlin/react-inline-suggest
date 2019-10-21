import { SFC } from 'react';
import { ShouldRenderSugestionFn } from '../types';
export interface SuggestionProps {
    value?: string;
    needle: string;
    shouldRenderSuggestion?: ShouldRenderSugestionFn;
}
declare const Suggestion: SFC<SuggestionProps>;
export default Suggestion;
