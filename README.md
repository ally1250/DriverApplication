# DriverApplication

### Purpose of this Repository
This repository is created to provide a structural preview of the application that is still under development. This repository contains selected sections of code copied from the original Driver Application repository. Therefore, the code in this repository cannot be successfully built. Sorry for the inconvenience and complication.

## Project Overview
### Problem Context
There are several Chinese restaurants offering takeaway meals to UCSD students with no delivery fee to provide more variety in food choices. To order a meal, students need to join a WeChat group where the restaurant shares an ordering link for each deal. In addition, since the link does not support any type of payment, students are responsible to complete the payment through a mobile application called Venmo. This workflow makes food ordering less flexible and accessible to students and also makes bookkeeping difficult for the restaurants. 

### Solution
Our project aims to improve the current food ordering system to make ordering and deliverying more convenient. 

## Directory
I am using [React Native](https://facebook.github.io/react-native/) to implement the front-end and [Redux](https://redux.js.org/introduction/getting-started) for persisting some local user data. We are storing all user data with MongoDB and using [GraphQL client](https://www.apollographql.com/docs/react/) to send quries and receive response from the server. We are using react-apollo as our GraphQL client to manage local data and server data with less code compared to using pure Redux. 
Please see the links below for navigating to specific components of the App:
* **Redux redcers:** <br />
I combined all reducers into one file because we have intergated react-apollo to replace Redux. <br />
https://github.com/ally1250/DriverApplication/tree/master/src/reducers
* **Sample GraphQL quries and mutations:** <br />
https://github.com/ally1250/DriverApplication/blob/master/src/QueryUtils.js
https://github.com/ally1250/DriverApplication/blob/master/src/MutationUtils.js
* **Sample mock GraphQL data:** <br />
Below are some samples of the GraphQL mock we used before we integerated react-apollo.
https://github.com/ally1250/DriverApplication/blob/master/src/graphqlMock.js
https://github.com/ally1250/DriverApplication/tree/master/src/_mock
* **Reusable components:**
https://github.com/ally1250/DriverApplication/tree/master/src/common
* **Sample Views:**
The following views includes examples of using React with Redux and GraphQL client.
Home View: https://github.com/ally1250/DriverApplication/tree/master/src/HomeView
Profile View: https://github.com/ally1250/DriverApplication/tree/master/src/ProfileView
Prepare for Delivery View: https://github.com/ally1250/DriverApplication/tree/master/src/PrepareDeliveryView
Login and Signup Views: https://github.com/ally1250/DriverApplication/tree/master/src/Auth
Search Orders View: https://github.com/ally1250/DriverApplication/tree/master/src/AllOrdersView
