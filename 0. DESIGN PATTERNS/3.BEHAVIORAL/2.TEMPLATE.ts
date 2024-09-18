// definition :- The Template Method is a behavioral design pattern 
// that defines the skeleton of an algorithm in a base class
// but lets subclasses override specific steps of the algorithm 
// without changing its structure. 
// This pattern allows you to make parts of an algorithm 
// optional, mandatory, or customizable by the subclasses.

abstract class CakeRecipe {
	protected startTheOven() {
		console.log("Starting the oven");
	}

	protected preHeatTheOven() {
		console.log("Pre heating the oven to 175 degree C");
	}

	protected bake() {
		console.log("Baking cake ....");
	}

	protected coolingDown(): void {
		console.log("Cooling down the cake");
	}

	protected decorate(): void {
		console.log("Decorating the cake");
	}

	public bakeCake(): void {
		this.startTheOven();
		this.preHeatTheOven();
		this.mixIngredients();
		this.bake();
		this.coolingDown();
		this.decorate();
	}

	protected abstract mixIngredients(): void;
}

class VanillaCake extends CakeRecipe {
	protected mixIngredients(): void {
		console.log("Mixing : vanilla extract, sugar, eggs, flour, milk");
	}

	// we can override any method specific to this class
	protected decorate(): void {
		console.log("Decorating vanilla cake with stars and white chocolate");
	}
}

class ChocolateCake extends CakeRecipe {
	protected mixIngredients(): void {
		console.log("Mixing : choco powder, sugar, eggs, flour, milk");
	}
}

function CakeBackery(cakeRecipe: CakeRecipe) {
	cakeRecipe.bakeCake();
}

CakeBackery(new VanillaCake());
CakeBackery(new ChocolateCake());
