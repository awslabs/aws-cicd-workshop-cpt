const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);

it('Should insert item into table', async () => {
    const requestItem = {
        Album: 'Blou',
        Artist: 'Spoegwolf',
        Sales: 1000,
        NumberOfSongs: 12
    }

    await ddb
      .put({TableName: 'artists', Item: requestItem})
      .promise();

    const {Item} = await ddb.get({TableName: 'artists', Key: {Album: 'Blou', Artist: 'Spoegwolf'}}).promise();

    expect(Item).toEqual({
      Album: 'Blou',
      Artist: 'Spoegwolf',
      Sales: 1000,
      NumberOfSongs: 12
    });
});

it('Should retrieve item from table', async () => {
    const {Item} = await ddb.get({TableName: 'artists', Key: {Album: 'Blou', Artist: 'Spoegwolf'}}).promise();

    expect(Item).toEqual({
        Album: 'Blou',
        Artist: 'Spoegwolf',
        Sales: 1000,
        NumberOfSongs: 12
    });
})

it('Should remove item from table', async () => {
    const requestItem = {
        Artist: 'Spoegwolf',
        Album: 'Blou'
    }

    await ddb
    .delete({TableName: 'artists', Key: requestItem})
    .promise();

    const {Item} = await ddb.get({TableName: 'artists', Key: {Album: 'Blou', Artist: 'Spoegwolf'}}).promise();

    expect(Item).toBeUndefined();
})