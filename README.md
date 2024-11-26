# WTWR (What to Wear?): Back End

Back end to the WTWR website.
Receives and responds to server requests. 
Get all users, specific use by ID and create a user.
Get all clothing items, create clothing items, delete clothing items, and like and unlike clothing items. 
See the specific routes [below](#routes).

The front end can be found here: [<WTWR Front End>](https://github.com/nathanielDaley/se_project_react)

## Technologies

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [MongoDB](https://www.mongodb.com/)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature(with [nodemon](https://www.npmjs.com/package/nodemon))

## Routes

- Get users(GET) - http://localhost:3001/users
- Get specific user(GET) - http://localhost:3001/users/:userId
- Create user(POST) - http://localhost:3001/users
  - Body(JSON):  
```
{
"name": "George",
"avatar": "https://example.com/av.bmp"
}
```
- Get clothing items(GET) - http://localhost:3001/items
- Create clothingItem(POST) - http://localhost:3001/items
  - Body(JSON):
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
