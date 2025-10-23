## Installation

1. `npm install`
2. `npm start`

## Step to Reproduce

1. Disable cache and navigate to [https://notch-malachite-scooter.glitch.me/](https://notch-malachite-scooter.glitch.me/). The page contains the following CSS:

```
@font-face {  
  font-family: "Open Sans";  
  src: url("/fonts/OpenSans-Regular.woff2") format("woff2");  
  font-display: optional;  
}  
  
p {  
  font-family: "Open Sans", monospace;  
}  
```

2. If you have the Open Sans font installed locally on your OS, then the page will jump once the font has finished downloading (similarly to `font-display: swap`).
3. If you do not have the local font, install the Open Sans font and the page will jump.

Tested on Ubuntu and MacOS (stable and dev channels).

**Problem Description:**  
Demo: [https://notch-malachite-scooter.glitch.me/](https://notch-malachite-scooter.glitch.me/)

As per spec ([https://drafts.csswg.org/css-fonts-4/#font-display-desc](https://drafts.csswg.org/css-fonts-4/#font-display-desc)), "an optional font must never cause the layout of the page to "jump" as it loads in".

I noticed that when using `font-display: optional`, the font jumps and behaves similarly to `font-display: swap` if the device has the same font family installed locally on the operating system.

I would expect that when using `font-display: optional` it would not cause any layout-shift, irrespective of whether the user has the font installed locally or not.

---

Demo: [https://notch-malachite-scooter.glitch.me/4](https://notch-malachite-scooter.glitch.me/4)

In the above demo, the page contains the following CSS snippet:

```
@font-face {  
  font-family: "Open Sans";  
  src: url("/fonts/Zeyada-Regular.woff2") format("woff2");  
  font-display: optional;  
}  
```

The font file Zeyada-Regular refers to the cursive font found here: [https://fonts.google.com/specimen/Zeyada](https://fonts.google.com/specimen/Zeyada).

When using `font-display: optional`, if the page does not download the font in time, it will swap to the locally installed Open Sans, causing a layout shift as well as incorrectly using the local font file.

If you refresh the page (cache enabled) then you will be able to recognize the different font. I have prepared a demo page which does not use `font-display: optional` to help recognize the different font-family: [https://notch-malachite-scooter.glitch.me/5](https://notch-malachite-scooter.glitch.me/5).
1. Disable cache and navigate to [https://notch-malachite-scooter.glitch.me/](https://notch-malachite-scooter.glitch.me/). The page contains the following CSS:

```
@font-face {  
  font-family: "Open Sans";  
  src: url("/fonts/OpenSans-Regular.woff2") format("woff2");  
  font-display: optional;  
}  
  
p {  
  font-family: "Open Sans", monospace;  
}  
```

2. If you have the Open Sans font installed locally on your OS, then the page will jump once the font has finished downloading (similarly to `font-display: swap`).
3. If you do not have the local font, install the Open Sans font and the page will jump.

Tested on Ubuntu and MacOS (stable and dev channels).

**Problem Description:**  
Demo: [https://notch-malachite-scooter.glitch.me/](https://notch-malachite-scooter.glitch.me/)

As per spec ([https://drafts.csswg.org/css-fonts-4/#font-display-desc](https://drafts.csswg.org/css-fonts-4/#font-display-desc)), "an optional font must never cause the layout of the page to "jump" as it loads in".

I noticed that when using `font-display: optional`, the font jumps and behaves similarly to `font-display: swap` if the device has the same font family installed locally on the operating system.

I would expect that when using `font-display: optional` it would not cause any layout-shift, irrespective of whether the user has the font installed locally or not.

---

Demo: [https://notch-malachite-scooter.glitch.me/4](https://notch-malachite-scooter.glitch.me/4)

In the above demo, the page contains the following CSS snippet:

```
@font-face {  
  font-family: "Open Sans";  
  src: url("/fonts/Zeyada-Regular.woff2") format("woff2");  
  font-display: optional;  
}  
```

The font file Zeyada-Regular refers to the cursive font found here: [https://fonts.google.com/specimen/Zeyada](https://fonts.google.com/specimen/Zeyada).

When using `font-display: optional`, if the page does not download the font in time, it will swap to the locally installed Open Sans, causing a layout shift as well as incorrectly using the local font file.

If you refresh the page (cache enabled) then you will be able to recognize the different font. I have prepared a demo page which does not use `font-display: optional` to help recognize the different font-family: [https://notch-malachite-scooter.glitch.me/5](https://notch-malachite-scooter.glitch.me/5).