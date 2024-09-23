class Singleton {
	private static instance: Singleton;

	private static _value = 0;

	private constructor() {}

	static getInstance(): Singleton {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}

	incr() {
		return ++Singleton._value;
	}
}

async function Main() {
	const instances = await Promise.all([
		Singleton.getInstance(),
		Singleton.getInstance(),
		Singleton.getInstance(),
		Singleton.getInstance(),
		Singleton.getInstance(),
	]);
	console.log(
		instances[0] === instances[1] && instances[1] === instances[2] && instances[2] === instances[3]
	);
}

Main();
