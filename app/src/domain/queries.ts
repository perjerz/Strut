import { Ctx, first, firstPick, Query } from "../hooks";
import { ID_of } from "../id";
import {
  Deck,
  Presenter,
  Slide,
  TableName,
  TextComponent,
  Theme,
} from "./schema";

const queries = {
  // TODO: we can collapse all "same calls" in the same tick. to just do 1 query
  // e.g. if 50 components all want the same data can just collapse to 1 query.
  // DataLoader pattern.
  // do the data loader pattern at the db wrapper level?
  // and/or prepared statement level?
  // we enqueue.. we can check if anyone ahead of us in the queue is fulfilling our result.
  // if so, we return that promise instead of enqueueing a new one.
  canUndo: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["undo_stack"],
      /*sql*/ `SELECT 1 FROM undo_stack WHERE deck_id = ? LIMIT 1`,
      [id],
      firstPick,
    ] as Query<boolean, TableName, boolean | undefined>,

  canRedo: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["redo_stack"],
      /*sql*/ `SELECT 1 FROM undo_stack WHERE deck_id = ? LIMIT 1`,
      [id],
      firstPick,
    ] as Query<boolean, TableName, boolean | undefined>,

  slides: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["slide"],
      /*sql*/ `SELECT * FROM slide WHERE deck_id = ? ORDER BY "order" ASC`,
      [id],
    ] as Query<Slide, TableName>,

  slideIds: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["slide"],
      /*sql*/ `SELECT "id" FROM "slide" WHERE "deck_id" = ? ORDER BY "order" ASC`,
      [id],
      (x: [ID_of<Slide>][]) => x.map((x) => x[0]),
    ] as Query<[ID_of<Slide>], TableName, ID_of<Slide>[]>,

  chosenPresenter: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["deck", "presenter"],
      /*sql*/ `SELECT "presenter".* FROM "presenter" JOIN "deck" ON deck.chosen_presenter = presenter.name WHERE deck.id = ?`,
      [id],
      first,
    ] as Query<Presenter, TableName, Presenter>,

  selectedSlides: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["selected_slide"],
      /*sql*/ `SELECT "slide_id" FROM "selected_slide" WHERE "deck_id" = ?`,
      [id],
      (x: [ID_of<Slide>][]) => new Set(x.map((x) => x[0])),
    ] as Query<[ID_of<Slide>], TableName, Set<ID_of<Slide>>>,

  mostRecentlySelectedSlide: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["selected_slide"],
      /*sql*/ `SELECT "slide_id" FROM "selected_slide" WHERE "deck_id" = ? ORDER BY "rowid" DESC LIMIT 1`,
      [id],
      firstPick,
    ] as Query<[ID_of<Slide>], TableName, ID_of<Slide> | undefined>,

  recentColors: (ctx: Ctx, id: ID_of<Theme> | undefined) =>
    [
      ctx,
      ["recent_color"],
      /*sql*/ `SELECT "color" FROM "recent_color" WHERE "theme_id" = ?`,
      [id == null ? null : id],
      (x: [string][]) => x.map((x) => x[0]),
    ] as Query<[string], TableName, string[]>,

  theme: (ctx: Ctx, id: ID_of<Theme>) =>
    [
      ctx,
      ["theme"],
      /*sql*/ `SELECT * FROM "theme" WHERE "id" = ?`,
      [id],
    ] as Query<Theme, TableName>,

  themeFromDeck: (ctx: Ctx, id: ID_of<Deck>) =>
    [
      ctx,
      ["theme", "deck"],
      /*sql*/ `SELECT theme.* FROM "theme" JOIN "deck" ON theme.id = deck.theme_id WHERE deck.id = ?`,
      [id],
      first,
    ] as Query<Theme, TableName, Theme | undefined>,

  textComponents: (ctx: Ctx, id: ID_of<Slide>) =>
    [
      ctx,
      ["text_component"],
      /*sql*/ `SELECT * FROM "text_component" WHERE "slide_id" = ?`,
      [id],
    ] as Query<TextComponent, TableName>,
} as const;

export default queries;
