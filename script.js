"user strict";

// // creating div elements along with id

//creating main cointainer,where everything will settle in
let container = document.createElement("div");
container.className = "container";

// creating container where search engine and result cards will settle in.
let makeupWrapper = document.createElement("div");
makeupWrapper.className = "makeup-wrapper";

//creating header part of page
let makeupSearch = document.createElement("div");
makeupSearch.className = "makeup-search";
makeupSearch.innerHTML = `
          <h2 class="title"><i>Welcome To</i>  BEAUTYIFY</h2>
          <div class="welcome">Find  Your Makeup Products
            <br />
            <cite>- If Makeup Gives You Confidence ,Why Not?</cite>
          </div>`;

//creating search filter
let makeupSearchBox = document.createElement("div");
makeupSearchBox.className = "makeup-search-box";
// its in a form of select-option,for easier search filtering,
//convienent for these type of json data,
//since search by id(indivdual products are not permitted in this API)
makeupSearchBox.innerHTML = `
            <select class="search-control" id="search-input-type" onfocus='this.size=10;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
              <option value="Select A Category" disabled selected>
                Select A Category
              </option>
              <option value="blush">Blush</option>
              <option value="bronzer">Bronzer</option>
              <option value="eyebrow">Eyebrow</option>
              <option value="eyeliner">Eyeliner</option>
              <option value="eyeshadow">Eyeshadow</option>
              <option value="foundation">Foundation</option>
              <option value="lip_liner">Lip liner</option>
              <option value="lipstick">Lipstick</option>
              <option value="mascara">Mascara</option>
              <option value="nail_polish">Nail polish</option>
            </select>
            <button type="submit" class="search-btn btn" id="search-btn">
              <i class="fas fa-search"></i>
            </button>`;

//creating div for filtered results
let makeupResult = document.createElement("div");
makeupResult.className = "makeup-result";
makeupResult.innerHTML = `<h2 class="title">Your Search Results:</h2>
                          <div id="makeup"></div>`;

//calling child div inside parent div
document.body.append(container);
container.append(makeupWrapper);
makeupWrapper.append(makeupSearch, makeupResult);
makeupSearch.append(makeupSearchBox);

//calling div elemnt by id and class to fetch data n extract the required info
const searchBtn = document.getElementById("search-btn");
const makeupList = document.getElementById("makeup");

//eventlistener for search button click
searchBtn.addEventListener("click", getMakeupList);

//adding function for targetDiv element to shrink the fetched output by adding CSS property=>display:none,block
function show(idNumber) {
  const id = Number(idNumber) + Number("10000000000");
  //DOM method,using this.id to return new id and calling show() function
  const targetDiv = document.getElementById(id);

  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
}

//Method:GET
//fetching the data from url by product type(category)
async function getMakeupList() {
  let searchInputTxt = document.getElementById("search-input-type").value;
  try {
    let response = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchInputTxt}`
    );
    let data = await response.json();

    console.log(data);
    let html = ""; //iterated value will be added to this string
    //   if (data.meals) {
    data.forEach((makeup) => {
      html += `
                <div class="makeup-item" data-id="${makeup.id}">
                    <div class="makeup-img">
                        <img src="${makeup.image_link}" alt="makeup" />
                    </div>
                    <div class="makeup-name">
                        <h3 style="color:#8f0a1c;">${makeup.brand}</h3>
                        <h3 style="font-size:18px;">${makeup.name}</h3>
                        <h3 style="color:#8f0a1c;">$${makeup.price}</h3>
                        <div id=${
                          makeup.id
                        } class="product-btn" onclick="show(this.id)")>More</div>
                        <div id=${
                          makeup.id + 10000000000
                        }   style="display:none">
                            <p class="product-category">${
                              makeup.product_type
                            }</p>
                            <div class="product-instruct">
                                <h3>Features:</h3>
                                <p>${makeup.description}</p>
                            </div>
                            <div class="product-makeup-img">
                                <img src="${makeup.image_link}" alt="" />
                            </div>
                            <div class="product-link">
                                <a href="${
                                  makeup.product_link
                                }" target="_blank">Order Now <i class="fa fa-cart-arrow-down" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
    });

    makeupList.innerHTML = html; //send the html value to a div so it can shoe product in forms of cards
  } catch (error) {
    console.log(error);
  }
}
