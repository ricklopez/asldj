import schema from 'schm';
// Note: If API Changes and you need to remap API to Client model keys use
// https://github.com/diegohaz/schm/tree/master/packages/schm-translate

const lobMappingSchema = schema({
    id: Number,
    migrationId: String,
    clientLOB: String,
    clientCoverage: String,
    displayName: String,
    countOfClientRows: Number

});

export default lobMappingSchema;