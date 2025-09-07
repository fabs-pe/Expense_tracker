require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('./src/models/userModel');
const { databaseConnect } = require('./src/database');
const { Expense } = require('./src/models/ExpensesModel');
const { Category } = require('./src/models/categoryModel');


async function seed() {
  try {
    await databaseConnect();

    await User.create([
  {
    userName: "Fabian",
    email: "fabian@email.com",
    password: "password13",
    groupName: "test11groupe2"
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

    await Category.create ([
        {
         categoryName: "Car",
         categoryDesc: "all car expenses"   
        }
        

    ]);

    await Expense.create ([
        {
            user: User._id,
            category: "Car",
            expenseName: "petrol",
            description: "petrol to school",
            amount: "45",
            date: "4/12/25"
        }
    ]);

    console.log("✅ User created:", newUser);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close(); // 👈 closes the DB connection
  }
}

seed();
