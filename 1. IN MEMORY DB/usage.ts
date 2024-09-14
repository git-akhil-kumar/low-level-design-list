import { InMemoryDatabase } from "./database";

// Initialize the singleton instance of the database
const dbManager = InMemoryDatabase.getInstance();

// Create a new database
dbManager.createDatabase("MyDatabase");

// Create a new table with schema and indexing
dbManager.createTable("MyDatabase", "Users", ["name", "age"], "name");

// Get the table and perform operations
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
