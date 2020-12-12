FROM mongo:4.2.8

COPY templates.json /templates.json

CMD mongoimport --host mongodb --db template --username skore-ts --password skore-ts --type json --file /templates.json --jsonArray --authenticationDatabase admin
