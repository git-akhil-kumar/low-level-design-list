type InputDataType = string;

/*
 * Description:- Subclassed do not control the main sequential logic
 */
abstract class DataParser {
	public parseData(data: InputDataType) {
		const serializedData = this.loadData(data);
		const parsedData = this.parse(serializedData);
		this.validateData(parsedData);
		this.useData(parsedData);
	}

	private loadData(data: InputDataType) {
		console.log(`LOADING DATA : ${data}`);
		return data;
	}

	private validateData(data: InputDataType) {
		console.log(`VALIDATING DATA : ${data}`);
	}

	private useData(data: InputDataType) {
		console.log(`USING DATA : ${data}`);
	}

	// Child classes will override this
	protected abstract parse(data: InputDataType): string;
}

class XMLParser extends DataParser {
	protected parse(data: InputDataType): string {
		data = `XML DATA`;
		return data;
	}
}

class JSONParser extends DataParser {
	protected parse(data: InputDataType): string {
		data = `JSON DATA`;
		return data;
	}
}

class CSVParser extends DataParser {
	protected parse(data: InputDataType): string {
		data = "CSV DATA";
		return data;
	}
}

/*
 * Description:- Client code
 */
function parseData(parser: DataParser) {
	const data = "DATA PARSING";
	parser.parseData(data);
}

const xmlParser = new XMLParser();
parseData(xmlParser);

const jsonParser = new JSONParser();
parseData(jsonParser);

const csvParser = new CSVParser();
parseData(csvParser);
