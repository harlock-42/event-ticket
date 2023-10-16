# event-ticket

## 1. Install

```git clone git@github.com:harlock-42/event-ticket.git```

## 2. Run

```cd event-ticket && docker compose up -d```

## 3. documentation

[localhost](http://localhost:3000/api)
<a href="http://localhost:3000/api" target="_blank">localhost:3000/api</a>

## 4. database visualizer

You a can user pgAdmin to visualize the database

1. [click here](http://localhost:5050)
<a href="http://localhost:5050" target="_blank">localhost:5050</a>

2. signin to pg admin with the ids written en the .env file in the root of this repository. By default, the ids are :
| Email Address | Password |
| :-----------: | :------: |
| contact@harlock.fr | admin |

3. Click on Add a new server

4. Choose a name for your database and to the Connection tab

5. Fill the form like below and click on save
| Host Name | Maintenance database | Username | Password |
| :-------: | :------------------: | :------: | :------: |
| postgres | event-ticket-db | postgres | 1234 |