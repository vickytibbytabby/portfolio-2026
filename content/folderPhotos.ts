export type FolderPhoto = {
  src: string;
  alt: string;
  /** The filename shown beneath the photo, like a file on a desktop. */
  label: string;
  /** Left edge and width as a % of the hero's width. */
  x: number;
  width: number;
  /** Top edge as a % of the hero's height. */
  y: number;
  /** Natural width / height, so the height follows the image instead of the box. */
  aspect: number;
};

/**
 * The photos that spill out of the [Untitled] folder, positioned exactly as in
 * the "Hero Expanded" Figma frame (1512 x 982). Order is paint order, back to
 * front, and also the order they fan out in.
 *
 * Coordinates are percentages of the hero box so the whole collage scales with
 * the viewport instead of drifting.
 */
export const FOLDER_PHOTOS: FolderPhoto[] = [
  {
    src: "/folder/vicky.jpg",
    alt: "Vicky in the driver's seat of a car",
    label: "vicky.jpg",
    x: 47.74,
    y: 22.97,
    width: 18.71,
    aspect: 0.68273,
  },
  {
    src: "/folder/gradient.jpg",
    alt: "A gradient painting hanging above a sofa",
    label: "gradient_painting_final.jpg",
    x: 23.66,
    y: 10.07,
    width: 18.16,
    aspect: 0.7561,
  },
  {
    src: "/folder/japan.webp",
    alt: "An illustrated travel sketchbook spread from Sapporo",
    label: "japan_travel_sketches.jpg",
    x: 11.84,
    y: 74.18,
    width: 37.77,
    aspect: 3.1094,
  },
  {
    src: "/folder/paintings.jpg",
    alt: "Paintings propped on a desk",
    label: "mypaintings.jpg",
    x: 7.76,
    y: 38.69,
    width: 14.53,
    aspect: 0.75,
  },
  {
    src: "/folder/dog.jpg",
    alt: "A cavalier king charles spaniel",
    label: "dog.jpg",
    x: 88.84,
    y: 82.76,
    width: 4.97,
    aspect: 0.75,
  },
];

/** The folder itself, in the same coordinate space (Figma 66:1557).
 *  x/width/y describe the ART, not its Figma frame: the frame is a 201.58 box
 *  with the 165.66 art inset inside it, and the [Untitled] label is centred on
 *  the art and flush to its bottom. */
export const FOLDER = {
  /** Left edge and width as a % of the hero's width — 161px @ 1512. */
  x: 70.068,
  width: 10.648,
  /** Top edge as a % of the hero's height. */
  y: 64.868,
  /** The front panel is cut at 26.05% of the square canvas. */
  frontTop: 26.05,
};

/**
 * Phones get their own scatter. The desktop composition is a 1512 x 982
 * landscape frame; squeezed into a 390px-wide column every photo would be
 * thumbnail-sized, so these re-place the same photos in a portrait box.
 * Same shape as above — tune freely, the sizes and order still drive the fan-out.
 */
export const FOLDER_PHOTOS_MOBILE: FolderPhoto[] = [
  // Two flanking the folder, riding up over the copy; three in bands below it.
  // Every box is checked clear of the others and of the folder — see the note.
  { ...FOLDER_PHOTOS[0], x: 68.5, y: -19.7, width: 28 }, // vicky
  { ...FOLDER_PHOTOS[1], x: 7.8, y: 65, width: 26 }, // gradient
  { ...FOLDER_PHOTOS[2], x: 2.1, y: 37.5, width: 64 }, // japan
  { ...FOLDER_PHOTOS[3], x: 1.3, y: -19.7, width: 30 }, // paintings
  { ...FOLDER_PHOTOS[4], x: 68.5, y: 65, width: 24 }, // dog
];

/**
 * The folder's place in that portrait box: at the TOP, with the scatter fanning
 * out around and beneath it.
 *
 * NOTHING OVERLAPS. The five photos and the folder are laid out as disjoint
 * boxes — the two tallest flank the folder (clear of it horizontally: they end
 * at 31.3% and start at 68.5%, the folder runs 35% to 65%), and the other three
 * sit in bands below it, each starting after the one above has finished with its
 * caption. A photo's height here is `width / aspect * 39/41`, the last term
 * because x is a percentage of the box's width and y of its height. If you move
 * one, re-check it against that.
 *
 * The top two carry a negative y, so they ride up out of the box and over the
 * hero copy. That's deliberate — it's what buys the room to keep everything
 * else from colliding.
 *
 * The mobile frame (75:25) sets the folder high — 348 down a 751-tall hero —
 * and leaves the ~400px under it clear all the way to the first work card. That
 * clear run is exactly the room the spill needs, so the photos go below rather
 * than above; hanging them above instead would put 400px of blank page between
 * the copy and the folder while it's closed. 120 of the 402 frame is 29.85%,
 * which lands on 30 of this box.
 */
export const FOLDER_MOBILE = { x: 35, width: 30, y: 2, frontTop: FOLDER.frontTop };
