import { InMemoryDatabase } from "./database";

const dbManager = InMemoryDatabase.getInstance();

dbManager.createDatabase("MyDatabase");
dbManager.createTable("MyDatabase", "Users", ["name", "age"], "name");
const usersTable = dbManager.getTable("MyDatabase", "Users");

if (usersTable) {
	// Insert a row
	usersTable.insert({ name: "Alice", age: 25 });
	usersTable.insert({ name: "Bob", age: 30 });

	// Update a row
	usersTable.update(1, { age: 26 });

	// Delete a row
	usersTable.delete(2);

	// Find a row
	console.log(usersTable.find(1));
}
