module.exports = {
    tables: [
      {
        TableName: `artists`,
        KeySchema: [
            {AttributeName: 'Album', KeyType: 'HASH'},
            {AttributeName: 'Artist', KeyType: 'RANGE'}
        ],
        AttributeDefinitions: [
            {AttributeName: 'Album', AttributeType: 'S'},
            {AttributeName: 'Artist', AttributeType: 'S'},
            {AttributeName: 'Sales', AttributeType: 'N'},
            {AttributeName: 'NumberOfSongs', AttributeType: 'N'}
        ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
        GlobalSecondaryIndexes: [
            {
                IndexName: 'myGSI',
                KeySchema: [
                    {AttributeName: 'Sales', KeyType: 'HASH'},
                    {AttributeName: 'Artist', KeyType: 'RANGE'}
                ],
                Projection: {
                    NonKeyAttributes: ['Album', 'NumberOfSongs'],
                    ProjectionType: 'INCLUDE'
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 2, 
                    WriteCapacityUnits: 2
                }
            },
            {
                IndexName: 'myGSI2',
                KeySchema: [
                    {AttributeName: 'NumberOfSongs', KeyType: 'HASH'},
                    {AttributeName: 'Sales', KeyType: 'RANGE'}
                ],
                Projection: {
                    NonKeyAttributes: ['Album', 'Artist'],
                    ProjectionType: 'INCLUDE'
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 2, 
                    WriteCapacityUnits: 2
                }
            }
        ],
        LocalSecondaryIndexes: [
            {
                IndexName: 'myLSI',
                KeySchema: [
                    {AttributeName: 'Album', KeyType: 'HASH'},
                    {AttributeName: 'Sales', KeyType: 'RANGE'}
                ],
                Projection: {
                    NonKeyAttributes: ['Artist', 'NumberOfSongs'],
                    ProjectionType: 'INCLUDE'
                }
            }
        ]
      }
    ]
};