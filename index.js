var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
// Get input values
var category = document.getElementById("category");
var amount = document.getElementById("amount");
var description = document.getElementById("description");

// Form submit event
form.addEventListener("submit", addItem);
// Filter event
filter.addEventListener("keyup", filterItems);

// Add item
function addItem(e) {
  e.preventDefault();

  let obj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };

  localStorage.setItem(obj.description, JSON.stringify(obj));
  show(obj);
}

function show(obj) {
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";

  // Create del button element
  var deletebtn = document.createElement("button");

  // Add classes to del button
  deletebtn.className = "btn btn-danger btn-sm float-right delete";

  // Append text node
  deletebtn.appendChild(document.createTextNode("X"));

  // create edit button element
  var editbtn = document.createElement("button");

  // Add classes to edit button
  editbtn.className = "btn btn-warning btn-sm float-right edit";

  // Append text node
  editbtn.appendChild(document.createTextNode("Edit"));

  // Add text node with input value
  li.textContent =
    obj.amount +
    " " +
    "-" +
    " " +
    obj.description +
    " " +
    "-" +
    " " +
    obj.category;

  deletebtn.onclick = () => {
    localStorage.removeItem(obj.description);
    itemList.removeChild(li);
  };
  editbtn.onclick = () => {
    amount.value = obj.amount;
    description.value = obj.description;
    category.value = obj.category;
    localStorage.removeItem(obj.description);
    itemList.removeChild(li);
  };

  li.appendChild(deletebtn);
  li.appendChild(editbtn);
  itemList.appendChild(li);
}

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName("li");
  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
