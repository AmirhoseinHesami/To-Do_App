//--> Variables: Essential Components <--\\

const rootElement = document.querySelector(".root");
// Starting Point: starting template and main
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

// Add Template To The DOM \\
rootElement.innerHTML = template;

////////////////// --Manipulate The DOM And Target Elements-- \\\\\\\\\\\\\\\

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
    textInput.value = "";
  } else {
    // Create A Date Object Instance
    const date = new Date();
    // The li Element Itself, It's A Wrapper Or Container
    let liElement = document.createElement("li");
    liElement.innerHTML = `
      <div class="main-container">
        <span>${textEnterd}</span>
        <div class="btn-group">
          <button class="done">✔</button>
          <button class="delete">✖</button>
          <button class="edit">✏️</button>
        </div>
      </div>
      <div class="p-date">
        <span>Created: </span>
        <p class="date">${date.toDateString()} - ${date.toLocaleTimeString()}</p>
      </div>`;

    //--> Add Elements or Components To DOM and Also Add Their Classes <--\\
    ulElement.append(liElement);

    clearButton.classList.add("clear-appear");
    textInput.value = "";

    let deleteButton = liElement.querySelector(".delete");
    let doneButton = liElement.querySelector(".done");
    let editButton = liElement.querySelector(".edit");
    let spanElement = liElement.querySelector("span");
    let spanText = liElement.querySelector("span").innerText;
    let divElement = liElement.querySelector(".main-container");

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
            spanElement.innerHTML = spanElement.innerHTML
              .trim()
              .replace(/&nbsp;/g, "");

            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
              spanText.trim().replace(/&nbsp;/g, "")
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

            let content = `
            <div class="done-date">
              <span>Done: </span>
              <p class="new-date">${newDate.toDateString()} - ${newDate.toLocaleTimeString()}</p>
            </div>
            `;

            divDoneElement.innerHTML = content;
            liElement.append(divDoneElement);
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
        // This Part Has Nothing To Do With The Project Implementation
        // OR Logic It Is Just A Comment For Myself, It Is Actully A
        // Prototype Implementation Of The Edit Option To Make Sure
        // That It Only Works And It Was Based On Browser Prompt Window

        // -Based On Browser Prompt Window- \\
        // (Current Status = "Disable")
        // if (liElement.classList != "font") {
        //   let spanValue = prompt("Enter New Item!");
        //   while (spanValue.length < 1) {
        //     spanValue = prompt("Enter New Item!");
        //   }
        //   spanElement.innerHTML = spanValue;
        // }
        // --------------------------------------------------------------- \\
        // --------------------------------------------------------------- \\

        // ********* Second Implementation ********* //
        // +Based On HTML Contenteditable Attribute- \\
        // (Current Status = "Enable")

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
                spanElement.innerHTML = spanElement.innerHTML
                  .trim()
                  .replace(/&nbsp;/g, "");

                if (
                  spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
                  spanText.trim().replace(/&nbsp;/g, "")
                ) {
                  let editSpanElement = document.createElement("span");
                  editSpanElement.innerHTML = "Edited";
                  editSpanElement.classList.add("edited");
                  divElement.after(editSpanElement);
                }
                spanElement.setAttribute("contenteditable", false);
              }
            }
          });

          if (spanElement.getAttribute("contenteditable") == "true") {
            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
              spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
            ) {
              spanElement.innerHTML = spanElement.innerHTML
                .trim()
                .replace(/&nbsp;/g, "");

              if (
                spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
                spanText.trim().replace(/&nbsp;/g, "")
              ) {
                let editSpanElement = document.createElement("span");
                editSpanElement.innerHTML = "Edited";
                editSpanElement.classList.add("edited");
                divElement.after(editSpanElement);
              }
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
