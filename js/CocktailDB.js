class CocktailDB{


    saveIntoDB(drink){
        // get all drinks in ls
        const drinks = this.getFromDB();
        // append the new drink
        drinks.push(drink);

        // save the new drinks to ls
        localStorage.setItem('drinks', JSON.stringify(drinks));

    }

    // remove from ls 
    removeFavorite(id){
        const drinks = this.getFromDB();

        // loop
        drinks.forEach((drink, index) => {
            if(id === drink.id){
                drinks.splice(index, 1)
            }
        });

        // set items back to storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    getFromDB(){
        let drinks;

        // check for drinks in the local storage
        if( localStorage.getItem('drinks') === null){
            drinks = [];
        }
        else{
            drinks = JSON.parse(localStorage.getItem('drinks') );
        }

        return drinks;
    }
}