## Q1: Level 200 
Our national retail client has a 200-store branch network, they want to do a big promotion give-away. To participate, customers must enter their email address with a unique code (which is printed on their dockets) into OUR website. No store has more than 10,000 customers/day.
The code must be no more than 9 characters long, and we have to be able to get the following information out:
-	Which store does the code belong to?
-	Which date was the code issued?
-	Which customer (transaction) did the docket belong to (a number starting again at 1 every day)
Consider how easy it is for the end users to read/copy the code into the website and how we can prevent cheaters.
Write the methods for generating+decoding this unique code that will be printed on the docket by forking the following Pen: https://codepen.io/resonatetest/pen/qwGwqj

### Approach
Generate two methods with the aim of generating and decoding. In generate method, it will return details of storeId and transactionId while the decode method will read the token and decode it into storeId, transactionId and Date of purchase. 

## Q2: Real world problem 
Write a responsive “Contacts” application that allows the user to browse their contacts:
•	Make use of https://jsonplaceholder.typicode.com/ (/users are the contacts)
•	Use either VueJS, Angular or React
•	Make it visually appealing
•	No need to implement Create/Update/Delete
•	Provide instructions on how to run the code

### Approach 
Write a web app that uses ReactJS to perform API requests to fake data server typicode.
The Contact app was implemented CRUD operations and deployed to Vercel.
Bootstrap was choosen to make Contact application visually attractive.
Deployed site: https://resonate-demo.vercel.app/

## Tech Stack

- ReactJS + Typescript
- npm

## Getting Started

```bash
npm install
npm start
```

## Project Requirement

Write a responsive “Contacts” application that allows the user to browse their contacts:

- Make use of https://jsonplaceholder.typicode.com/ (/users are the contacts)
- Use either VueJS, Angular or React
- Make it visually appealing
- No need to implement Create/Update/Delete
- Provide instructions on how to run the code

## Features Implemented:

- **List Contacts**: All contacts are listed on the main page, accessible via the route /.
- **Contact Details**: Clicking on each row in the contacts table will show detailed information about the selected contact.
- **Create Contact**: Even though it was not a part of the initial requirements, a feature to create new contacts has been added. You can access this feature at the route /register.
- **Edit Contact**: This platform allows users to edit existing contact information.
- **Delete Contact**: Each row in the contact table includes a trash icon on the most right column, allowing users to delete contacts.

* As this uses mock data, executing these operations won't reflect changes on the actual server.
