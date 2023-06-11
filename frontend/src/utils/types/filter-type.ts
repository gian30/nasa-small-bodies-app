import { RangeValue } from "./date-types";

export interface Filters {
	dates: RangeValue;
	sortKey: string;
	showOnlyFavorites: boolean;
}