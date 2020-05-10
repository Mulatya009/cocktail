class CocktailAPI{

    // get random cocktail
    async getCocktailRandom(){
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');

        const randomCocktail  = await apiResponse.json();

        return{
            randomCocktail
        }
    }

    // get cocktails by name
    async getDrinksByName(name){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        
        const cocktails = await apiResponse.json();

        return{
            cocktails
        }
    }
    // get cocktails by ingredient
    async getDrinksByIngredient(ingredient){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktails = await apiResponse.json();
        return{
            cocktails
        }
    }

    // get single recipe
    async getSIngleRecipe(id){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const recipe = await apiResponse.json();
        return{
            recipe
        }
    }

    // get categories
    async getCategories(){
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        const categories =  await apiResponse.json();

        return{
            categories
        }
    }

    // get drinks by category
    async getDrinksByCategory(category){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const cocktails = await apiResponse.json();

        return{
            cocktails
        }
    }

    // get drinks by Alcohol
    async getDrinksByAlcohol(searchTerm){
        let apiResponse;
        if(searchTerm === 'Alcoholic'){
            apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        }
        else{
            apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
        }
        
        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
        
    }
}