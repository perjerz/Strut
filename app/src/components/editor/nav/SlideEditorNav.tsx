import * as React from "react";
import SlideComponentsButtons from "../../header/SlideComponentsButtons";
import styles from "./SlideEditorNav.module.css";
import DrawingTools from "../../header/DrawingTools";
import * as headerBtn from "../../header/HeaderButton.module.css";
import StylingMenu from "../markdown/styling_menu/StylingMenu";
import StructureStyleButtons from "../../header/StructureStyleButtons";
import LayoutButton from "../../header/LayoutButton";
import PresentButton from "../../header/PresentButton";
import Header from "../../../widgets/Header";
import LogoButton from "../../header/LogoButton";
import useMatchMedia from "../../../interactions/useMatchMedia";
import mediaCuts from "../../mobile/mediaCuts";
import mutations from "../../../domain/mutations";
import AppState from "../../../domain/ephemeral/AppState";

export default function SlideEditorNav({ appState }: { appState: AppState }) {
  // TODO listen for media state
  // collapse or not the slide editor menu
  // or should we just put everything back into the floating menu?

  // const orientHorizontally = useMatchMedia(
  //   "(max-width: " + mediaCuts.horizontal + "px)"
  // );

  return (
    <Header>
      <div>
        <LogoButton ctx={appState.ctx} deckId={appState.current_deck_id} />
        <StructureStyleButtons
          appState={appState}
          className="inline-block left-pad"
        />
      </div>
      <div className={styles.middle_buttons}>
        {appState.drawing ? (
          <>
            <DrawingTools appState={appState} />
          </>
        ) : (
          <>
            <SlideComponentsButtons appState={appState} />
          </>
        )}
      </div>
      <div>
        {<LayoutButton appState={appState} />}
        {<PresentButton ctx={appState.ctx} deckId={appState.current_deck_id} />}
      </div>
    </Header>
  );
}

/*
<StylingMenu appState={appState} />
            <div className={styles.header_spacer + " strt-header-spacer"} />
*/
