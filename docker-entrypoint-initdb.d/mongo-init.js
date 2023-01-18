print('Start #################################################################');

db = db.getSiblingDB('flis');
db.createUser(
  {
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'api_prod_db' }],
  },
)
db.createCollection('aircrafts')