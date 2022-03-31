const searchBtn = document.getElementById("search-btn");
const makeupList = document.getElementById("makeup");
// const mealDetailsContent = document.querySelector(".makeup-details-content");
// const recipeCloseBtn = document.getElementById("product-close-btn");

searchBtn.addEventListener("click", getMakeupList);
// mealList.addEventListener("click", getMakeupProduct);
// recipeCloseBtn.addEventListener("click", () => {
//   mealDetailsContent.parentElement.classList.remove("showProduct");
// });


function show(){
     const targetDiv = document.querySelector(".product-drop");
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
};


function getMakeupList() {
  let searchInputTxt = document.getElementById("search-input").value;
  fetch(
    `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchInputTxt}&product=maybelline&id=1147`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = "";
      //   if (data.meals) {
      data.forEach((makeup) => {
        html += `<div class="makeup-item" data-id="${makeup.id}">
                    <div class="makeup-img">
                        <img src="${makeup.image_link}" alt="makeup" />
                    </div>
                    <div class="makeup-name">
                        <h3>${makeup.name}</h3>
                        <h3>${makeup.price}</h3>
                        <div class="product-btn" onclick="show()")>More</div>
                        <div class="product-drop" >
                            <p class="product-category">${makeup.product_type}</p>
                            <div class="product-instruct">
                                <h3>Features:</h3>
                                <p>${makeup.description}</p>
                            </div>
                            <div class="product-makeup-img">
                                <img src="${makeup.image_link}" alt="" />
                            </div>
                            <div class="product-link">
                                <a href="${makeup.product_link}" target="_blank">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>`;
      });

      makeupList.innerHTML = html;

    });
}


