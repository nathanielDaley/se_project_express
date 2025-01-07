# WTWR (What to Wear?): Back End

Back end to the WTWR website.
Receives and responds to server requests. 
Get all users, get specific user by ID and create a user.
Get all clothing items, create clothing items, delete clothing items, and like and unlike clothing items. 
See the specific routes [below](#routes).

The front end can be found here: [<WTWR Front End>](https://github.com/nathanielDaley/se_project_react)

Website: https://project-wtwr.jumpingcrab.com/

## Technologies

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [MongoDB](https://www.mongodb.com/)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature(with [nodemon](https://www.npmjs.com/package/nodemon))

## Routes

- Login(POST) - https://localhost:3001/signin
  - Body(JSON):  
```
{
  "email": "abc@abc.com",
  "password": "123abc"
}
```
- Get logged in user(GET)(send authorization "bearer" token) - http://localhost:3001/users/me
- Create user(POST) - http://localhost:3001/signup
  - Body(JSON):  
```
{
  "name": "George",
  "avatar": "https://example.com/av.bmp",
  "email": "abc@abc.com",
  "password": "123abc"
}
```
- Update user(PATCH)(send authorization "bearer" token) - http://localhost:3001/users
  - Body(JSON):  
```
{
  "name": "George",
  "avatar": "https://example.com/av.bmp"
}
```
- Get clothing items(GET) - http://localhost:3001/items
- Create clothingItem(POST)(send authorization "bearer" token) - http://localhost:3001/items
  - Body(JSON)(valid "weather": "hot", "warm", "cold"):
```
{
  "name": "hat",
  "weather": "hot",
  "imageUrl": "https://example.com/av.bmp"
}
```
- Delete clothing item(DELETE)(send authorization "bearer" token) - http://localhost:3001/items/:id
- Like clothing item(PUT)(send authorization "bearer" token) - http://localhost:3001/items/:id/likes
- Unlike clothing item(DELETE)(send authorization "bearer" token) - http://localhost:3001/items/:id/likes
