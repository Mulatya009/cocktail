class UI {
    //  display random cocktail
    displayRandomCocktail(random){
        const div = document.querySelector('#results-random');

        div.innerHTML += `
            <div class="col-12">
                <div class="card my-3">
                    <button type="button" data-id="${random.idDrink}" class="favorite-btn btn btn-outline-info">
                        +                 
                    </button>
                    <img class="card-img-top" src="${random.strDrinkThumb}" alt="${random.strDrink}" style="max-height: 550px;">
                </div> 
                <div class="card-body">
                    <h2 class="card-title text-center">${random.strDrink}</h2>
                    <p class="card-text font-weight-bold">Instructions:</p>
                    <p class="card-text">
                        ${random.strInstructions}
                    </p>

                    <p class="card-text">
                        <ul class="list-group">
                            <li class="list-group-item alert alert-danger">Ingredients</li>
                            ${this.displayIngredients(random)}
                        </ul>
                    </p>
                    <p class="card-text">
                        <span class="badge badge-pill badge-success">
                            ${random.strAlcoholic}
                        </span>
                        <span class="badge badge-pill badge-warning">
                            Category: ${random.strCategory}
                        </span>
                    </p>
                </div>
            </div>

        `;

    }
    // display categories
    displayCategories(categories){
        // console.log(categories);
        const search_category = document.querySelector('.search-category', '#search');

        const first_option = document.createElement('option');
        first_option.value = '';
        first_option.textContent = '--Select--';
        search_category.appendChild(first_option);

        categories.forEach(category => {
            const other_options = document.createElement('option');
            other_options.textContent = category.strCategory;
            other_options.value = category.strCategory.split(' ').join('_');

            search_category.appendChild(other_options);
        })
    }


    // displays drinks without ingredients
    displayDrinks(drinks){
        // show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

         // insert results
         const resultsDiv = document.querySelector('#results');

         drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                            +                 
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a class="btn btn-success get-recipe" href="#" data-target="#recipe" data-toggle="modal" data-id="${drink.idDrink}">Get receipe</a>
                        </div> 
                    </div>  
                </div>
            `;
         })
    }

    // display drinks & ingredients
    displayDrinksWithIngredients(drinks){
        // show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // insert results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                            +                 
                        </button> 
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    </div> 
                    <div class="card-body">
                        <h2 class="card-title text-center">${drink.strDrink}</h2>
                        <p class="card-text font-weight-bold">Instructions:</p>
                        <p class="card-text">
                            ${drink.strInstructions}
                        </p>

                        <p class="card-text">
                            <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li>
                                ${this.displayIngredients(drink)}
                            </ul>
                        </p>
                        <p class="card-text">
                            <span class="badge badge-pill badge-success">
                                ${drink.strAlcoholic}
                            </span>
                            <span class="badge badge-pill badge-warning">
                                Category: ${drink.strCategory}
                            </span>
                        </p>
                    </div>
                </div>
            `;

        })

    }

    // prints ingredients and measurements:
    displayIngredients(drink){
        let ingredients = [];
        for(let i = 1; i <= 15; i++){
            const ingredientMeasure = {};
            if(drink [`strIngredient${i}`] !== null){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
        //console.log(ingredients)
        // build template
        let ingredientsTemplate = '';
        ingredients.forEach(ingredient => {
                ingredientsTemplate += `
                <li class="list-group-item">
                    ${ingredient.ingredient} - ${ingredient.measure}
                </li>
            `;
        });
        return ingredientsTemplate;
        
    }

    // display single recipe
    displaySingleRecipe(recipe){
        // get variables from the modal
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        // set values on modal variables
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;  

        // displayIngredients
        let ingredientsList = this.displayIngredients(recipe);
        modalIngredients.innerHTML = ingredientsList;
    }
    // prints message
    printMessage(message, className){
        const wrapper = document.createElement('div');

        wrapper.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">X</button>
                ${message}
            </div>
        `;
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(wrapper, reference);
        
        setTimeout(() =>{
            document.querySelector('.alert').remove();
        }, 5000)
    }
    // clear prev res
    clearResults(){
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }
    // reset form
    resetForm(){
        const form = document.querySelector('#search-form');
        form.reset();
    }

}
