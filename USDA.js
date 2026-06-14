export async function searchFood(foodName) {

    const apiKey = process.env.USDA_API_KEY;

    const url =
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(foodName)}&pageSize=1&api_key=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!data.foods || data.foods.length === 0) {
        return null;
    }

    const food = data.foods[0];

    return {
        name: food.description,
        calories:
            food.foodNutrients.find(
                n => n.nutrientName === "Energy"
            )?.value || 0,

        protein:
            food.foodNutrients.find(
                n => n.nutrientName === "Protein"
            )?.value || 0,

        carbs:
            food.foodNutrients.find(
                n => n.nutrientName ===
                    "Carbohydrate, by difference"
            )?.value || 0,

        fats:
            food.foodNutrients.find(
                n => n.nutrientName ===
                    "Total lipid (fat)"
            )?.value || 0
    };
}
