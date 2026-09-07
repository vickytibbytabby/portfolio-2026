# Vicky Jen — Portfolio

Next.js 15 (App Router) + TypeScript. Plain CSS Modules, no Tailwind.
Implements [Frame 60](https://www.figma.com/design/s3nMpcAsUdui2CaztfEC9E/Portfolio-Design?node-id=66-1551)
— hero, a 2x2 grid of work cards, and "Let's Chat!".

```bash
npm install
npm run dev      # http://localhost:3000
npm run build

# A plain `npm run build` wipes the dev server's .next and 500s it.
# To build while dev is running:
NEXT_DIST_DIR=.next-build npm run build
```

## Layout system

Everything is measured in **frame pixels** — the 1512 x 982 Figma frame — turned
into real pixels by `--u` in `app/globals.css`:

```css
--fit: 0.9;                             /* how much of the window the frame fills */
--u: min(calc(0.06614vw * var(--fit)),  /* one pixel of the 1512 x 982 frame */
         calc(0.10183svh * var(--fit)), 1px);
```

Taking the smaller of the width- and height-derived values means the hero scales
down to fit a short window instead of overflowing. `--fit` keeps a margin: at
`1.0` the design touches all four edges and the slightest scroll offset clips it.
The `1px` cap stops it growing past its Figma size on a large monitor.

The nav floats over the top now, so nothing is inset for a rail: content runs to
`--page-margin` (20px) on both sides, and the layout centres once it stops
growing. See `--maxw` in `app/globals.css` for what sets that ceiling.

## What to edit

### `content/work.ts`

One entry per card: `name`, `blurb`, `dates`, a `mark` (the brand logo), and
whichever of `background` / `photo` + `scrim` / `art` / `video` that card needs.
The name is set in italic ahead of the em dash.

**Two cards per row, four in a 2x2 grid.** The design draws each card at
**716 x 897** — half the 1472 content width, less the 40px column gap. Every
overlay percentage below is read straight off that box, so keep the ratio if you
add a card, and add them in pairs so the grid stays square.

On screen the card keeps the full width and gives up the height (below), so the
716 x 897 lives on the `.stage` inside it rather than on the card itself.

**Cards run full width; the HEIGHT is what's locked.** A whole row — media, the
20px gap under it and the 70px caption — has to fit one window, and at the
design's ratio the media alone stands 897 tall against a 716 width, more than a
14" leaves once the browser has taken its chrome. `aspect-ratio` plus a
`max-height` does both jobs at once:

```css
.mediaBox {
  width: 100%;
  aspect-ratio: 716 / 897;
  max-height: calc(100svh - 206 * var(--u));  /* 112 nav + 20 gap + 70 caption + 4 */
}
```

The height comes off the width at the design ratio, and the clamp cuts it back
on a short window **without touching the width** — so the two columns fill the
row edge to edge either way. On a window tall enough (~1078px of viewport) the
clamp goes slack and the box is the design's 716 x 897 exactly.

The 112 is the nav's underside — it floats over the cards, so a row only counts
as visible if it can clear it. Nominally 107.44 (37.44 down, 70 tall), but the
pill runs about a pixel over its box on the text's line height.

**What gives is the card's ratio, never the artwork's.** The background takes the
card's real shape — a gradient simply spans it, Scallion's photograph crops to
fill — and everything that must not be stretched lives in `.stage`:

```css
.stage { position: absolute; height: 100%; aspect-ratio: 716 / 897; left: 50%; }
```

`.stage` is the design's own box, locked to the card's height and centred, so
the phones, the recordings and the UCLA illustration keep their proportions and
just come out smaller in a wider card. When the clamp is slack the stage *is*
the card and it costs nothing.

Measured at 1512x852 (a 14" with Chrome's chrome), 1512x700, 1512x1300 and
390x844: the two columns fill the content width at every one, the stage holds
0.7982 (= 716/897) at every one, and no image or video departs from its natural
ratio by more than 0.3% — that residual is `naturalWidth`/`naturalHeight` being
reported as integers for the SVG marks, and those letterbox rather than stretch
(see below).

**Backgrounds are CSS, not images.** Three of the four are `linear-gradient`s
copied straight off the Figma stops — no export, no file. Only Scallion uses a
photograph (`photo`, cropped to fill) under a gradient `scrim`.

**Art layers are centred.** Every one of them sits at 50% in the design — both
phones, the browser capture, the UCLA illustration — so `art` carries only `top`,
`width` and its box `ratio`. The `img` inside it carries the crop: the phones
lose a sliver off the bottom (`height: 101.43%`), and UCLA's is a window onto a
much larger illustration (`width: 224.12%`, offset left and up). That inner image
needs `max-width: none` — the global `img { max-width: 100% }` would shrink it
back into its box.

**Marks sit outside the stage**, anchored to the card's top-left, so they hug the
corner however wide the card gets — the one overlay carrying a `left` as well as
a `top`. They're sized by `height` (a percentage of the card's height, the same
factor the stage scales by, so they stay in step with the artwork) and their
width follows their own ratio, so they can't be stretched.

Figma exports its SVGs with **`preserveAspectRatio="none"`** on the root, which
makes them stretch to whatever box you give them instead of fitting it. It's
stripped from all three marks, so a rounding mismatch letterboxes by a fraction
of a pixel rather than distorting the logo. Strip it again if you re-export.
(The one left inside `scallion-studios-lockup.svg` is on its inner `<image>`,
where the width and height already match the bitmap — that one is correct.)

Card art lives in `public/work-cards/`.

#### The mobile frame

Phones follow their own Figma frame,
[75:25](https://www.figma.com/design/s3nMpcAsUdui2CaztfEC9E/Portfolio-Design?node-id=75-25),
a 402-wide artboard. It is **not** the desktop frame reflowed — two things
genuinely differ, so neither set of numbers can be derived from the other:

- the card is **362 x 423.5** (0.8548) against the desktop's 716 x 897 (0.7982),
  so every overlay percentage moves;
- every **mark is centred** at the top of the card rather than hung off its
  corner, so it takes a width where the desktop one takes a left and a height.

Each entry therefore carries a `mobile` block, and `Works.tsx` emits both sets
as custom properties (`--art-top` / `--m-art-top` and so on) for the stylesheet's
media query to pick between. No breakpoint is measured in JS and nothing
re-renders on resize. `--card-ratio` on `.section` is what swaps the box itself,
which `.mediaBox` and `.stage` both read.

The rest of the frame: nav a 325-wide row inset 32 at the top of the screen with
its items spread rather than gapped; hero copy centred in a 271 column at 16px;
folder 120 square with a 14px label; cards 20px radius, 40 apart, captions 16/14
inset 12; footer a row, title against 32px.

Two things it asks for that aren't built:

- Its nav reads **Home / Works / My story / Contact**. The code ships
  Home / Works / Resume — `My story` was removed as a section, so it would be a
  dead link, and `Resume` is what the desktop frame asks for in that slot. Worth
  reconciling the two frames before touching it.
- Its footer sets **Vicky Jen** at 32 above **Let's chat!** at 16, and the
  desktop frame does the same at 64/32. `Contact.tsx` only has the one line.

And one that couldn't be built: the frame draws its **own scallion lockup**, with
a smaller mark against the same wordmark. That's a separate export, and the
Figma MCP hit its per-seat rate limit before it could be pulled — so mobile
reuses the desktop lockup, sized so the wordmark lands at the frame's 20px and
centred on the same line. Its mark comes out chunkier than the Figma's. Export
node `75:238` as SVG (strip the background rects, as below) to fix it properly.

The folder's mobile spill is **not** in the frame — the frame only draws the
folder closed. The frame does set the folder high with a clear ~400px run
beneath it, though, so the scatter fans out into that run; see `FOLDER_MOBILE`
in `content/folderPhotos.ts`.

Its five boxes and the folder are laid out **disjoint** — nothing overlaps
anything else, captions included. The two tallest flank the folder (clear of it
horizontally) and the rest sit in bands below, each starting after the one above
has finished with its caption. The top two carry a *negative* y so they ride up
out of the box and over the hero copy; that overflow is what buys the room. A
photo's height there is `width / aspect * 39/41` — the last term because x is a
percentage of the box's width and y of its height — so re-check against that if
you move one. Verified disjoint at 360, 402 and 430 wide.

#### Exports: the white-background trap

Figma's PNG export of a node arrives **flattened onto white**, which paints a
white box on these dark cards. It bit both logo lockups:

- `scallion-studios-lockup.svg` — exported as **SVG** instead, which keeps its
  alpha. Figma bakes two background rects into that SVG (the canvas grey, and the
  whole 1512 x 3379 page); both have to be stripped. Don't try to key the white
  out of the PNG instead: the wordmark's gradient *ends* in white. It can't be
  rebuilt as live text either — it's set in Scanport, which isn't a webfont we
  ship.
- `airbnb-kleiner-perkins.svg` and `ucla-football-mark.svg` come down clean as
  SVG from `download_assets`.

`get_screenshot` also preserves alpha, but it won't render a node above its
natural size, so it is 1x only — no good for a retina asset.

#### The two video cards

The Figma has a still in each of these slots — it can't hold video — so the
recording takes the still's box. (Airbnb's slot is an empty rounded frame, which
is how you can tell it was always meant to be video.)

**Arena Club.** The recording carries a pale 4/2/3/4px surround, which reads as a
bright outline against the card, so `.phone` is sized to the phone's own bounds
(700 x 1461 of the 706 x 1468 frame) and clips it. The corner radius is written
`18.4286% / 8.8296%` — two values, so the horizontal and vertical radii are each
the chassis' own 129px measured on its own axis. A single percentage gives an
ellipse that opens up as the card grows.

The recording's phone is a slightly different ratio from the Figma's still (0.479
against 0.502), so it matches the still's **height** and takes its own width.
Matching the width instead would push the phone's foot to 96.7% of the card,
where the design leaves it at 91.5%.

**Airbnb.** Figma's window box is wider than the capture's own 1.748 ratio, so the
video matches its width and takes its natural height. Cropping it to the box
would take ~13% off the top and bottom of the UI, so the card carries a little
more red below the window than the Figma shows.

### `content/folderPhotos.ts`

The photos that spill out of the `[Untitled]` folder on hover. `x`/`y` are
percentages of the hero stage; **`width` is converted to frame units at render
time** in `FolderCollage` (`PCT_TO_FRAME`). Keep it that way: a percentage width
on a full-bleed box makes every photo inflate with the window until they collide.
Phones are the exception and still use percentages — that scatter is its own
portrait composition rather than the Figma frame.

`FOLDER` describes the folder **art**, not its Figma frame: the frame is a 201.58
box with the 165.66 art inset inside it, and the `[Untitled]` label is centred on
the art and flush to its bottom.

## Sub-pages

Two long pages, both laid out in `--pu` — one design pixel, **width-derived and
capped at 1px**. That differs from `--u` deliberately: `--u` also shrinks with
viewport *height* so the homepage fits one screen, which would make a long
article's type shrink on a short window.

| | route | frame | verified |
| --- | --- | --- | --- |
| My story | `/my-story` | 81:672, 1512 x 3671 | height exact; portrait and principles grid at the Figma coordinates to the decimal |
| Arena Club | `/work/arena-club` | 59:1467, 1512 x 9666 | height 9661; all seven section labels within 4-9px |

Blocks are placed at their **exact frame coordinates** rather than stacked in
flow. Flow accumulates rounding over a 9666px page, and neither frame is evenly
centred anyway — the principles grid sits at x=78.17 with a 48px right margin.

The case study is deliberately **off** the frame's own sizing in two ways, both
because the Figma runs large on a 14" fold:

- **Type is `--t: 0.81`** — every font-size on the page is a Figma pixel times
  that, so it's one number to nudge.
- **One measure for the whole page** — the facts block's, i.e. the frame's 200px
  side padding. Prose, figures and the before/after panel all share those edges.
  The panel keeps a **fold-locked height**
  (`--panel-h: min(962.141 * --pu, 100svh - 140px)`) and takes the full width,
  so it no longer holds the frame's 1389 x 962 ratio. Verified sharing edges at
  390, 430, 768, 1512, 1728 and 2560 wide.

  Because it can be any width now, the panel is **two equal halves** rather than
  absolutely-placed children — each keeps its label centred over its phone at any
  size. The phone heights are `calc(var(--panel-h) * 0.83041)` against the panel,
  not a percentage of the column, which would resolve against the padded box and
  quietly shrink them.

  The video corners use `border-radius: 18.43% / 8.83%` — that reads elliptical
  but comes out circular, because the phone is 0.47913 wide for its height, so
  both percentages resolve to the same length at any size.

The hero is the pack animation at `100svh` — exactly the first screen, at any
window height.

Three things that cost real time and will again:

- **The Arena Club frame is too large for `get_metadata`** — the call fails
  parsing. `get_design_context` on the same node returns the full structure and
  every asset URL, so use that.
- **Figma crops that aren't in the node box.** Several images carry an inner
  scale and offset (`h-[136.69%] top-[-8.9%]` and friends). Ignoring the Buy
  Again one made its section 250px too tall and pushed everything below it out
  of step. `.figureCrop` reproduces it.
- **Group gaps hide inside wrapper frames.** The tabs and the before/after panel
  are one group 73px apart, not the section's 60 — worth 13px of drift.

**Both before/after phones are video.** "After" is the homepage recording, which
carries its own chassis plus a pale surround, so it's clipped to the chassis'
bounds the way the homepage card does it. "Before" is a raw screen recording
composited INTO the mockup chassis by `scripts/build-phone-mockup.py` — over
`#f3f3f3`, the panel's own grey, so its soft edges blend instead of showing a
white card. That's why it needs no clipping. The same recording also stands in
for the design's still in the solution panel.

## Assets

The case study's **Back** link is pinned to the top-left corner for the whole
page: it hides on the way down and comes back the moment you scroll up, and is
always there near the top. Because the arrow is filled white in the file, it's
painted as a CSS **mask in `currentColor`** rather than as an `<img>` — that's
what lets the ink flip to black once the hero has passed under it, without a
second copy of the asset. See `app/work/arena-club/BackLink.tsx`.

Once you've scrolled past 40px it wears the same liquid glass as the homepage
nav, inverted over the hero art the same way, so it never depends on what
happens to be behind it. The pill's padding is subtracted from its `left`/`top`
so adding it didn't move the arrow off the frame's 48,48.

One trap worth remembering: the entrance animations on `.back`, `.lede` and the
hero used `animation-fill-mode: both`, and a *filling* animation outranks a
declared value — so `opacity: 0` on the hidden state did nothing while the arrow
still slid away. They're `backwards` now, which covers the delay and then gets
out of the way.

The case study's **Back arrow** is your hand-drawn `Group 12.svg`. It arrived as
three traced paths at 610KB, which is a lot for an arrow, so it went through
SVGO at precision 1 — 30KB on disk, 10KB gzipped, and indistinguishable from the
original at 8x the size it's ever displayed. Its paths are filled white rather
than `currentColor`, which is right where it lives (over the hero art) but means
it can't be reused on a light ground as-is. The forward arrow on *Next project*
is still the plain drawn-in-code one — say the word if you want it swapped for a
mirrored copy of this.

The five **tool icons** on the case study were normalised, not just restyled.
They came out of Figma at three different scales, and three of them carried an
opaque sheet behind the tile (`#fafafa` on Codex, white on OpenAI and Spline) —
so a `box-shadow` drew a square around a tile that only looked round. Each is
now a 180px tile filling its own frame with genuinely transparent, rounded
corners (22.5%, iOS-ish), which lets one square box, one radius and one shadow
cover all five. The pre-edit exports are in this session's scratchpad under
`tool-orig/`, since the project isn't under version control.

`public/assets/` holds art derived from the Figma export:

| File | What it is |
| --- | --- |
| `folder.png` | the full folder |
| `folder-front.png` | the front panel, cut at the paper line (26.05% down its square canvas) so photos slide out of the slot rather than from behind the whole folder |
| `cursor.png` / `cursor@2x.png` | the pixel arrow, 34×53 (and 68×106), hotspot at the tip |

Two traps if you re-export the cursor from node 49:423. The node's box is
47.5 x 81.5, but that is **not** the arrow's size — the placed image carries
white padding and the arrow is only ~33.5 x 52.75. Sizing to the node box
stretches it. And the export arrives with a **solid white background**: flood-fill
the near-white from the four corners rather than keying every white pixel, or you
also erase the arrow's own white fill, which is enclosed by its black outline.

The cursor is applied in `app/globals.css` with `image-set()` on `html`, not a
JS follower — a JS element lags the real pointer and breaks over text selection.
It's switched off under `@media (hover: none), (pointer: coarse)`.

`scripts/build-phone-mockup.py` composites an iPhone screen recording into a
mockup chassis. Nothing on the page uses it — both recordings already carry their
own chassis — but it's kept because the chassis-isolation logic (flood-fill from
the screen centre, not the outside) is fiddly to rediscover.

