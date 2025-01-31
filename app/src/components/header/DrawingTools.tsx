import React from "react";

import * as headerStyles from "./HeaderButton.module.css";
import * as styles from "./DrawingTools.module.css";
import { Deck, Tool } from "../../domain/schema";
import mutations from "../../domain/mutations";
import { useBind } from "../../hooks";
import AppState from "../../domain/ephemeral/AppState";
import DrawingInteractionState from "../../domain/ephemeral/DrawingInteractionState";

function active(state: DrawingInteractionState, tool: Tool) {
  return state.currentTool === tool ? " active" : "";
}

export default function DrawingTools({ appState }: { appState: AppState }) {
  const back = () => mutations.toggleDrawing();
  const state = appState.drawingInteractionState;
  useBind(["currentTool"], state);

  return (
    <div className={headerStyles.root}>
      <div className={"btn-group " + headerStyles.fixHeight} role="group">
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "selection")}
          onClick={() => state.activateTool("selection")}
        >
          <svg viewBox="0 0 320 512" className={styles.icon}>
            <path
              fill="currentColor"
              d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "rectangle")}
          onClick={() => state.activateTool("rectangle")}
        >
          <svg viewBox="0 0 448 512" className={styles.icon}>
            <path
              fill="currentColor"
              d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "diamond")}
          onClick={() => state.activateTool("diamond")}
        >
          <svg viewBox="0 0 223.646 223.646" className={styles.icon}>
            <path
              fill="currentColor"
              d="M111.823 0L16.622 111.823 111.823 223.646 207.025 111.823z"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "ellipse")}
          onClick={() => state.activateTool("ellipse")}
        >
          <svg viewBox="0 0 512 512" className={styles.icon}>
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "arrow")}
          onClick={() => state.activateTool("arrow")}
        >
          <svg viewBox="0 0 448 512" className={"rtl-mirror " + styles.icon}>
            <path
              fill="currentColor"
              d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "line")}
          onClick={() => state.activateTool("line")}
        >
          <svg viewBox="0 0 6 6" className={styles.icon}>
            <line
              x1="0"
              y1="3"
              x2="6"
              y2="3"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "freedraw")}
          onClick={() => state.activateTool("freedraw")}
        >
          <svg viewBox="0 0 512 512" className={styles.icon}>
            <path
              fill="currentColor"
              d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className={"btn btn-outline-warning" + active(state, "text")}
          onClick={() => state.activateTool("text")}
        >
          <svg viewBox="0 0 448 512" className={styles.icon}>
            <path
              fill="currentColor"
              d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"
            />
          </svg>
        </button>
      </div>
      <div className={"btn-group " + headerStyles.spacer} role="group">
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={back}
        >
          <i className={"bi bi-paragraph " + headerStyles.icon}></i>Author
        </button>
      </div>
    </div>
  );
}
