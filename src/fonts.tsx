import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @import url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css');

      @font-face {
        font-family: 'SevenSegment';
        
        src: 
          url('fonts/Seven-Segment.ttf') format('truetype');
      }

      div.seven-segment {
        font-family: 'SevenSegment' !important;
      }
    `}
  />
);

export default Fonts;
