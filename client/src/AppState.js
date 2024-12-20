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
  SavedLocations: [],
  /** @type {import('./models/SavedLocation.js').SavedLocationCreator[]} */
  locationVisitors: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
  /** @type {import('./models/Picture.js').Picture[]} */
  pictures: [],
});
