import schema from 'schm';
// Note: If API Changes and you need to remap API to Client model keys use
// https://github.com/diegohaz/schm/tree/master/packages/schm-translate

const periodMappingSchema = schema({
    id: Number,
    migrationId: String,
    clientPeriod: String,
    catalystPeriod: String

});

export default periodMappingSchema;