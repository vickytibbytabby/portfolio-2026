/**
 * A layer laid over the card background.
 *
 * Every art layer in the Figma is horizontally centred, so only the vertical
 * position and the width are carried here.
 *
 * These are percentages of the STAGE, not of the card: the card runs the full
 * column width and has its height locked to the window, so it isn't the design's
 * 716 x 897 any more. The stage is — it takes the card's height, keeps the
 * design ratio and centres, which is what lets these numbers stay exactly the
 * ones the Figma gives.
 */
export type Art = {
  src: string;
  /** Top edge, as a % of the stage. */
  top: number;
  /** Width, as a % of the stage. */
  width: number;
  /** The layer box's own width / height. */
  ratio: number;
  /**
   * The image inside that box, as a % of it. The design crops two of these —
   * the phones lose a sliver off the bottom, the UCLA art is a window onto a
   * much larger illustration — so the box clips and the image is placed in it.
   */
  img: { left: number; top: number; width: number; height: number };
};

/**
 * The brand mark. Unlike the art it hangs off the card's top-left CORNER rather
 * than living in the stage, so it keeps hugging that corner however wide the
 * card gets — which is the whole reason it carries a `left` at all.
 */
export type Mark = {
  src: string;
  /** Left edge, as a % of the card's width. */
  left: number;
  /**
   * Top edge and height, both as a % of the card's HEIGHT — the card's one
   * locked dimension, and the same factor the stage scales by, so the mark stays
   * in step with the artwork beside it. The width follows the mark's own ratio,
   * so it can't be stretched.
   */
  top: number;
  height: number;
};

export type WorkCard = {
  /**
   * The card's own background — a CSS gradient for three of the four. Scallion
   * uses a photo instead, so it sets `photo` and `scrim` and leaves this unset.
   */
  background?: string;
  /** A photograph filling the card, cropped to fill. */
  photo?: string;
  /** A gradient laid over `photo` — the design darkens its foot to black. */
  scrim?: string;
  /** The one image that carries the card's meaning, for screen readers. */
  alt?: string;
  /** Where the card leads, if it has a case study behind it. */
  href?: string;
  art?: Art;
  /**
   * A screen recording in place of the art. Also centred, also in the stage.
   *
   * "phone" — the recording carries its own chassis and a pale surround, so
   * it's clipped to the chassis' bounds and rounded; `top`/`height` place it.
   * "window" — a browser capture that sits at its own aspect; `width` sets it
   * and the height follows.
   */
  video?: {
    src: string;
    poster: string;
    kind: "phone" | "window";
    top: number;
    height?: number;
    width?: number;
  };
  mark: Mark;
  /**
   * What the mobile frame (75:25) does differently.
   *
   * Its card is 362 x 423.5 rather than 716 x 897, so nothing that is a
   * percentage of the box carries over — and it CENTRES every mark instead of
   * hanging it off the corner, so those need a width rather than a left. The
   * art keeps its own `ratio` and `img` crop from the desktop entry; only the
   * top edge and the width move.
   */
  mobile: {
    art?: { top: number; width: number };
    video?: { top: number; height?: number; width?: number };
    /** Centred, so a width and a top edge is all it takes. */
    mark: { top: number; width: number };
  };
  /**
   * Luminance down the rendered card, top to bottom, for the nav to read.
   *
   * Three of the backgrounds are CSS gradients that span the card whatever its
   * height, so those are computed from their stops and are exact at any window
   * size. Scallion's is its photograph under the scrim, and the photo's crop
   * does move with the card's height — but it tops out around 0.31 against a
   * 0.42 threshold however it's cropped, so the ink never turns on it.
   *
   * Regenerate if you change a background — see the note in useOnDark.
   */
  backdrop: number[];
  /** The brand, set in italic before the em dash. */
  name: string;
  /** The rest of the caption line. */
  blurb: string;
  dates: string;
};

/**
 * The work, newest first, laid out two per row (Figma 66:1551).
 *
 * The design draws each card at 716 x 897 — half of the 1472 content width less
 * the 40px column gap. On screen the card keeps the full width and gives up the
 * height, and the stage carries the 716 x 897 instead, so every percentage below
 * is still the one read straight off the design. Add cards in pairs so the grid
 * stays square.
 */
