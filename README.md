# TypeScript Node.js | Express | Drizzle ORM

## Run Application

Run in dev mode (Docker + Drizzle + Nodemon)
```shell
npm run dev
```

Compile and Run in prod mode
```shell
npm run docker:up
```
```shell
npm run build && npm run start
```


## Test application

<details>
    <summary>Create Account</summary>

```shell
curl --location 'http://localhost:8080/accounts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "mike@mail.com",
    "firstName": "Mike",
    "lastName": "Brown",
    "currency": "USD",
    "balance": 100
}'
```
</details>

<details>
    <summary>Get All Accounts</summary>

```shell
curl --location 'http://localhost:8080/accounts'
```
</details>

<details>
    <summary>Get Account By Id</summary>

```shell
curl --location 'http://localhost:8080/accounts/1'
```
</details>

<details>
    <summary>Transfer Money</summary>

```shell
curl --location 'http://localhost:8080/accounts/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "senderId": 1,
    "recipientId": 2,
    "amount": 100
}'
```
</details>
