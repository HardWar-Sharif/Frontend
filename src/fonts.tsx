import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'IRANRounded';
        font-style: normal;
        font-weight: 900;
        src: url('../public/fonts/IRAN-Rounded.eot');
        src: url('../public/fonts/IRAN-Rounded.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
          url('../public/fonts/IRAN-Rounded.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
          url('../public/fonts/IRAN-Rounded.ttf') format('truetype');
      }
      `}
  />
);

export default Fonts;
