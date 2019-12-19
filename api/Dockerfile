#########################################
# Distribute Stage
#########################################

FROM node:8-alpine

WORKDIR /usr/src/app

COPY --from=builder /build /usr/src/app

ENV HOST 0.0.0.0

EXPOSE 8000
CMD ["npm", "start"]