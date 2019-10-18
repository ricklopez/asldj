import schema from 'schm';
// Note: If API Changes and you need to remap API to Client model keys use
// https://github.com/diegohaz/schm/tree/master/packages/schm-translate

const migrationSchema = schema({
    id: Number,
    migrationName: String,
    sourceHostName: String,
    sourceDB: String,
    sourceSchema: String,
    sourceXMLCount:String,
    destName: String,
    destDB: String,
    destSchema: String,
    destXMLCount:String,
    phase:String,
    complete: Boolean,
    targetDate: String,
    createdDate: String
});

export default migrationSchema;