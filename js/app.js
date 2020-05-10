// instance of classes;
const ui = new UI(),
      cocktail = new CocktailAPI();




// event listeners
function eventListeners(){

    document.addEventListener('DOMContentLoaded', documentReady);
    const searchForm = document.querySelector('#search-form');

    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }

    const resultsDiv = document.querySelector('#results');
    if (resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }
}

eventListeners();


// functions
function documentReady(){
    cocktail.getCategories()
    .then(categories => {
        const categoryList = categories.categories.drinks;
        ui.displayCategories(categoryList);
    })
    .catch(error => console.log(error)); 

    cocktail.getCocktailRandom()
    .then(randomCocktail => {
        const rand = randomCocktail.randomCocktail.drinks[0];
        ui.displayRandomCocktail(rand);
    }) 
    .catch(error => console.log(error));   

}

function resultsDelegation(e){
    e.preventDefault();
    if(e.target.classList.contains('get-recipe')){

        cocktail.getSIngleRecipe(e.target.dataset.id)
        .then(recipe => {
            // display single recipe
            ui.displaySingleRecipe(recipe.recipe.drinks[0]);
        })
        .catch(error => console.log(error));
    }

    // when adding / removing favorite
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
        }
        else{
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
        }
    }
}

function getCocktails(e){
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;
    
    if(searchTerm === ''){
        // print message
        ui.printMessage('Please fill the search form', 'danger');
    }
    else{

        let serverResponse;
        // type of search
        let type = document.querySelector('#type').value;

        // determine the type of search
        switch(type){
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break; 
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;   
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
                break;        
        }
        // clears previous results
        ui.clearResults();
        
        // query API for the search        
        serverResponse.then(cocktails => {
            // console.log(cocktails.cocktails.drinks)
            const cocktailList = cocktails.cocktails.drinks;
            if(cocktailList === null){
                ui.printMessage('SORRY: There\'re no results for your search, try a different term ', 'danger'); 
            }
            else{
                if(type === 'name'){
                    // display with ingredients
                    ui.displayDrinksWithIngredients(cocktailList);
                }  
                else{
                    // display without ingredients
                    ui.displayDrinks(cocktailList);
                    //ui.resetForm();
                }              
            }

        })
        .catch(error => ui.printMessage(error, 'danger')); 
        
    }
}