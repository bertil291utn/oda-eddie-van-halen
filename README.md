# Tribute to Eddie Van Halen

### This is a project to tribute Eddie Van Halen's all music career with his band. Last week He passed away and I decided to go with this project. RIP

[<div align="center"><img src="https://user-images.githubusercontent.com/24902525/96033256-78e84980-0e25-11eb-8356-6dc53710f0be.png" alt="image" width="800" /></div>](https://tribute-to-eddie-v-halen.herokuapp.com/)

*Click on the image to go to live demo*
## Video explanation
[📽🎬](https://www.loom.com/share/cd935e999f9f4f0c9f9f56c2499193b2)
## Built With 

- Node.js
- React
- Redux
- CSS
- ES6
- Spotify [API](https://developer.spotify.com/console/)
- Spotify web [library](https://www.npmjs.com/package/spotify-web-api-js)
- Genius [API](https://docs.genius.com/#/) 

## Getting Started

In order to start with this project you need the next:
### Download repository
- Get a copy of this project [this repository :blue_book:](https://github.com/bertil291utn/oda-eddie-van-halen.git)
### Generate access tokens

**Spotify**

- Go to the developer Spotify API endpoint [page](https://developer.spotify.com/console/)
- Create an app you get
- Fill the form and submit this one
- At the end you will see two keys (CLIENT_ID and SECRET_ID)
- On this project create a `.env` file 
- Create a key name called `REACT_APP_CLIENT_ID` and `REACT_APP_CLIENT_SECRET`
- Copy your keys form the Spotify web page dashboard
- Paste on each variable respectively 

***Remember:** Spotify key has a limit time, however the app generates a token when the last is not invalid*

This project was developed with the [Spotify library](https://www.npmjs.com/package/spotify-web-api-js), go check it out this is the documentation 

**Genius**
- Go to genius api [documentation](https://docs.genius.com/#/search-h2)
- If you don't have an account, create one
- Click "manage client link"
- Create new api client
- Click generate access token 
- Copy the generated access token 
- On `.env` file add another key name called `REACT_APP_GENIUS_KEY` and paste the key

### Run the project 

- Runs the app in the development mode.<br />
  ```
  npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Follow the video instructions 


## Deployment

Deployed with [Heroku](https://www.heroku.com/)  


## Authors

👤 **Bertil Tandayamo**

- Github: [@bertil291utn](https://github.com/bertil291utn)
- Twitter: [@btandayamo](https://twitter.com/batandayamo)
- LinkedIn: [Bertil Tandayamo](http://bit.ly/bertil_linkedin)

## Issues
- The application is only available from 1024px to up screen devices
- Still not working on Firefox a property with `grid-inline`

## Improvements
- Make a RWD page
- Fix Spotify API automatically generate token function  


## Acknowledgment

Inspired design by [Heroink](https://www.behance.net/heroink), [Edoardo Benaglia](https://www.behance.net/gallery/75928301/Album-packaging-Lost-Breed?tracking_source=search_projects_recommended%7Ccd%20album%20packaging) and
[Petr Kudlacek](https://www.behance.net/gallery/47526119/Nasilnik-EP-cover?tracking_source=search_projects_recommended%7Ccd%20cover)  

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

If you got until here, show your love hitting the ⭐️ button, I'd appreciate it.

**To crete a pull request:**
- Clone this project and create another branch
- Make the required changes 
- Send a pull request from the new branch  

## 📝 License

This project is [MIT](LICENSE) licensed.



