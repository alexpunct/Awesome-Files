![](https://res.cloudinary.com/alexpunct/image/upload/v1536513948/awesome-files/awesome-files.jpg)

# Awesome Files
<!-- ![title](https://travis-ci.org/Hashnode/mern-starter.svg?branch=v2.0.0) -->
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


Awesome Files is a simple application built using [MERN Starter](https://github.com/Hashnode/mern-starter) that allows uploading, downloading and deleting files from a server. It can be used as boilerplate for a bigger app or as it is. 

## Main Features

#### Frontend

- List all files and their meta-data
- Download single file
- Upload new files and delete existing ones

#### Backend

- Stores the files meta-data in a MongoDB database
- Uploads all files in the `/uploads` root folder

#### Other additions

- [React Dropzone Component](https://github.com/felixrieseberg/React-Dropzone-Component) for file uploads
- [CSRF](https://github.com/expressjs/csurf) protection

## Dev Quickstart

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm6` is required to install dependencies properly.

Or with Docker: `docker run --name db -p 27017:27017 mongo:latest`

```sh
  npm install
  npm start
```

Now you are ready to go, the front-end application should be accessible at `http://0.0.0.0:8000/`


## Docker
There are docker configurations for both development and production.

To run docker for development:
```sh
docker-compose build # re-run after changing dependencies
docker-compose up
```
or, if you want to override the web port:
```sh
WEB_PORT=<your_custom_port> docker-compose up
```

To run docker for production:
```sh
docker-compose -f docker-compose-production.yml up --build
```

To reset the database:
```sh
docker-compose down --volumes
```

## Code structure

#### Frontend - client

Inside the `client/modules` folder is most of the functionality:
- `App` module contains the wrapper, header and footer
- `File` module contains most of the content like the files list, upload widget and search widget

#### Backend - server

In the `server` folder, the code is following the MERN convention:
- models - contain the schema for MongoDB
- routes - contains the API routes with the upload middleware
- controllers - here are all the methods for interacting with the Mongodb database: CRUD file meta data

Also in the `server.js` file is where tha application is setup and most middlewares are added.

## Known issues

- tests are failing after the changes in the framework
- styling needed for the notifications and dropzone

## License
Awesome Files is released under the [MIT License](http://www.opensource.org/licenses/MIT).
