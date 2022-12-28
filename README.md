# backend-challenge

A service in Node.js that exposes an API which can be consumed from any client.

This is a simple service, responsible for keeping count of how many video streams are being played concurrently by any given user. It must check how many streams a user is watching and prevent them from watching more than 3 at the same time.

"Any client" means that the API is implemented independently
of who or what is going to consume it.

There is no implementation of the authentication.