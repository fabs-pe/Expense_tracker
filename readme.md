# Family Expense Tracker

This is backend will create an API for users to log expenses and wages by category, generate reports and view weekly and monthly statistics.

There will be two roles:
- Parent
- Child

## Parent Role

This role will have full CRUD rights. As a parent you can:

- view all users
- add and delete users
- edit all users
- add, edit and delete categories
- add, edit and  delete expenses
- generate reports

## Child Role

This role will allow the child to:

- add their own expense


## Pages

- Home
    - site description

- log in page
    -  email and password

- sign up page
    -  email, name and password

- dashboard
    - shows list of expenses and wages
    - visual displays
    - list of users ( parents access)
    
pages to edit users, categories and inputs

## Data Description

### Users

 Variable | Description 
| ----------- | ----------- |
 _id | user_id |
 _username | unique username  |
 _email | Email |
 _password | Password |
 _group_name | Unique group name |
 created_at | TIMESTAMP

 ### Categories

  Variable | Description 
| ----------- | ----------- |
id | category id |
user_id | from user table |
name | category name



 ### Expenses

  Variable | Description 
| ----------- | ----------- |
id | user_id |
user_id | user_id from users table (FK) |
category_id | id from categories table 
amount | amount spent |
description | notes of the expense
date | when the expense took place
created_at | TIMESTAMP

---

## Routes By User

### Parent

| METHOD | ROUTE |DESCRIPTION
| ----------- | ----------- | ----------- |
GET | /admin/user/all  | displays all users|
GET | /admin/users/:name | displays 1 user by name |
GET | /admin/expenses/all | displays all expenses |
PATCH | /admin/user/update/:name | edit a user by name |
PATCH | /admin/expenses/:title | edit an expense by title |
DEL | /admin/user/:name | delete a user by name |
DEL | /admin/expenses/:title | delete an expense by title |
DEL | /admin/category/:title | delete a category and its content |
POST | /admin/user | add a new user |
POST | /admin/category | add a new category |


### All Users

| METHOD | ROUTE |DESCRIPTION
| ----------- | ----------- | ----------- |
GET | /expenses/all | view all expenses |
GET | /expenses/:date | view expenses by date |
POST | /expenses/new | create a new expense |
POST | /user/register | register a new user
POST | /user/login | login page





















