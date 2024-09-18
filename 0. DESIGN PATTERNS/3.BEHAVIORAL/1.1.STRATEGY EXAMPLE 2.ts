// This is the context class for the strategy
class ImageProcessor {
	private strategy: FilterStrategy;

	constructor(strategy: FilterStrategy) {
		this.strategy = strategy;
	}

	public setFilterStrategy(strategy: FilterStrategy): void {
		this.strategy = strategy;
	}

	public applyFilter(image: string) {
		this.strategy.apply(image);
	}
}

interface FilterStrategy {
	apply(image: string): void;
}

class SepiaStrategy implements FilterStrategy {
	apply(image: string): void {
		console.log(`Applying SepiaStrategy to ${image}`);
	}
}

class GrayScaleStrategy implements FilterStrategy {
	apply(image: string): void {
		console.log(`Applying Gray Scale Strategy to ${image}`);
	}
}

class NegativeStrategy implements FilterStrategy {
	apply(image: string): void {
		console.log(`Applying Negative Strategy to ${image}`);
	}
}

// Client code
const imageProcessor = new ImageProcessor(new GrayScaleStrategy());
imageProcessor.applyFilter("Image1.jpg");

imageProcessor.setFilterStrategy(new NegativeStrategy());
imageProcessor.applyFilter("Image2.png");
