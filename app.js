//--> Variables <--\\
// Essential Components \\

// Root Element, Here Is Where Everything Will Append To
const rootElement = document.querySelector(".root");
// Starting Point: starting template and main
// elements and components to work with later
const template = `
<div class="container">
  <h1>To-Do App</h1>
  <div class="inputs-container">
      <input type="text" required tabindex="0" class="input-text" maxlength="50" size="29"
      placeholder="Add items that you want to do...">
      <button class="input-submit" tabindex="1" >+ Add</button>
  </div>
  <hr>
  <div class="main-content">
      <ul>
      </ul>
  </div>
  <button class="clear">Clear</button>
</div>
`;

////////////////// --Manipulate The DOM And Target Elements-- \\\\\\\\\\\\\\\

// Add Template To The DOM \\
rootElement.innerHTML = template;

// Target Elements \\
const textInput = document.querySelector(".input-text");
const addButton = document.querySelector(".input-submit");
const ulElement = document.querySelector("ul");
const clearButton = document.querySelector(".clear");

//--> Add Item Function <--\\
function addItem() {
  // Put Input Value, In A Varriable
  // Use The Trim() Function To Delete Before And After Input Text Spaces
  let textEnterd = textInput.value.trim();

  if (textEnterd.length < 1) {
    // If The text Input Is Empoty it clears the input box,
    // And Does Not Allow To Append, Nothing As An Element To The DOM,
    textInput.value = "";
  } else {
    // Create A Date Object Instance
    const date = new Date();

    //--> Create Elements or Components To Work With <--\\

    // The li Element Itself, It's A Wrapper Or Container
    let liElement = document.createElement("li");
    // A General Container To Seprate Element From Horizontal Line
    let divElement = document.createElement("div");
    // Span: Text Container
    let spanElement = document.createElement("span");
    // Div: Buttons Container
    let divContainerElement = document.createElement("div");
    // Done Button
    let doneButton = document.createElement("button");
    // Edit Button
    let editButton = document.createElement("button");
    // Delete Button
    let deleteButton = document.createElement("button");
    // div: Contains Date
    let divDateWrapper = document.createElement("div");
    // Paragraph: Before Date
    let pDateElement = document.createElement("p");
    // Span: Inside Date
    let spanDateElement = document.createElement("span");

    //--> Add Elements or Components To DOM and Also Add Their Classes: "IN-ORDER " <--\\

    // Set The Text Input Value To The Span Element Which Basically Is A Text
    // Container Or Content Container, Element
    spanElement.append(textEnterd);
    // Append The Span Element Inside The div Element
    divElement.append(spanElement);
    // Add "btn-group" Class To The Div Container Which Holds Butons
    divContainerElement.classList.add("btn-group");
    // Add "main-container" Class To The Div Container Which Holds Other Elements
    divElement.classList.add("main-container");
    // Add The "✔" Sign To Done Button,
    // Add The "done" Class To The Done Button,
    // Append Done Button To The Div Container
    doneButton.append("✔");
    doneButton.classList.add("done");
    divContainerElement.appendChild(doneButton);
    // Add The "✖" Sign To Done Button,
    // Add The "delete" Class To The Done Button,
    // Append Done Button To The Div Container
    deleteButton.append("✖");
    deleteButton.classList.add("delete");
    divContainerElement.appendChild(deleteButton);
    // Add The "✏️" Sign To Done Button,
    // Add The "edit" Class To The Done Button,
    // Append Done Button To The Div Container
    editButton.append("✏️");
    editButton.classList.add("edit");
    divContainerElement.appendChild(editButton);
    // Append Div Container To div Element
    divElement.append(divContainerElement);
    // Div Element = append "span" with text inside it
    divDateWrapper.append(spanDateElement);
    // Fill span with "Created: " Text
    spanDateElement.innerHTML = "Created: ";
    // Add "p-date" class to it
    divDateWrapper.classList.add("p-date");
    // Append "span" Element to the p element
    divDateWrapper.append(pDateElement);
    // Add the current time to the span element, the time is based on when you created the item
    // Set span innerHTML To Date Object
    pDateElement.innerHTML = `${date.toDateString()} - ${date.toLocaleTimeString()}`;
    // Add "date" Class To Span Element
    pDateElement.classList.add("date");
    // Append Div Element Which Contains Other Elements except Horizotal Line To The li Element
    liElement.append(divElement);
    // Append P Element To li Element
    liElement.append(divDateWrapper);
    // Finally Append The Entire li Element To The ul Element Container
    ulElement.appendChild(liElement);

    // Set The Clear Button Dispaly To Block Whenever The Fisrt Element Created By Adding A Class \\
    clearButton.classList.add("clear-appear");

    // Clear The Input \\
    textInput.value = "";

    // Put span Text Inside a variable \\
    let spanText = spanElement.innerText;

    //-->  Delete-Key To Delete An Element From DOM Completely <--//
    deleteButton.addEventListener(
      "click",
      function () {
        liElement.outerHTML = "";
        if (!ulElement.innerText) {
          clearButton.classList.remove("clear-appear");
        }
      },
      false
    );

    //-->  Done-Key To Show An Element Has Been Done In Fact It Toggles The Element On And Off <--//
    doneButton.addEventListener(
      "click",
      function () {
        if (liElement.classList != "font") {
          // an if statement to check if the text is between 1 to 50 charecters,
          // an also removes before and after spaces and also removes special
          // charectars or symbols (because in a html document spaces are added
          // by a sequnce of charectrs "&nbsp") then check if text is between 1 to 50
          // whithout considering those equence of charecters "&nbsp"
          // and what it basically does is that first it trim() the text
          // to remove before and after white spaces and then replace the charectes
          // which produce white spaces even if you put more than 1 white space even
          // whitin a text it removes the white spaces
          if (
            spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
            spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
          ) {
            if (
              spanText.trim().replace(/&nbsp;/g, "") !=
              spanElement.innerText.trim().replace(/&nbsp;/g, "")
            ) {
              let editSpanElement = document.createElement("span");
              editSpanElement.innerHTML = "Edited";
              editSpanElement.classList.add("edited");
              divElement.after(editSpanElement);
            }
            // Create a new instance of the date object to specify when the task has been done
            const newDate = new Date();
            // Create a new div element
            let divDoneElement = document.createElement("div");
            // Create a new p element
            let pDoneElement = document.createElement("p");
            // Create a new span element
            let spanDoneElement = document.createElement("span");
            // Pdiv Element = append "pDoneElement" with text inside it
            divDoneElement.append(spanDoneElement);
            // Add "done-date" class to the new p element
            divDoneElement.classList.add("done-date");
            // Add "done-date" class to the new p element
            spanDoneElement.innerHTML = "Done: ";
            // append new span element to the it's parent (new p element)
            divDoneElement.append(pDoneElement);
            // Set new Span innerHTML To Date Object
            pDoneElement.innerHTML = `${newDate.toDateString()} - ${newDate.toLocaleTimeString()}`;
            // Add "date" Class To new Span Element
            pDoneElement.classList.add("new-date");
            // Delete All Spaces Before And After The Text
            divDateWrapper.after(divDoneElement);
            spanElement.innerHTML = spanElement.innerHTML
              .trim()
              .replace(/&nbsp;/g, "");
            // Add Font Class To The Element Permanently
            liElement.classList.add("font");
            // OR
            // We Can Toggle It On or Off
            // ++liElement.classList.toggle("font");++ \\
            // set span element "contenteditable" atribute to false permanently
            spanElement.setAttribute("contenteditable", false);
          }
        }
      },
      false
    );

    //-->  Edit-Key To Edit An Element or Item From DOM <--//
    editButton.addEventListener(
      "click",
      function () {
        // ********* Fisrt Implementation ********* //
        // -Based On Browser Prompt Window- \\
        // (Current Status = "Disable")
        // if (liElement.classList != "font") {
        //   let spanValue = prompt("Enter New Item!");
        //   while (spanValue.length < 1) {
        //     spanValue = prompt("Enter New Item!");
        //   }
        //   spanElement.innerHTML = spanValue;
        // }

        // ********* Second Implementation ********* //
        // +Based On HTML Contenteditable Attribute- \\
        // (Current Status = "Enable")

        // ---------------------------------------------------------------

        //--> Logic: Edit button has 3 steps <--//
        /* 1: fisrt step is when you click on the edit button of each
        individual element and enables the "contenteditable"
        attribute to edit the "span" text, and this is the only way to
        enable "contenteditable" attribute, there are
        no other ways to do that even "Enter" Key
        2: Second step has two sub parts and it is when you have clicked the
        edit button and the "contenteditable" attribute has already enabled
        so here we have two ways to disable that,
        1- fisrt is to edit the content and then click the edit button again
        to disable it
        2- the second one is to press "Enter" key to disable that and this
        option works ok in both desktop and mobile
        and also it doesn't have the insert line bug in anyway */
        if (liElement.classList != "font") {
          // Bind the span element to the keydown action
          spanElement.addEventListener("keydown", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action of "Enter" Key Because it inserts a new line
              event.preventDefault();
              if (
                spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
                spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
              ) {
                if (
                  spanText.trim().replace(/&nbsp;/g, "") !=
                  spanElement.innerText.trim().replace(/&nbsp;/g, "")
                ) {
                  let editSpanElement = document.createElement("span");
                  editSpanElement.innerHTML = "Edited";
                  editSpanElement.classList.add("edited");
                  divElement.after(editSpanElement);
                }
                spanElement.innerHTML = spanElement.innerHTML
                  .trim()
                  .replace(/&nbsp;/g, "");
                spanElement.setAttribute("contenteditable", false);
              }
            }
          });

          if (spanElement.getAttribute("contenteditable") == "true") {
            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
              spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
            ) {
              if (
                spanText.trim().replace(/&nbsp;/g, "") !=
                spanElement.innerText.trim().replace(/&nbsp;/g, "")
              ) {
                let editSpanElement = document.createElement("span");
                editSpanElement.innerHTML = "Edited";
                editSpanElement.classList.add("edited");
                divElement.after(editSpanElement);
              }
              spanElement.innerHTML = spanElement.innerHTML
                .trim()
                .replace(/&nbsp;/g, "");
              spanElement.setAttribute("contenteditable", false);
            }
          } else {
            spanElement.setAttribute("contenteditable", true);
          }
        }
      },
      false
    );
  }
}

////////////////// --Event Listeners-- \\\\\\\\\\\\\\\\\

//--> To Add An Element To DOM, It Is The Starting Point and The Main Part Of The App <--//

// Add an element by clicking the add button
addButton.addEventListener("click", addItem, false);
// Add an element by Pressing the "Enter" Key
textInput.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Runs the "addItem" function, basically when you press the
    // "Enter" Key it adds an item to the DOM and this is exactly
    // the same as clicking the add button
    addItem();
    // OR
    // addButton.addEventListener("click", addItem(), false);
  }
});

//--> To Clear All the Elements From DOM And Then Hide The Clear Button Itself <--//

clearButton.addEventListener(
  "click",
  function () {
    ulElement.innerHTML = "";
    textInput.value = "";
    clearButton.classList.remove("clear-appear");
  },
  false
);
