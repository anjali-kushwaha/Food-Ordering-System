class MenuItem {
    constructor(id, name, category, price, description) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.price = price;
      this.description = description;
    }
  }
  
  class Order {
    constructor(orderId,customerName,itemsOrdered,totalPrice,orderStatus,deliveryAddress,orderedDate) {
      this.orderId = orderId;
      this.customerName = customerName;
      this.itemsOrdered = itemsOrdered;
      this.totalPrice = totalPrice;
      this.orderStatus = orderStatus;
      this.deliveryAddress = deliveryAddress;
      this.orderedDate = orderedDate;
    }
  }
  
  class Owner {
    constructor(userId) {
      this.userId = userId;
    }
  }
  
  class Customer {
    constructor(userId, name, email, phoneNumber, deliveryAddress) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.deliveryAddress = deliveryAddress;
    }
  }




//for owner
const addItem = document.querySelector(".add-item");
const removeItem = document.querySelector(".remove-item");
const editMenu = document.querySelector(".edit-menu");
const editOrderStatus = document.querySelector(".edit-order-status");
const viewStatus=document.querySelector(".view-status")
// customer
const browse=document.querySelector(".browse-menu")
const PlaceOrderButton = document.querySelector(".btn-place-order");
const orderStatus = document.querySelector(".btn-order-status");



// sample data of menu
let menuItems = [
  new MenuItem(1,"Spaghetti Carbonara","Pasta",12.99,"Spaghetti with pancetta, eggs, and grated cheese"),
  new MenuItem(2, "Another Item", "Category", 10.99, "Description of another item"),
  // Add more menu items as needed
];


let orders = [ 
    new Order(1,"anjali",["Pasta"],12.99,"Order received","Delhi, India","2024/08/12"),
  ];
  

let OwnerList = [
     {userId :123} ,
     {userId :456}
] 


//customer

function getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${yyyy}/${mm}/${dd}`;
} 


function browseMenu() {
    displayMenu(menuItems);
}


browse.addEventListener("click", browseMenu);


async function displayMenu(menuItems) {
    await delay();
    const menuDisplay = document.querySelector(".menu");
  
    //used to clear the contents of an HTML element 
    menuDisplay.innerHTML = "";
  
    //check meanu is empty or not 
    if (menuItems.length === 0) 
    {
      menuDisplay.innerHTML = "<p>No food Items Found</p>";
      return;
    }
    
    const headingMenu = document.createElement("h2");
    headingMenu.textContent = "Menu";
    headingMenu.style.textAlign ="centre"
    const table = document.createElement("table");
    table.innerHTML = `<thead><tr>
                       <th>Id</th>
                       <th>Name</th>
                       <th>Category</th>
                       <th>Price</th>
                       <th>Description</th>
                       </tr></thead>
                       <tbody>    
                       ${menuItems.map((item) => `<tr><td>${item.id}</td>
                                                  <td>${item.name}</td>
                                                  <td>${item.category}</td>
                                                  <td>${item.price}</td>
                                                  <td>${item.description}</td>
                                                  </tr>`)}</tbody>`;
                                                // with the help of map a new array well created   
    menuDisplay.append(headingMenu);
    menuDisplay.append(table);
}


function removeSpaces(str) {
// function is a regular expression (regex) 
// /: Delimiters indicate the start and end of the regex pattern.
// \s: This represents any whitespace character, including spaces, tabs, and line breaks.
// +: Quantifier indicates that the preceding token (in this case, \s) should match one or more times.
// /: Delimiters to mark the end of the regex pattern.
// g: Flag stands for "global" and indicates that the regex should be applied globally to the entire string, rather than stopping after the first match.

//trim-"Hello   World"
//regex- "HelloWorld" 

return str.trim().replace(/\s+/g, "");
}


function placeOrder(items, deliveryAddress) {
  // await delay();
  console.log("Items:", items);
  console.log("Menu Items:", menuItems);
  let customerName = prompt("Enter Your Name: ");
  if (items.length === 0 || deliveryAddress.length === 0) {
    alert("Selected Items are not in menu or delivery address is not provided");
  }
  
  // Find the available items in the menu
  let availableItems = menuItems.filter((item) => {
    return item.name === items;
  });

  // Check if any available items were found
  if (availableItems.length === 0) {
    throw new Error("Selected Items are not available");
  }

  // Calculate total price based on the available items
  let totalPrice = 0;
  availableItems.forEach((item) => {
    totalPrice += item.price;
  });

  // Generate order ID
  let orderId = orders.length + 1;

  // Get today's date
  const todayDate = getDate();

  // Create a new order object
  let newOrder = new Order(
    orderId,
    customerName,
    items,
    totalPrice,
    "Order received",
    deliveryAddress,
    todayDate
  );

  // Add the new order to the orders array
  orders.push(newOrder);
  console.log(orders);
}

//done
PlaceOrderButton.addEventListener("click", () => {
  // const orderInput = document.querySelector(".selectItems").value;
  // const orderInput = document.querySelector(".selectItems").value;
  const orderInput = document.querySelector(".select-items").value;

  const inputAddress = document.querySelector(".delivery-address").value;
  placeOrder(orderInput, inputAddress);
  displayOrder(orders);
});
  

//this is same as displayMenu   
async function displayOrder(orders) {
    await delay();

    const orderDisplay = document.querySelector(".order-list");
  
    orderDisplay.innerHTML = "";
  
    if (orders.length === 0) {
      orderDisplay.innerHTML = "<p>No Orders right now</p>";
      return;
    }

    const header = document.createElement("h2");
    header.textContent = "Orders List";
    
    const table = document.createElement("table");
    table.innerHTML = `<thead><tr>
                       <th>Order Id</th>
                        <th>Customer Name</th>
                        <th>Item Ordered</th>
                        <th>Price</th>
                        <th>Order Status</th>
                        <th>Delivery address</th>
                        </tr>
                        </thead>
                        <tbody>${orders.map((item) => `<tr>
                                                        <td>${item.orderId}</td>
                                                        <td>${item.customerName}</td>
                                                        <td>${item.itemsOrdered}</td>
                                                        <td>${item.totalPrice}</td>
                                                        <td>${item.orderStatus}</td>
                                                        <td>${item.deliveryAddress}</td>
                                                        </tr>`)}</tbody>`;
    orderDisplay.append(header);
    orderDisplay.append(table);
}

displayOrder(orders);




async function trackOrderStatus(orderId) {
    try {
      await delay();
  
      let order = orders.find((order) => order.orderId == orderId);

      if (!order){
        throw new Error("order not found");
      }

      alert(`order ${order.orderId} status: ${order.orderStatus}`);
    } 
    catch (err) {
      alert("Error in tracking order status: " + err.message);
    }
  }


orderStatus.addEventListener("click", () => {
    let CustomerOrderId = document.querySelector(".order-id").value;
    trackOrderStatus(CustomerOrderId);
});



//for owner
function hideButton(){
  addItem.style.display ="none";
  removeItem.style.display ="none"; 
}

hideButton()

// Function to add an item to the menu
function addItemToMenu(menuItems) {
  const inputedName = prompt("Enter the Name Of Item You want Add: ");
  const inputedCategory = prompt("Enter the Category Of Item You want Add: ");
  const inputedPrice = prompt("Enter the Price Of Item You want Add: ");
  const inputedDescription = prompt("Enter the Description Of Item You want Add: ");
  
  const newItem = new MenuItem(
    menuItems.length + 1,
    inputedName,
    inputedCategory,
    inputedPrice,
    inputedDescription
  );

  menuItems.push(newItem);
  displayMenu(menuItems);
}

// Event listener for adding an item
addItem.addEventListener("click", (e) => {
  e.preventDefault();
  addItemToMenu(menuItems);
  hideButton();
});

// Function to remove an item from the menu
function removeItemFromMenu(menuItems) {
  const inputedId = prompt("Enter the Id Of Item You want to Remove: ");
  const itemId = parseInt(inputedId);
  menuItems = menuItems.filter((item) => item.id !== itemId);
  displayMenu(menuItems);
}

// Event listener for removing an item
removeItem.addEventListener("click", (e) => {
  e.preventDefault();
  removeItemFromMenu(menuItems);
  hideButton();
});


// Function to handle menu editing based on owner ID
function editMenuByOwner(userId) {
  const ownerIdExists = OwnerList.some((val) => val.userId == userId);
  if (ownerIdExists) {
    addItem.style.display = "block";
    removeItem.style.display = "block";
  } else {
    alert("Invalid Owner Id");
  }
}


// Event listener for editing menu
editMenu.addEventListener("click", (e) => {
  e.preventDefault();
  const ownerId = document.querySelector(".owner-id").value;
  editMenuByOwner(ownerId);
});


// Function to update order status
function updateOrderStatus(userId) {
  const ownerIdExists = OwnerList.some((val) => val.userId === parseInt(userId));
  if (ownerIdExists) {
    const orderId = prompt("Enter the Id of the Order You want to update: ");
    const orderToUpdate = orders.find((val) => val.orderId == orderId);

    if (orderToUpdate) {
      const updatedStatus = prompt("Enter status (Preparing, Out for delivery, or Delivered): ");
      orderToUpdate.orderStatus = updatedStatus;
      displayOrder(orders);
    } else {
      alert("This Order ID doesn't exist");
    }
  } else {
    alert("Invalid Owner Id");
  }
}


// Event listener for updating order status
editOrderStatus.addEventListener("click", (e) => {
  e.preventDefault();
  const ownerId = document.querySelector(".owner-id2").value;
  updateOrderStatus(ownerId);
});



async function viewOrders(startDate, endDate) {
  try {
    await delay();

    let dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error("Invalid Date format. Use yyyy/mm/dd");
    }

    let start = new Date(startDate);
    let end = new Date(endDate);

    let filteredOrder = orders.filter((order) => {
      let orderDate = new Date(order.orderedDate);
      return orderDate >= start && orderDate <= end;
    });
    if (filteredOrder.length > 0) {
      let orderTableList = document.querySelector(".viewing-order");
      let table = document.createElement("table");
      table.innerHTML = `<thead>
      <tr>
        <th>Order ID</th>
        <th>Customer Name</th>
        <th>Items Ordered</th>
        <th>Total Price</th>
        <th>Order Status</th>
      </tr>
    </thead>
    <tbody>`;
      filteredOrder.forEach((val) => {
        table.innerHTML += `
    <tr>
      <td>${val.orderId}</td>
      <td>${val.customerName}</td>
      <td>${val.itemsOrdered}</td>
      <td>${val.totalPrice}</td>
      <td>${val.orderStatus}</td>
    </tr>`;
      });
      table.innerHTML += `</tbody>`;
      orderTableList.innerHTML = "";
      orderTableList.append(table);
    }
  } catch (error) {
    alert("Error viewing orders: " + error.message);
  }
}

viewStatus.addEventListener("click", () => {
  let startDate = document.querySelector(".start-date").value; // Corrected selector
  let endDate = document.querySelector(".end-date").value; // Corrected selector
  viewOrders(startDate, endDate);
});


function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}