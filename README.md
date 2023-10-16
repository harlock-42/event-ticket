# event-ticket

Event-ticket is an api of ticketing for events.

Users must :
* Authenticate to access the API.

Users can :
* Create events.
* Modify the name, date, and address of events.
* Book a ticket for events.
* Check the number of tickets still available for an event.
* Cancel a ticket they've booked for an event.

Users can't :
* Book multiple tickets for a single event.

## 1. Install

```git clone git@github.com:harlock-42/event-ticket.git```

## 2. Run

```cd event-ticket && docker compose up -d```

## 3. documentation

[localhost](http://localhost:3000/api)

## 4. database visualizer

You a can use pgAdmin to visualize the database.

1. [click here](http://localhost:5050)

2. signin to pg admin with the ids written in the .env file in the root of this repository. By default, the ids are :

  | Email Address      | Password |
  |:------------------:|:--------:|
  | contact@harlock.fr | admin    |


3. Click on Add a new server

4. Choose a name for your database and to the Connection tab

5. Fill the form like below and click on save

  | Host Name | Maintenance database | Username | Password |
  | :-------: | :------------------: | :------: | :------: |
  | postgres | event-ticket-db | postgres | 1234 |

## 5. Usage of Swagger

1. Use the /auth/signup route to sign up as a user and obtain an accessToken key.
2. Click on the green 'Authorize' button located in the top-right corner of the page.
3. Paste your accessToken key and confirm.
4. You're now set to use the API with Swagger! :)
