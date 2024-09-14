export interface Row {
	[key: string]: any;
}

export interface Table {
	name: string;
	schema: string[];
	rows: Row[];
	indexField?: string;
	autoIncrementId: number;
	insert(row: Row): void;
	update(id: number, row: Row): void;
	delete(id: number): void;
	find(id: number): Row | undefined;
}
