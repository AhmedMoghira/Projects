const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const searchBox = document.getElementById("search");

let mode = "create";
let tmp;

/**
 * i want :
 * get total 
 * create product
 * save data in local storage
 * clear inputs
 * read
 * count
 * delete
 * update
 * search
 * clean data
 */

// get total function
function getTotal(){
  if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "yellow";
    total.style.color = "black";
  }
  else{
    total.innerHTML = "";
    total.style.background = "magenta";
  }
}

// create product
let dataProduct;

if(localStorage.product != null){
  dataProduct = JSON.parse(localStorage.product);
}
else{
  dataProduct = [];
}

submit.onclick = function (){
  //save data in object
  let newProduct = {
    title: title.value.toUpperCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toUpperCase(),
  }

  //create or update product:
  if(title.value != "" 
    && category.value != ""
    && price.value != ""
    && count.value <= 100){
    if(mode === "create"){
      if(newProduct.count > 1){
        for(let i = 0; i < newProduct.count; i++){
          dataProduct.push(newProduct);
        }
      }else{
        dataProduct.push(newProduct);
      }
    }
    else{
      dataProduct[tmp] = newProduct;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }

    clearInputs();
  }


  
  // save in local storage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
}

// clear inputs
function clearInputs(){
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}


// read
function showData(){
  let table = "";

  for(let i = 0; i < dataProduct.length; i++){
    table += `
          <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})"    id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
          </tr>
    `;
  }
  // if the total is negative , edit this later...
  
  getTotal();
  
  
  tbody.innerHTML = table;
  
  const deleteAllBtn = document.getElementById("deleteAll");
  if(dataProduct.length > 0){
    deleteAllBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All(${dataProduct.length})</button>
    `;
  }else{
    deleteAllBtn.innerHTML = ``;
  }
}
showData();


// delete product
function deleteProduct(i){
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteAll(){
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// count

//update
function updateData(i){
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth"
  })
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerHTML = `Update`;
  mode = "update";
  tmp = i;
}

// search
let searchMode = "title";
function searchProduct(id){
  if(id === "searchTitle"){
    searchMode = "title";
  }
  else{
    searchMode = "category"; 
  }
  searchBox.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  showData();
}


function searchData(value){
  let table = "";
  if(searchMode === "title"){
  for(let i = 0; i < dataProduct.length; i++){
    if(dataProduct[i].title.includes(value.toUpperCase())){
      table += `
        <tr>
          <td>${i+1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick="updateData(${i})"    id="update">Update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
      `;
  }

  else if(searchMode == "category"){

    if(dataProduct[i].category.includes(value.toUpperCase())){
      table += `
        <tr>
          <td>${i+1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick="updateData(${i})"    id="update">Update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
      `;
    }
  }
  }

  tbody.innerHTML = table;
}
}


//clean data