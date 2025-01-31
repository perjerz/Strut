(window as any).__vlcn_whole_db_dbg = true;
(window as any).__vlcn_wa_crsqlite_dbg = true;

import * as React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import { stringify as uuidStringify } from "uuid";

import App from "./App.js";
import { Ctx } from "./hooks.js";
import sqliteWasm from "@vlcn.io/wa-crsqlite";
import tblrx from "@vlcn.io/rx-tbl";
import wdbRtc from "@vlcn.io/network-webrtc";
import { crrTables, tableNames, tables } from "./domain/schema.js";
import mutations from "./domain/mutations.js";
import AppState from "./domain/ephemeral/AppState.js";
import AuthoringState from "./domain/ephemeral/AuthoringState.js";
import EphemeralTheme from "./domain/ephemeral/EphemeralTheme.js";
import DeckIndex from "./domain/ephemeral/DeckIndex.js";
import DrawingInteractionState from "./domain/ephemeral/DrawingInteractionState.js";
import { asId } from "@vlcn.io/id";
import ErrorState from "./domain/ephemeral/ErrorState.js";
import seeds from "./domain/seed-data.js";

async function main() {
  const sqlite = await sqliteWasm((file) => "/" + file);

  const db = await sqlite.open("strut3");
  (window as any).db = db;

  // TODO: upgrade to common dev env reset fn
  // just drop all except site.
  // await db.execMany(tableNames.map((n) => `DROP TABLE IF EXISTS "${n}";`));
  // await db.execMany(
  //   crrTables.map((t) => `DROP TABLE IF EXISTS "${t}__crsql_clock";`)
  // );
  // await db.exec(`DROP TABLE IF EXISTS "__crsql_wdbreplicator_peers"`);

  await db.execMany(tables);
  const r = await db.execA<[Uint8Array]>("SELECT crsql_siteid()");
  const siteid = uuidStringify(r[0][0]);
  console.log(siteid);

  const rx = await tblrx(db);
  const rtc = await wdbRtc(db);

  (window as any).rtc = rtc;

  await db.execMany(seeds);

  window.onbeforeunload = () => {
    return db.close();
  };

  await startApp({
    db,
    siteid,
    rtc,
    rx,
  });
}

async function startApp(ctx: Ctx) {
  (window as any).ctx = ctx;
  const root = createRoot(document.getElementById("content")!);

  const appState = new AppState({
    ctx,
    editor_mode: "slide",
    current_deck_id: await mutations.genOrCreateCurrentDeck(ctx),
    open_type: false,
    drawing: false,
    authoringState: new AuthoringState({}),
    previewTheme: new EphemeralTheme({
      id: asId("ephemeral_theme"),
      bg_colorset: "default",
    }),
    drawingInteractionState: new DrawingInteractionState({
      currentTool: "arrow",
    }),
    deckIndex: new DeckIndex(),
    errorState: new ErrorState(),
  });

  root.render(<App appState={appState} />);
}

main();