export const WORK: WorkCard[] = [
  {
    background: "linear-gradient(180deg, #040617 0%, #040617 62.52%, #188fff 100%)",
    href: "/work/arena-club",
    // The Figma's own still, back in place of the recording. Its box is the one
    // the recording took: y 76.69, 743.70 tall in the 897 stage, and the width
    // follows the phone's own 569 x 1116.
    art: {
      src: "/work-cards/arena-club-home.webp",
      top: 8.5496,
      width: 52.9583,
      ratio: 569 / 1116,
      img: { left: 0, top: 0, width: 100, height: 100 },
    },
    mark: {
      src: "/work-cards/arena-club-badge.webp",
      left: 3.9567,
      top: 3.0669,
      height: 12.2215,
    },
    mobile: {
      // the still's box is y 58.28, 348.00 tall, in the 423.5 box
      art: { top: 13.7615, width: 49.0138 },
      mark: { top: 2.0047, width: 12.14 },
    },
    backdrop: [0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.027, 0.039, 0.059, 0.078, 0.098, 0.118, 0.138, 0.157, 0.177, 0.197, 0.217, 0.236, 0.256, 0.276, 0.296, 0.315, 0.335, 0.355, 0.375, 0.394, 0.414, 0.434, 0.454, 0.474, 0.493],
    name: "Arena Club",
    blurb: "All-in-one for collectors",
    dates: "July 2024 - Present",
  },
  {
    photo: "/work-cards/scallion-studios-photo.webp",
    scrim: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
    alt: "The Scallion Studios recipe app showing Taiwanese chicken rice",
    art: {
      src: "/work-cards/scallion-studios-phone.webp",
      top: 8.1472,
      width: 53.32,
      ratio: 430.9961 / 847.5889,
      img: { left: 0, top: 0, width: 100, height: 101.43 },
    },
    mark: {
      // The mark and the wordmark are one export: the wordmark is set in
      // Scanport with a gradient fill, which isn't a webfont we ship.
      // SVG rather than webp because Figma's PNG export of this node arrives
      // flattened onto white, which is opaque over the dark photo — the SVG
      // keeps its alpha, once the two background rects Figma bakes in (the
      // canvas grey, and the whole 1512x3379 page) are stripped out.
      src: "/work-cards/scallion-studios-lockup.svg",
      left: 1.74,
      top: 2.568,
      height: 6.0479,
    },
    mobile: {
      art: { top: 14.1818, width: 46.2052 },
      // The mobile frame draws its own lockup, with a smaller mark against the
      // same wordmark — a separate export we don't have. This is the desktop
      // one, sized so the wordmark lands at the mobile frame's 20px and centred
      // on the same line; its mark comes out chunkier than the Figma's.
      mark: { top: 3.1359, width: 43.68 },
    },
    backdrop: [0.222, 0.225, 0.224, 0.224, 0.224, 0.227, 0.226, 0.225, 0.231, 0.232, 0.234, 0.235, 0.24, 0.244, 0.245, 0.248, 0.254, 0.26, 0.262, 0.268, 0.278, 0.286, 0.288, 0.288, 0.29, 0.291, 0.29, 0.287, 0.283, 0.282, 0.28, 0.278, 0.273, 0.273, 0.267, 0.261, 0.257, 0.252, 0.245, 0.239, 0.233, 0.227, 0.219, 0.213, 0.205, 0.199, 0.192, 0.184, 0.176, 0.168, 0.16, 0.152, 0.142, 0.131, 0.12, 0.108, 0.095, 0.082, 0.067, 0.049, 0.032, 0.019, 0.01, 0],
    href: "/work/scallion-studios",
    name: "Scallion Studios",
    blurb: "recipes from home",
    dates: "August 2024 - Present",
  },
  {
    background: "linear-gradient(180deg, #000000 0%, #de403f 100%)",
    video: {
      kind: "window",
      src: "/work-cards/airbnb.mp4",
      poster: "/work-cards/airbnb-poster.webp",
      // the Figma's box is 1.653 against the capture's own 1.748, so the width
      // matches and the height follows rather than cropping the UI
      width: 90.46,
      top: 30.864,
    },
    mark: {
      src: "/work-cards/airbnb-kleiner-perkins.svg",
      left: 3.56,
      top: 3.2263,
      height: 3.5819,
    },
    mobile: {
      video: { top: 30.8642, width: 90.45 },
      mark: { top: 5.1665, width: 63 },
    },
    backdrop: [0, 0.006, 0.012, 0.018, 0.024, 0.03, 0.036, 0.042, 0.049, 0.055, 0.061, 0.067, 0.073, 0.079, 0.085, 0.091, 0.097, 0.103, 0.109, 0.115, 0.121, 0.127, 0.134, 0.14, 0.146, 0.152, 0.158, 0.164, 0.17, 0.176, 0.182, 0.188, 0.194, 0.2, 0.206, 0.212, 0.219, 0.225, 0.231, 0.237, 0.243, 0.249, 0.255, 0.261, 0.267, 0.273, 0.279, 0.285, 0.291, 0.297, 0.304, 0.31, 0.316, 0.322, 0.328, 0.334, 0.34, 0.346, 0.352, 0.358, 0.364, 0.37, 0.376, 0.382],
    href: "/work/airbnb",
    name: "Airbnb",
    blurb: "A Kleiner Perkins case study",
    dates: "January 2024",
  },
  {
    background:
      "linear-gradient(180deg, #001a4b 0%, #0f6fd4 38.462%, #b6b6b6 65.634%, #e0c27b 84.559%, #f3ad02 100%)",
    alt: "An illustrated Los Angeles map sent to new UCLA Football recruits",
    art: {
      src: "/work-cards/ucla-football-art.webp",
      top: 7.4928,
      width: 93.54,
      ratio: 272.3311 / 310.0801,
      // a window onto the illustration rather than the whole of it
      img: { left: -62.83, top: -26.34, width: 224.12, height: 147.63 },
    },
    mark: {
      src: "/work-cards/ucla-football-mark.svg",
      left: 3.49,
      top: 2.5641,
      height: 5.4627,
    },
    mobile: {
      art: { top: 7.4923, width: 93.54 },
      mark: { top: 4.1558, width: 18.16 },
    },
    backdrop: [0.094, 0.106, 0.118, 0.13, 0.142, 0.154, 0.166, 0.178, 0.19, 0.202, 0.214, 0.226, 0.238, 0.25, 0.262, 0.273, 0.285, 0.297, 0.309, 0.321, 0.333, 0.345, 0.357, 0.369, 0.381, 0.399, 0.418, 0.437, 0.456, 0.476, 0.495, 0.514, 0.534, 0.553, 0.572, 0.591, 0.611, 0.63, 0.649, 0.668, 0.688, 0.707, 0.717, 0.721, 0.725, 0.73, 0.734, 0.738, 0.743, 0.747, 0.751, 0.756, 0.76, 0.765, 0.76, 0.752, 0.744, 0.736, 0.728, 0.72, 0.712, 0.704, 0.696, 0.688],
    href: "/work/ucla-football",
    name: "UCLA Football",
    blurb: "New recruits illustration",
    dates: "June 2023",
  },
];
