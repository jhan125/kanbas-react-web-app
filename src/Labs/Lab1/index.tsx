// Below line is temporarily used to ignore the warning that "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images"
/* eslint-disable jsx-a11y/alt-text */

export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>

            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and subsections. Each section is usually
                prefaced with a short title or heading that attempts to summarize the topic of the section it precedes.
                For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings
                are usually larger and bolder than their subsection headings. This document uses headings to introduce
                topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format
                plain text so that it renders in a browser as large headings. There are 6 heading tags for different
                sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
            </div>

            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1"> ... </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>
            </div>

            <div id="wd-lists">
                <h4>Lists Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>

                My favorite recipe:
                <ol id="wd-your-favorite-recipe">
                    <li>Bring water to a boil in a pot.</li>
                    <li>Place the instant noodles into the boiling water and cook for 3-5 minutes, until soft.</li>
                    <li>During this time, slice and fry Spam meat in a pan until crispy.</li>
                    <li>In the same pan, fry an egg sunny-side-up until the whites are set but the yolk remains runny.</li>
                    <li>Stir well with seasoning packet, add toppings we prepared, and enjoy this quick but tasty meal!</li>
                </ol>

                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>

                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                    <li>Bible</li>
                    <li>Harry Potter Series</li>
                    <li>Stories of Your Life and Others</li>
                    <li>The Juggling ACT: Balancing Your Family, Faith and Work</li>
                </ul>
            </div>

            <div id="wd-tables">
                <h4>Table Tag</h4>
                {/* Table, sets border and width */}
                <table border={1} width="100%">
                    {/* Table heading section */}
                    <thead>
                        { /* Headings row */}
                        <tr>
                            <th>Quiz</th>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Grade</th>
                        </tr>
                    </thead>

                    {/* Table's main content */}
                    <tbody>
                        {/* Row 1's columns */}
                        <tr>
                            <td>Q1</td>
                            <td>HTML</td>
                            <td>2/3/21</td>
                            <td>85</td>
                        </tr>
                        {/* Row 2's columns */}
                        <tr>
                            <td>Q2</td>
                            <td>CSS</td>
                            <td>2/10/21</td>
                            <td>90</td>
                        </tr>
                        {/* Row 3's columns */}
                        <tr>
                            <td>Q3</td>
                            <td>JavaScript</td>
                            <td>2/17/21</td>
                            <td>95</td>
                        </tr>
                    </tbody>

                    {/* Table footer */}
                    <tfoot>
                        {/* Footer row */}
                        <tr>
                            {/* Data spans 3 columns */}
                            <td colSpan={3}>Average</td>
                            {/* Data for coloumn 4 */}
                            <td>90</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div id="wd-images">
                <h4>Image tag</h4>
                Loading an image from the internet:
                <br />
                <img id="wd-starship"
                    width="400px"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                <br />
                Loading a local image:
                <br />
                <img id="wd-teslabot" src="../../../public/images/teslabot.jpg" height="200px" />
            </div>

            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    {/* placeholder and title give info hints. Value attribute is optional. */}
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input id="wd-text-fields-username" placeholder="jdoe" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" id="wd-text-fields-password" value="123@#$asd" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" title="John" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
                        value="Wonderland" title="The last name" />


                    <h5>Text boxes</h5>
                    {/* Textarea tag -> long form text with configured width height. 
                        Placeholder, tooltip -> give hints. Default value is in tag's body. */}
                    <label>Biography:</label><br />
                    <textarea id="wd-textarea" cols={30} rows={10}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </textarea>


                    <h5 id="wd-buttons">Buttons</h5>
                    <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
                        Hello World!
                    </button>


                    <h5>File upload</h5>
                    <input id="wd-upload" type="file" />


                    <h5 id="wd-radio-buttons">Radio buttons</h5>
                    {/* use the input tag's checkbox type to declare a checkbox.
                        use checked to set the checkbox's as initially checked. */}

                    <label>Favorite movie genre:</label><br />
                    <input type="radio" name="radio-genre" id="wd-radio-comedy" />
                    <label htmlFor="wd-radio-comedy">Comedy</label><br />
                    <input type="radio" name="radio-genre" id="wd-radio-drama" />
                    <label htmlFor="wd-radio-drama">Drama</label><br />
                    <input type="radio" name="radio-genre" id="wd-radio-scifi" />
                    <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
                    <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
                    <label htmlFor="wd-radio-fantasy">Fantasy</label>

                    <h5 id="wd-checkboxes">Checkboxes</h5>
                    <label>Favorite movie genre:</label><br />
                    <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
                    <label htmlFor="wd-chkbox-comedy">Comedy</label><br />
                    <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
                    <label htmlFor="wd-chkbox-drama">Drama</label><br />
                    <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
                    <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
                    <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
                    <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

                    <h4 id="wd-dropdowns">Dropdowns</h4>
                    {/*  Wrap several option tags in a select tag. 
                         Optionally provide option's value, otherwise the option's text is the value of the select element. */}
                    <h5>Select one</h5>
                    <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br />
                    <select id="wd-select-one-genre">
                        <option value="COMEDY">Comedy</option>
                        <option value="DRAMA">Drama</option>
                        <option selected value="SCIFI">Science Fiction</option>
                        <option value="FANTASY">Fantasy</option>
                    </select>

                    <h5>Select many</h5>
                    {/* Alternatively use attribute multiple to allow selecting more than one option.        
                        Use ctrl+click to select more than one option */}
                    <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br />
                    <select id="wd-select-many-genre" multiple>
                        <option selected value="COMEDY">Comedy</option>
                        <option value="DRAMA">Drama</option>
                        <option selected value="SCIFI">Science Fiction</option>
                        <option value="FANTASY">Fantasy</option>
                    </select>


                    <h4>Other HTML field types</h4>

                    <label htmlFor="wd-text-fields-email"> Email: </label>
                    <input type="email"
                        placeholder="jdoe@somewhere.com"
                        id="wd-text-fields-email" /><br />

                    <label htmlFor="wd-text-fields-salary-start"> Starting salary:
                    </label>
                    <input type="number"
                        id="wd-text-fields-salary-start"
                        placeholder="1000"
                        value="100000" /><br />

                    <label htmlFor="wd-text-fields-rating"> Rating: </label>
                    <input type="range" id="wd-text-fields-rating"
                        placeholder="Doe"
                        max="5"
                        value="4" /><br />

                    <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                    <input type="date"
                        id="wd-text-fields-dob"
                        value="2000-01-21" /><br />

                </form>
            </div>

            <h4>Anchor tag</h4>
            {/* Navigate to other websites/pages within the same website. */}
            Please <a id="wd-lipsum" href="https://www.lipsum.com">click here</a> to get dummy text<br />
            Click <a id="wd-github" href="https://github.com/jhan125/kanbas-react-web-app/tree/a1">this link</a> to view code on GitHub
        </div>
    );
}