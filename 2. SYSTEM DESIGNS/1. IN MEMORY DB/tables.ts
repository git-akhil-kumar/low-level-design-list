import { Row, Table } from "./interfaces";

export class InMemoryTable implements Table {
	name: string;
	schema: string[];
	rows: Row[];
	autoIncrementId: number;
	index: Map<any, Row>;
	indexField?: string;

	constructor(name: string, schema: string[], indexField?: string) {
		this.name = name;
		this.schema = schema;
		this.rows = [];
		this.autoIncrementId = 1;
		this.index = new Map();
		this.indexField = indexField;
	}

	insert(row: Row): void {
		row.id = this.autoIncrementId++;
		this.rows.push(row);

		if (this.indexField && row[this.indexField]) {
			this.index.set(row[this.indexField], row);
		}
	}

	update(id: number, newRow: Row): void {
		const row = this.find(id);
		if (!row) return;

		Object.assign(row, newRow);

		if (this.indexField && newRow[this.indexField]) {
			this.index.set(newRow[this.indexField], row);
		}
	}

	delete(id: number): void {
		const index = this.rows.findIndex((row) => row.id === id);
		if (index === -1) return;

		const row = this.rows[index];
		if (this.indexField && row[this.indexField]) {
			this.index.delete(row[this.indexField]);
		}

		this.rows.splice(index, 1);
	}

	find(id: number): Row | undefined {
		return this.rows.find((row) => row.id === id);
	}
}
