Full Stack Engineer Challenge
=============================

This is the full stack engineer challenge from Kent Ng Kian Siang

## Initialize project
To initialize project, create and run all the docker container by running `docker-compose up`

These containers will be up when running the command:
- A MongoDB Database(db)
- Backend Server with Express Server(api)
- React.js Frontend(dashboard)

## Drop database data
To prune database data, run the command `docker volume rm fullstackengineerchallenge_db-data`
It will remove docker volume created from docker-compose
