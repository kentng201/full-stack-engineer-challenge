Full Stack Engineer Challenge
=============================

This is the full stack engineer challenge from Kent Ng Kian Siang

## Initialize project
To initialize project, create and run all the docker container by running `docker-compose up --build`

These containers will be up when execute the command:
- A MongoDB Database(db)
- Backend Server with Express Server(api)
- React.js Frontend(dashboard)

## Explore project
The Dashboard can be access via `http://localhost`
Backend includes two API:
- GET http://localhost:8000/api/results
- POST http://localhost:8000/api/results

## Drop database data
To prune database data, run the command `docker volume rm fullstackengineerchallenge_db-data`
It will remove docker volume created from docker-compose
