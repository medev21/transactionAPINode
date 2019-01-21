#Basic_transaction REST-ful API

##Scope
A basic Node REST-ful API for a basic transaction system. This API is able to create `users` by the following parameters: `firstName`, `lastName`, `email`, `points` - all are required.

Each `user` has a `transfer` whose parameters are the following: `user_id`, `amount`, `transfer_type`. A `transfer` is the transaction where the `user` is able to add or deduct the amount from the `user` account.

###Request Examples###

**User - GET**

Get all users - `/api/users/`

response:

    ```
    [
        {
            "points": 0,
            "_id": "5c463f921a61efbe0d2f0494",
            "firstName": "eric",
            "lastName": "foreman",
            "email": "eric@that70show.com",
            "updated": "2019-01-21T21:54:26.183Z",
            "__v": 0
        }
    ]
    ```

Get user by id - `/api/users/5c463f921a61efbe0d2f0494`

response:

    ```
    {
        "points": 0,
        "_id": "5c463f921a61efbe0d2f0494",
        "firstName": "eric",
        "lastName": "foreman",
        "email": "eric@that70show.com",
        "updated": "2019-01-21T21:54:26.183Z",
        "__v": 0
    }
    ```

**User - POST**

Create user - `/api/users/`

request:

    ```
    {
        "firstName": "martin",
        "lastName": "ben",
        "email": "test@test.com"
    }
    ```

response:

    ```
    {
        "points": 0,
        "_id": "5c464c1118c53cc48536f770",
        "updated": "2019-01-21T22:47:45.972Z",
        "firstName": "martin",
        "lastName": "ben",
        "email": "test@test.com",
        "__v": 0
    }
    ```

**Transfer - GET**

Get All transfers - `/api/tranfers/`

    response:

    ```
    [
        {
            "amount": 50,
            "transfer_type": "add",
            "_id": "5c463f911a61efbe0d2f0490",
            "user_id": "5c463f911a61efbe0d2f048f",
            "updated": "2019-01-21T21:54:25.820Z",
            "__v": 0
        }
    ]
    ```

Get transfer by user_id - `/api/tranfers/5c464c1118c53cc48536f770`

    response:

    ```
    [
        {
            "amount": 50,
            "transfer_type": "add",
            "_id": "5c464e09031917c494b30002",
            "updated": "2019-01-21T22:56:09.462Z",
            "user_id": "5c464c1118c53cc48536f770",
            "__v": 0
        },
        {
            "amount": 150,
            "transfer_type": "add",
            "_id": "5c464e1c031917c494b30003",
            "updated": "2019-01-21T22:56:28.464Z",
            "user_id": "5c464c1118c53cc48536f770",
            "__v": 0
        }
    ]
    ```

**Transfer - POST**

Create a transfer by user_id - `/api/transfers/5c464c1118c53cc48536f770`

request:

    ```
    {
        "amount": 20,
        "transfer_type": "add",
        "user_id": "5c464c1118c53cc48536f770"
    }
    ```

response:

    ```
    {
        "amount": 20,
        "transfer_type": "add",
        "_id": "5c464ebb031917c494b30004",
        "updated": "2019-01-21T22:59:07.991Z",
        "user_id": "5c464c1118c53cc48536f770",
        "__v": 0
    }
    ```


##Requirements
Please have these two installed in your system before running this project.

[node](https://nodejs.org/en/)
[npm](https://www.npmjs.com/get-npm)

##Installation
Create a folder and store the unzipped project into your folder.

Go inside the project(root folder) and run the following command in your terminal:

`npm i`

##Testing
To run the tests in your terminal, run the following command in the root folder.

`npm test`

To exit, press `ctrl + c`

If you have [Postman](https://www.getpostman.com/), you can also test the requests through there. Just activate the server, by running the following command in your root folder:

`npm start`