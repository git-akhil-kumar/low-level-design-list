interface UserDetails {
	name: String;
	age: number;
	email: String;
}

interface Prototype {
	shallowClone(): Prototype;
	deepClone(): Prototype;
	getUserDetails(): UserDetails;
}

function deepCloneObj(obj: any) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	let copy = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCloneObj(obj[key]);
		}
	}
	return copy;
}

class ConcreatePrototype implements Prototype {
	constructor(private user: UserDetails) {}

	shallowClone(): Prototype {
		const newUser = Object.create(this);
		newUser.user = { ...this.user };
		return newUser;
	}

	deepClone(): Prototype {
		const clonedUser = deepCloneObj(this);
		return clonedUser;
	}

	getUserDetails(): UserDetails {
		return this.user;
	}
}

const userDetails: UserDetails[] = [
	{
		name: "Akhil",
		age: 27,
		email: "hello@gmail.com",
	},
	{
		name: "Ankita",
		age: 28,
		email: "hello2@gmail.com",
	},
];
const user1 = new ConcreatePrototype(userDetails[0]);
const user2 = user1.shallowClone();
const user3 = user1.deepClone();

console.log(user1 === user2, user1 === user3); // false true
