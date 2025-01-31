/**
 * based on application state, render the URL hash.
 * This prevents us from breaking layers of abstraction.
 * Requiring components to update the URL would require them to be aware
 * of all other components that also try to save state in the URL
 * so they don't munge it.
 */

import AppState from "../../domain/ephemeral/AppState";
import { Slide } from "../../domain/schema";
import { ID_of } from "../../id";

// import { useQuery } from "@strut/model/Hooks";
// import AppState from "../app_state/AppState";
// import Slide from "../deck/Slide";
// import { SID_of } from "@strut/sid";
// import { EditorMode } from "../app_state/AppState";

// As a react component so life-cycle and batching of updates are handled for us
export default function UrlRenderer({ appState }: { appState: AppState }) {
  // const deck = appState.deck;
  // useQuery(["mostRecentlySelectedSlide"], deck);
  // useQuery(["editorMode"], appState);

  // window.location.hash = encodeURIComponent(
  //   JSON.stringify({
  //     selectedSlide: deck.getSelectedSlide()?.id,
  //     editorMode: appState.editorMode,
  //   })
  // );

  return null;
}

export function decodeUrl():
  | { selectedSlide: ID_of<Slide>; editorMode: AppState["editor_mode"] }
  | undefined {
  try {
    return JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
  } catch (e) {}
}
