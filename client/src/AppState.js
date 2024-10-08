import { reactive } from "vue";
import { Location } from "./models/Location.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Location.js').Location[]} */
  locations: [],
  /** @type {Location[]} */
  randomLocations: [],
  /** @type {import('./models/Location.js').Location} */
  activeLocation: null,
  /** @type {import('./models/SavedLocation.js').LocationSaved[]} */
  visitorSavedLocation: [],
  /** @type {import('./models/SavedLocation.js').SavedLocationCreator[]} */
  CreatorSavedLocation: [],
  /** @type {import('./models/SavedLocation.js').SavedLocation[]} */
  locationVisitor: [],
  /** @type {import('./models/SavedLocation.js').SavedLocation} People who have check in to a location (for displaying the visitors on location page) */
  visitors: null,
  /** @type {import('./models/SavedLocation.js').LocationSaved[]} */
  visitedLocations: [],
});
