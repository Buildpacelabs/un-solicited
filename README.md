# UN—SOLICITED

A single-page proposal from **Buildspace Labs** × **Last Agency**.

Static. One HTML file. No framework, no dependencies, no backend, no tracking.
~30KB.

---

## The idea

The page is structured as a *second collection* — five items, each naming a
problem, presented in the format of a product line rather than a services deck.

It opens with a gate that accepts every password, including no password at all.
That is the argument, delivered before any of the argument is read: a gate that
always opens is a door.

## Structure

| # | Surface |
|---|---|
| 00 | The gate |
| 01 | The stamp — hero |
| 02 | The receipt — counted facts, no opinion |
| 03 | The second collection — five items |
| 04 | The one we'd ship first |
| 05 | Who's talking |
| 06 | The terms |
| 07 | The close |
| 08 | Stamp-out |

## Build gates

`lint.mjs` runs as a pre-deploy check and enforces:

1. **The dash rule** — an em-dash may only follow a negation prefix
   (`UN—`, `MIS—`, `DIS—`, `IM—`). Ordinary compounds take a plain hyphen
   (`PRE-ORDERS`, `MONTH-TO-MONTH`). This is the single most important rule in
   the document; one violation undoes the credibility of the whole page.
2. **No green** anywhere in the stylesheet — green alongside the accent red
   reads as a clearance-sale palette.
3. **No non-zero `border-radius`.**

```bash
node lint.mjs
```

## Local

```bash
python3 -m http.server 8899
```

## Configuration

The contact address for the closing `mailto:` links is the `CONTACT` constant at
the top of the inline script in `index.html`. **Set this before sending the
link.**

## Accessibility & behaviour notes

- `prefers-reduced-motion: reduce` skips the unlock sequence entirely and opens
  the gate immediately.
- The gate never blocks: pressing Enter, typing three characters, or waiting six
  seconds all open it. The six-second path types itself.
- On touch devices the input is deliberately **not** autofocused — a keyboard
  slamming up is a hostile first impression.
- Accent red is never set below 14px; smaller text uses white or grey.
