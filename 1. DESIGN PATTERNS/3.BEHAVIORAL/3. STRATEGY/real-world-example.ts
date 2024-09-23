// Definition :- The Strategy pattern is a behavioral design pattern that
// lets you define a family of algorithms, put each of them into separate classes,
// and make their objects interchangeable.
// In other words, it's a way to change the behavior of an object at
// runtime without changing its implementation.

interface ProductDetails {
	productId: number;
	price: number;
	quantity: number;
}

interface PaymentStrategy {
	pay(amount: number): PaymentStatus;
}

class PaypalStrategy implements PaymentStrategy {
	pay(amount: number): PaymentStatus {
		console.log(`Paid $${amount} from paypal`);
		return PaymentStatus.PAYMENT_COMPLETED;
	}
}

class CreditCardStrategy implements PaymentStrategy {
	pay(amount: number): PaymentStatus {
		console.log(`Paid $${amount} from credit card`);
		return PaymentStatus.PAYMENT_COMPLETED;
	}
}

class DebitCardStrategy implements PaymentStrategy {
	pay(amount: number): PaymentStatus {
		console.log(`Paid $${amount} from debit card`);
		return PaymentStatus.PAYMENT_COMPLETED;
	}
}

class UpiStrategy implements PaymentStrategy {
	pay(amount: number): PaymentStatus {
		console.log(`Paid $${amount} from upi strategy`);
		return PaymentStatus.PAYMENT_COMPLETED;
	}
}

enum PaymentStatus {
	"CART_CREATED",
	"PAYMENT_INITIATTED",
	"PAYMENT_ATTEMPTED",
	"PAYMENT_COMPLETED",
	"ORDER_CONFIRMED",
}

class ShoppingCartContext {
	private amount: number = 0;
	paymentStatus: PaymentStatus = PaymentStatus.CART_CREATED;

	constructor(private strategy: PaymentStrategy) {}

	setStrategy(strategy: PaymentStrategy): void {
		this.strategy = strategy;
	}

	addToCart(productDetails: ProductDetails[]) {
		if (!this.strategy) {
			throw new Error("No strategy is selected");
		}
		productDetails.forEach((productDetail: ProductDetails) => {
			this.amount += productDetail.price * productDetail.quantity;
		});
	}

	checkout() {
		this.paymentStatus = PaymentStatus.PAYMENT_INITIATTED;
		const attemptedPaymentSatus = this.strategy.pay(this.amount);
		if (attemptedPaymentSatus === PaymentStatus.PAYMENT_COMPLETED) {
			this.paymentStatus = PaymentStatus.PAYMENT_COMPLETED;
			this.amount = 0;
		}
	}
}

// Client code :-
const cart = new ShoppingCartContext(new PaypalStrategy());
const products = [
	{ productId: 1, price: 1000, quantity: 2 },
	{ productId: 2, price: 250, quantity: 1 },
];

cart.setStrategy(new UpiStrategy());
cart.addToCart(products);
cart.checkout();

cart.setStrategy(new CreditCardStrategy());
cart.addToCart(products);
cart.addToCart(products);
cart.checkout();
