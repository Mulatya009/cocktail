// instance of classes;
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();




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
    // identify all favorites
    ui.isFavorite();

    cocktail.getCategories()
    .then(categories => {
        const categoryList = categories.categories.drinks;
        const searchPage = document.querySelector('.search-category');
        if(searchPage){
            ui.displayCategories(categoryList);
        }
    })
    .catch(error => console.log(error)); 

    cocktail.getCocktailRandom()
    .then(randomCocktail => {
        const page = document.getElementById('results-random');
        const rand = randomCocktail.randomCocktail.drinks[0];
        if(page){
            ui.displayRandomCocktail(rand);
        }
        
    }) 
    .catch(error => console.log(error)); 
    
    const favoritePage = document.querySelector('#favorites');
    if(favoritePage){
        const myFavorite = cocktailDB.getFromDB();
        ui.displayFavorite(myFavorite);

        // when view/ delete are clicked

        favoritePage.addEventListener('click', (e) => {
            e.preventDefault();

            if(e.target.classList.contains('get-recipe')){
                cocktail.getSIngleRecipe(e.target.dataset.id)
                    .then(recipe => {
                        // display single recipe
                        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                    })
                    .catch(error => console.log(error));
            }
            if (e.target.classList.contains('remove-recipe')) {
                // remove from dom
                ui.removeFavorite(e.target.parentElement.parentElement);

                // remove from ls
                cocktailDB.removeFavorite(e.target.dataset.id);
            }

        })
    }

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

            // remove from ls
            cocktailDB.removeFavorite(e.target.dataset.id);
        }
        else{
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
        }

        // get fav info
        const cardInfo = e.target.parentElement.parentElement;

        const favoriteInfo = {
            id : e.target.dataset.id,
            image : cardInfo.querySelector('.card-img-top').src,
            name : cardInfo.querySelector('.card-title').textContent
        }

        // send to cocktailDB
        cocktailDB.saveIntoDB(favoriteInfo);
        // console.log(favoriteInfo)
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