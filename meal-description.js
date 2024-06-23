document.addEventListener("DOMContentLoaded", async () => {
  const string = window.location.search;
  const params = new URLSearchParams(string);
  const meal = params.get("meal");
  console.log(meal);
  const getMealDesc = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  const jsonData = await getMealDesc.json();
  const mealName = document.getElementById("mealName");
  mealName.innerText = jsonData.meals[0].strMeal;
  const mealImg = document.getElementById("mealImg");
  mealImg.src = jsonData.meals[0].strMealThumb;
  const mealIns = document.getElementById("mealIns");
  mealIns.innerText = jsonData.meals[0].strInstructions;

  console.log(jsonData.meals[0]);
});
