const getMealFromTheFirstLetter = async () => {
  const inputValue = document.querySelector("#inputBox");

  inputValue.addEventListener("input", async (e) => {
    const value = e.target.value.trim();

    if (value.length > 0) {
      try {
        const fetchData = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${value.charAt(
            0
          )}`
        );

        if (!fetchData.ok) {
          throw new Error("Network response was not ok.");
        }

        const getData = await fetchData.json();

        if (getData.meals) {
          const matchedMeals = getData.meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(value.toLowerCase())
          );

          const createDiv = document.getElementById("suggestionBox");
          createDiv.innerHTML = "";
          const getOuterBox = document.getElementById("outerBox");
          getOuterBox.style.visibility = "visible";
          matchedMeals.forEach((meal) => {
            const suggestion = document.createElement("div");
            // input checkbox
            const createBtn = document.createElement("input");
            createBtn.type = "checkbox";
            createBtn.title = "Add to favourites";

            createBtn.addEventListener("click", (e) => {
              storeInLocalStorage(meal);
            });

            createBtn.className = "heart";
            const createAnchor = document.createElement("a");
            createAnchor.href = `meal-description.html?meal=${meal.strMeal}`;
            createAnchor.id = "anchorDesc";
            suggestion.className = "suggestion";
            suggestion.innerText = meal.strMeal;
            createAnchor.appendChild(suggestion);
            createAnchor.appendChild(createBtn);
            createDiv.appendChild(createAnchor);
          });

          if (matchedMeals.length === 0) {
            const noResults = document.createElement("div");
            noResults.className = "suggestion";
            noResults.innerText = "No meal found";
            createDiv.appendChild(noResults);
          }
        } else {
          const createDiv = document.getElementById("suggestionBox");
          createDiv.innerHTML = "";

          const noResults = document.createElement("div");
          noResults.className = "suggestion";
          noResults.innerText = "No meal found";
          createDiv.appendChild(noResults);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const createDiv = document.getElementById("suggestionBox");
      createDiv.innerHTML = "";
      const getOuterBox = document.getElementById("outerBox");
      getOuterBox.style.visibility = "hidden";
      const noResults = document.createElement("div");
      noResults.className = "suggestion";
      noResults.innerText = "";
      createDiv.appendChild(noResults);
    }
  });
};

getMealFromTheFirstLetter();


const storeInLocalStorage = async (meal) => {
  if (localStorage.getItem("meal")) {
    let getMeal = JSON.parse(localStorage.getItem("meal"));

    getMeal = [...getMeal, meal];

    window.localStorage.setItem("meal", JSON.stringify(getMeal));
    return true;
  }
  window.localStorage.setItem("meal", JSON.stringify([meal]));
  return true;
};
