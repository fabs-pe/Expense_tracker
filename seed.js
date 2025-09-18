require('dotenv').config();
const mongoose = require('mongoose');

const { databaseConnect } = require('./src/database');
const { Expense } = require('./src/models/ExpensesModel');
const { Category } = require('./src/models/categoryModel');
const { User } = require('./src/models/UserModel');

async function seed() {
  try {
    await databaseConnect();

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Expense.deleteMany({});

    // Create multiple users in one go
    const users = await User.insertMany([
      {
        userName: "Fabian",
        email: "fabian@email.com",
        password: "password13",
        groupName: "devgroup12e"
      },
      {
        userName: "Alice",
        email: "alice@email.com",
        password: "password42",
        groupName: "devgroup12e",
        role: "adult"
      },
      {
        userName: "Matisse",
        email: "matisse@email.com",
        password: "password13",
        groupName: "9888112e",
        role: "adult"
      }
    ]);

    // Create categories
    const categories = await Category.insertMany([
      {
        categoryName: "Car",
        categoryDesc: "All car expenses"
      },
      {
        categoryName: "Groceries",
        categoryDesc: "all food and beverage bought from shops"
      },
      {
        categoryName: "entertainment",
        categoryDesc:"going out not including restaurants"
      },
      {
        categoryName: "Alcohol",
        categoryDesc:" from the"
      }
    ]);

    // Create expense linked to  users + categories
    const expenses = await Expense.insertMany([
      {
        user: users[0]._id,
        category: categories[0]._id,
        expenseName: "Petrol",
        description: "Petrol to school",
        amount: 45,
        date: new Date("2025-04-12") // better to store dates properly
      },
      {
        user: users[1]._id,
        category: categories[1]._id,
        expenseName: "Food",
        description: "food for dinner on tueday",
        amount: 100,
        date: new Date("2025-01-02")
      },
      {
        user: users[0]._id,
        category: categories[1]._id,
        expenseName: "Lunch Food",
        description: "Food for the week lunches",
        amount: "150",
        date: new Date("2025-03-13")
      },
      {
        user: users[2]._id,
        category: categories[3]._id,
        expenseName: "Long Weekend",
        description: "all beverages for the weekend",
        amount: 400,
        date: new Date("2025-01-02")
      }
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