## Fonts

`public/fonts/` — **QJae** (the handwriting) and **Brut Grotesque** Regular +
Medium, declared in `app/globals.css`. Brut Grotesque is a licensed Bureau Brut
face; these are its WEB-kit `.woff2` files, which are publicly fetchable once
deployed. Worth confirming your licence covers web use before going live.

## Behaviour notes

- **Nav** is a pill centred at the top of the window. Unscrolled it's bare text;
  past 24px of scroll it gains liquid glass — a blurred, saturated sample of
  what's behind, a hairline rim and a bright inner top edge.

  **Its ink follows the actual background luminance.** "Is a card behind it?"
  isn't good enough: the backgrounds are gradients, and UCLA's runs from deep
  blue to a pale gold reaching 0.77 luminance, where white text disappears. So
  each card carries a 64-sample luminance profile of its background
  (`backdrop` in `content/work.ts`, emitted as `data-lum`), and
  `lib/useOnDark.ts` reads the row actually sitting behind the pill. The profiles
  describe the **rendered** card, so the lookup is a straight proportion — there
  is no cover crop to correct for now that the card box and the design box are
  the same 716 x 897.

  The switch is at 0.42. The dark cards top out around 0.29 (scallion) and 0.38
  (airbnb) and want white; the gradient feet climb to 0.49 (arena's bright blue)
  and 0.77 (ucla's gold) and want black. 0.42 sits in that gap, so nothing flips
  while it still reads well.

  In the 2x2 grid the centred pill has **one card under each end of it** and a
  40px strip of white page showing between them, so it only goes white when
  *every* card it overlaps is dark. Where the two disagree — the foot of the last
  row, Airbnb's red beside UCLA's gold — it falls back to black, which is the one
  that stays readable across the whole pill. The glass backing is what makes that
  work; without it black over Airbnb's mid-red would be marginal.

  Regenerate the profiles if you change a background. Three of the four are
  computed from their gradient stops rather than sampled — gamma-encoded Rec.709
  luma on the sRGB bytes, which is what the 0.42 threshold is calibrated to.

  The `Resume` item points at `/resume.pdf` — **that file does not exist yet**.
- **A first landing is covered until the page is ready.** `components/BootLoader.tsx`
  renders a cover in the *first paint* — it's a server-rendered client component,
  so it's in the HTML rather than appearing a moment later — and lifts once the
  fonts and the media have settled, or after 3.5s, whichever comes first. The
  page fades up underneath it over 700ms.

  The spinner (twelve tapered spokes, macOS-style, each a twelfth of a turn
  behind the last) and the word *loading* only appear if the wait passes 350ms,
  so a fast load never flashes them. `data-boot` on `<html>` is what fades the
  page in, and only this component ever sets it — so a page whose script doesn't
  run is simply visible.
- **Leaving the homepage dissolves rather than cuts.** The page fades to the
  page colour over 220ms, the route swaps behind that veil, and the new page
  fades up over 300ms into its own entrance — the hero fades in, the text rises
  under it, and the scroll reveals take over from there. `lib/pageTransition.ts`,
  used by both the work cards and the My story nav item.

  The veil is appended to `document.body`, outside the React root, so it
  survives the route change happening underneath it. Modifier-clicks,
  non-internal hrefs and reduced motion all fall through to a plain navigation.

  There is deliberately **no zoom anywhere in it** — not on the veil, not on the
  hero, not on the portrait. An earlier version grew the clicked thumbnail to
  full bleed; it was replaced because the magnification is loud and it crops the
  art to something the destination page never shows.
- **Blocks fade and rise as they scroll into view**, sitewide. Anything marked
  `data-reveal` is observed by `components/ScrollReveal.tsx`, mounted once in
  the root layout. It's one document-wide observer rather than a wrapper
  component per block, because the sub-pages place their blocks at exact frame
  coordinates and an extra wrapping element would break that.

  Two safeguards: the hiding rule is keyed off `html[data-reveal="on"]`, which
  the script sets on mount, so nothing is ever left invisible if it doesn't run;
  and the observer's top margin is effectively unbounded, so anything already
  scrolled past counts as seen — otherwise jumping down the page leaves the
  blocks it skipped hidden until you scroll back up.
- **The food photos on My story stay inside the Instagram screenshot** until
  you hover it (or tap, on a phone) — then they spread to their places in the
  frame and settle at a tilt. Each one's closed position is the offset from its
  own centre to the screenshot's, worked out in `app/my-story/FoodScatter.tsx`,
  so they all collapse into the same point rather than shrinking where they
  stand.

  Phones can't hover, so the shot rocks gently and says *tap here* — both stop
  the moment it opens. And the photos there live in a `0fr`/`1fr` grid row
  rather than merely being hidden, so a closed scatter takes no room at all
  instead of leaving a hole in the page.
- **The case study's lede reads itself.** Its words start grey and turn black as
  you scroll through them, like a karaoke line — `app/work/arena-club/Lede.tsx`.
  Progress comes from where the paragraph sits in the window (lighting from 82%
  down to 36% of the window height) rather than from an absolute scroll
  position, so it behaves the same however the page is entered, including
  landing on it already scrolled. Reduced motion gets the whole line black at
  once. Only this paragraph does it; everything else on the page is plain.
- **Press and hold on empty page and confetti spouts out** — in surges rather
  than a steady stream, a fountain rather than a hose. Each pulse throws a batch
  up a cone; hold on and the pulses come faster (460ms apart down to 160) and
  carry more (2 pieces up to 28), until it's really spouting. Letting go sets
  off one last pop, all round and sized by how long you leaned on it.
  `components/Confetti.tsx`.

  It's drawn on a canvas, not as elements — at full pelt there are well over a
  hundred pieces on screen and that's a lot of DOM to move every frame. Two
  things worth keeping: each surge takes a common aim and power with a little
  jitter, so the batch travels together and no two surges look alike; and the
  drag is per-60th-of-a-second — at the 0.86 I started with, sideways throw died
  within a few frames and the whole thing collapsed into a column instead of
  arcing. Capped at 220 live pieces. Holding anything interactive does nothing,
  and reduced motion turns it off completely.
- **Touch** has no hover, so tap the folder to open/close it.
- **The spill isn't rendered until the hero layer has been measured.** Every
  closed position is derived from that box, so rendering against a zero box and
  then measuring had motion animate the photos from wherever that put them into
  the folder — in full view, on first paint.
- **The folder spill runs 15% larger than the Figma frame's own sizes on
  desktop** (`PHOTO_SCALE` in `components/FolderCollage.tsx`) and sits *above*
  the hero copy rather than behind it. Each photo grows about its own centre —
  the left/top offsets pull back half the growth — which keeps the composition
  where the frame put it and keeps the fan-out springs, computed off the
  unscaled size, exactly right. The folder art itself is not scaled.
- **Reduced motion** — the folder cross-fades instead of springing and scrolling
  is instant.
- The hero is the only `scroll-snap-align` point left. The work cards were each
  one too when they were a screen tall; in a grid there is no whole-card position
  to snap to, so the section just scrolls.
