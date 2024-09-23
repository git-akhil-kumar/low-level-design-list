import { Table } from "./interfaces";
import { InMemoryTable } from "./tables";

export class InMemoryDatabase {
	private static instance: InMemoryDatabase;
	private databases: Map<string, Map<string, Table>>;

	private constructor() {
		this.databases = new Map();
	}

	public static getInstance(): InMemoryDatabase {
		if (!InMemoryDatabase.instance) {
			InMemoryDatabase.instance = new InMemoryDatabase();
		}
		return InMemoryDatabase.instance;
	}

	createDatabase(dbName: string): void {
		if (!this.databases.has(dbName)) {
			this.databases.set(dbName, new Map());
		}
	}

	createTable(dbName: string, tableName: string, schema: string[], indexField?: string): void {
		const db = this.databases.get(dbName);
		if (!db) {
			throw new Error(`Database ${dbName} does not exist.`);
		}
		const table = new InMemoryTable(tableName, schema, indexField);
		db.set(tableName, table);
	}

	getTable(dbName: string, tableName: string): Table | undefined {
		const db = this.databases.get(dbName);
		return db?.get(tableName);
	}
}
