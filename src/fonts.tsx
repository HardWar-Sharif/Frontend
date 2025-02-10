import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&display=swap');

      @font-face {
        font-family: 'IRANRounded';
        font-style: normal;
        font-weight: 900;
        src: url('fonts/IRAN-Rounded.eot');
        src: url('fonts/IRAN-Rounded.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
          url('fonts/IRAN-Rounded.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
          url('fonts/IRAN-Rounded.ttf') format('truetype');
      }

      @font-face {
        font-family: 'SevenSegment';
        font-style: normal;
        font-weight: 900;
        src: 
          url('fonts/Seven-Segment.ttf') format('truetype');
      }
    `}
  />
);

export default Fonts;
