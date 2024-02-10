export const DATABASE_ENDPOINT_W = 'https://us-east-1.aws.data.mongodb-api.com/app/data-jxtyv/endpoint/data/v1/action/find'
export const MONGODB_API_KEY_W = '80m8o2UkVdohtfBd1CIwFSJgNAxcJ4TS1dMkTt5b2sKiDpcDHLI6mxJP6BCPvO8K' 
export const CLUSTER_NAME_W = 'Cluster0'
export const DATABASE_NAME_W = 'worldheritage'
export const COLLECTION_NAME_W = 'nepal'
/*
curl --location --request POST 'https://us-east-1.aws.data.mongodb-api.com/app/data-jxtyv/endpoint/data/v1/action/findOne' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Request-Headers: *' \
--header 'api-key: 80m8o2UkVdohtfBd1CIwFSJgNAxcJ4TS1dMkTt5b2sKiDpcDHLI6mxJP6BCPvO8K' \
--data-raw '{
    "collection":"<COLLECTION_NAME>",
    "database":"<DATABASE_NAME>",
    "dataSource":"Cluster0",
    "projection": {"_id": 1}
}'
*/