import "./index.css"; 
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners"
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";

export default function Lab2() {
  return (

    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>

      {/* 3.1.1 Styling elements with the style attribute */}
      {/* 
      <p style={{ backgroundColor: "blue",
                  color: "white" }}>
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
        it is considered bad practice and you should avoid
        using the style attribute
      </p>
      */}

      <p>
        Style attribute allows configuring look and feel right on the element.
        Although it's very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam</p>

      {/* 3.1.2 Importing CSS documents see line 1 */} 

      {/* 3.1.3 Selecting content with ID selectors */}
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>

      {/* 3.1.4 Selecting content with class selectors */}
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>

       {/* 3.1.5 Selecting content based on the document structure */}
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>

      {/* 3.1.6 CSS Rule Mechanism
        CSS Rules:
        1. ID selector is more specific than a class selector, and a class selector is more specific than a tag name selector.
        2. LAST rule defined in the CSS will take precedence, if there're multiple rules.
        3. Some styles are inherited by child elements from their parent elements, such as font styles. However, properties like width and margin are not inherited.
      */}

      {/* 3.1.7 Styling the foreground color */}
      <ForegroundColors />

      {/* 3.1.8 Styling the background color */}
      <BackgroundColors />
      
      {/* 3.1.9 Styling the borders */}
      <Borders />
      
      {/* 3.1.10 Styling margins and paddings */}
      <Padding />
      <Margins />
      
      {/* 3.1.11 Styling corners */}
      <Corners />

      {/* 3.1.12 Styling dimensions */}
      <Dimensions />
      
      {/* 3.1.13&14&15 Styling positions (relative, absolute, fixed) */}
      <Positions />

      {/* 3.1.16 Styling z-index */}
      <Zindex />

      {/* 3.1.17 Floating images and content */}
      <Float />

      {/* 3.1.18 Laying out content in a grid */}
      <GridLayout />
      
      {/* 3.1.19 Flex */}
      <Flex />

    </div>
  );
}
