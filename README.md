# WTWR (What to Wear?): Back End

Back end to the WTWR website created using [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), [Mongoose](https://www.npmjs.com/package/mongoose), and [MongoDB](https://www.mongodb.com/).

The front end can be found here: [<WTWR Front End>](https://github.com/nathanielDaley/se_project_react)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature(with [nodemon](https://www.npmjs.com/package/nodemon))

## Routes

- Get users(GET) - http://localhost:3001/users
- Get specific user(GET) - http://localhost:3001/users/:userId
- Create user(POST) - http://localhost:3001/users
  - Body:  
```
{
"name": "George",
"avatar": "https://example.com/av.bmp"
}
```
- Get clothing items(GET) - http://localhost:3001/items
- Create clothingItem(POST) - http://localhost:3001/items
  - Body like:
```
{
"name": "hat",
"weather": "hot",
"imageUrl": "https://example.com/av.bmp"
}
```
- Delete clothing item(DELETE) - http://localhost:3001/items/:id
- Like clothing item(PUT) - http://localhost:3001/items/:id/likes
- Unlike clothing item(DELETE) - http://localhost:3001/items/:id/likes
