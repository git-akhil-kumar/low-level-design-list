class ThreadSafeSingleton {
	private static instance: ThreadSafeSingleton;
	private static lock = false;

	private constructor() {}

	public static async getInstanceWithOutLocks() {
		if (!ThreadSafeSingleton.instance) {
			ThreadSafeSingleton.instance = new ThreadSafeSingleton();
		}
		return ThreadSafeSingleton.instance;
	}

	public static async getInstance(): Promise<ThreadSafeSingleton> {
		while (this.lock) {
			await new Promise((resolve) => setTimeout(resolve, 1));
		}

		this.lock = true;
		if (!ThreadSafeSingleton.instance) {
			ThreadSafeSingleton.instance = new ThreadSafeSingleton();
		}
		this.lock = false;

		return ThreadSafeSingleton.instance;
	}

	public someMethod() {
		console.log("Thread-safe Singleton method");
	}
}

async function Main() {
	const [
		instance1,
		instance2,
		instance3,
		instance4,
		instance5,
		instance6,
		instance7,
		instance8,
		instance9,
	] = await Promise.all([
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
		await ThreadSafeSingleton.getInstanceWithOutLocks(),
	]);
	const verdict =
		instance1 === instance2 &&
		instance2 === instance3 &&
		instance3 === instance4 &&
		instance4 === instance5 &&
		instance5 === instance6 &&
		instance6 === instance7 &&
		instance7 === instance8 &&
		instance8 === instance9;

	console.log(verdict);
}
Main();

async function ThreadSafeMain() {
	const [
		instance1,
		instance2,
		instance3,
		instance4,
		instance5,
		instance6,
		instance7,
		instance8,
		instance9,
	] = await Promise.all([
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
		await ThreadSafeSingleton.getInstance(),
	]);
	const verdict =
		instance1 === instance2 &&
		instance2 === instance3 &&
		instance3 === instance4 &&
		instance4 === instance5 &&
		instance6 === instance7 &&
		instance7 === instance8 &&
		instance8 === instance9;

	console.log(verdict);
}
// ThreadSafeMain();
