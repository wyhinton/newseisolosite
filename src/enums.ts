export enum DropCategory {
  SampleTraySample,
  EDITOR,
  PLACEHOLDER,
  IFRAME,
}

export enum DragSource {
  SAMPLE_TRAY,
}

export enum InteractionType {
  ACTIVE = "ACTIVE",
  STATIC = "STATIC",
}
export enum AppMode {
  DISPLAY = "DISPLAY",
  EDIT = "EDIT",
  CYCLE = "CYCLE",
}

export enum Composition {
  BACH_MOVEMENT_1 = "BACH_MOVEMENT_1",
  BACH_MOVEMENT_2 = "BACH_MOVEMENT_2",
  BACH_MOVEMENT_3 = "BACH_MOVEMENT_3A",
  BACH_MOVEMENT_4 = "BACH_MOVEMENT_4",
  BARTOK_MOVEMENT_1 = "BARTOK_MOVEMENT_1",
  BARTOK_MOVEMENT_2 = "BARTOK_MOVEMENT_2",
  YSAE_MOVEMENT_1 = "YSAE_MOVEMENT_1",
}

export type HomeMode = "player" | "notes" | "about";
