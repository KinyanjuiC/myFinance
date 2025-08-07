// Sample data generator for demonstration
export const generateSampleData = () => {
  const sampleTransactions = [
    // May 2025 transactions
    {
      id: "1",
      description: "Monthly Salary - May",
      amount: 85000,
      date: "2025-05-01",
      category: "Salary",
      type: "income",
      createdAt: "2025-05-01T09:00:00.000Z",
      updatedAt: "2025-05-01T09:00:00.000Z"
    },
    {
      id: "2",
      description: "House Rent - May",
      amount: 25000,
      date: "2025-05-01",
      category: "Rent",
      type: "expense",
      createdAt: "2025-05-01T10:00:00.000Z",
      updatedAt: "2025-05-01T10:00:00.000Z"
    },
    {
      id: "3", 
      description: "Grocery Shopping - Naivas Supermarket",
      amount: 4200,
      date: "2025-05-03",
      category: "Food",
      type: "expense",
      createdAt: "2025-05-03T14:30:00.000Z",
      updatedAt: "2025-05-03T14:30:00.000Z"
    },
    {
      id: "4",
      description: "Electricity Bill - KPLC May",
      amount: 3100,
      date: "2025-05-05",
      category: "Utilities",
      type: "expense",
      createdAt: "2025-05-05T16:45:00.000Z",
      updatedAt: "2025-05-05T16:45:00.000Z"
    },
    {
      id: "5",
      description: "Matatu to CBD",
      amount: 120,
      date: "2025-05-06",
      category: "Transport",
      type: "expense",
      createdAt: "2025-05-06T08:15:00.000Z",
      updatedAt: "2025-05-06T08:15:00.000Z"
    },
    {
      id: "6",
      description: "Freelance Web Design",
      amount: 18000,
      date: "2025-05-10",
      category: "Others",
      type: "income",
      createdAt: "2025-05-10T17:30:00.000Z",
      updatedAt: "2025-05-10T17:30:00.000Z"
    },
    {
      id: "7",
      description: "Lunch at Artcaffe",
      amount: 1600,
      date: "2025-05-12",
      category: "Food",
      type: "expense",
      createdAt: "2025-05-12T13:20:00.000Z",
      updatedAt: "2025-05-12T13:20:00.000Z"
    },
    {
      id: "8",
      description: "Netflix Subscription",
      amount: 1200,
      date: "2025-05-15",
      category: "Entertainment",
      type: "expense",
      createdAt: "2025-05-15T12:00:00.000Z",
      updatedAt: "2025-05-15T12:00:00.000Z"
    },
    {
      id: "9",
      description: "Medical Checkup - Nairobi Hospital",
      amount: 6500,
      date: "2025-05-18",
      category: "Health",
      type: "expense",
      createdAt: "2025-05-18T11:00:00.000Z",
      updatedAt: "2025-05-18T11:00:00.000Z"
    },
    {
      id: "10",
      description: "Uber to Airport",
      amount: 1800,
      date: "2025-05-20",
      category: "Transport",
      type: "expense",
      createdAt: "2025-05-20T15:45:00.000Z",
      updatedAt: "2025-05-20T15:45:00.000Z"
    },
    {
      id: "11",
      description: "Online Course",
      amount: 4500,
      date: "2025-05-22",
      category: "Education",
      type: "expense",
      createdAt: "2025-05-22T15:45:00.000Z",
      updatedAt: "2025-05-22T15:45:00.000Z"
    },
    {
      id: "12",
      description: "Dinner at Carnivore",
      amount: 3200,
      date: "2025-05-25",
      category: "Entertainment",
      type: "expense",
      createdAt: "2025-05-25T19:30:00.000Z",
      updatedAt: "2025-05-25T19:30:00.000Z"
    },

    // June 2025 transactions
    {
      id: "13",
      description: "Monthly Salary - June",
      amount: 85000,
      date: "2025-06-01",
      category: "Salary",
      type: "income",
      createdAt: "2025-06-01T09:00:00.000Z",
      updatedAt: "2025-06-01T09:00:00.000Z"
    },
    {
      id: "14",
      description: "House Rent - June",
      amount: 25000,
      date: "2025-06-01",
      category: "Rent",
      type: "expense",
      createdAt: "2025-06-01T10:00:00.000Z",
      updatedAt: "2025-06-01T10:00:00.000Z"
    },
    {
      id: "15",
      description: "Water Bill - Nairobi Water",
      amount: 1800,
      date: "2025-06-03",
      category: "Utilities",
      type: "expense",
      createdAt: "2025-06-03T11:20:00.000Z",
      updatedAt: "2025-06-03T11:20:00.000Z"
    },
    {
      id: "16",
      description: "Grocery Shopping - Carrefour",
      amount: 5100,
      date: "2025-06-05",
      category: "Food",
      type: "expense",
      createdAt: "2025-06-05T16:45:00.000Z",
      updatedAt: "2025-06-05T16:45:00.000Z"
    },
    {
      id: "17",
      description: "Consultancy Fee",
      amount: 22000,
      date: "2025-06-08",
      category: "Others",
      type: "income",
      createdAt: "2025-06-08T14:30:00.000Z",
      updatedAt: "2025-06-08T14:30:00.000Z"
    },
    {
      id: "18",
      description: "Fuel - Shell Station",
      amount: 4800,
      date: "2025-06-10",
      category: "Transport",
      type: "expense",
      createdAt: "2025-06-10T08:15:00.000Z",
      updatedAt: "2025-06-10T08:15:00.000Z"
    },
    {
      id: "19",
      description: "Movie Night - Prestige Plaza",
      amount: 2400,
      date: "2025-06-12",
      category: "Entertainment",
      type: "expense",
      createdAt: "2025-06-12T20:00:00.000Z",
      updatedAt: "2025-06-12T20:00:00.000Z"
    },
    {
      id: "20",
      description: "Coffee and Pastry - Java House",
      amount: 900,
      date: "2025-06-15",
      category: "Food",
      type: "expense",
      createdAt: "2025-06-15T10:30:00.000Z",
      updatedAt: "2025-06-15T10:30:00.000Z"
    },
    {
      id: "21",
      description: "Internet Bill - Safaricom",
      amount: 3500,
      date: "2025-06-18",
      category: "Utilities",
      type: "expense",
      createdAt: "2025-06-18T15:45:00.000Z",
      updatedAt: "2025-06-18T15:45:00.000Z"
    },
    {
      id: "22",
      description: "Gym Membership",
      amount: 2800,
      date: "2025-06-20",
      category: "Health",
      type: "expense",
      createdAt: "2025-06-20T12:00:00.000Z",
      updatedAt: "2025-06-20T12:00:00.000Z"
    },
    {
      id: "23",
      description: "Books - University of Nairobi Bookshop",
      amount: 3600,
      date: "2025-06-22",
      category: "Education",
      type: "expense",
      createdAt: "2025-06-22T14:15:00.000Z",
      updatedAt: "2025-06-22T14:15:00.000Z"
    },
    {
      id: "24",
      description: "Weekend Shopping - Sarit Centre",
      amount: 2700,
      date: "2025-06-25",
      category: "Others",
      type: "expense",
      createdAt: "2025-06-25T16:30:00.000Z",
      updatedAt: "2025-06-25T16:30:00.000Z"
    },

    // July 2025 transactions
    {
      id: "25",
      description: "Monthly Salary - July",
      amount: 85000,
      date: "2025-07-01",
      category: "Salary",
      type: "income",
      createdAt: "2025-07-01T09:00:00.000Z",
      updatedAt: "2025-07-01T09:00:00.000Z"
    },
    {
      id: "26",
      description: "House Rent - July",
      amount: 25000,
      date: "2025-07-01",
      category: "Rent",
      type: "expense",
      createdAt: "2025-07-01T10:00:00.000Z",
      updatedAt: "2025-07-01T10:00:00.000Z"
    },
    {
      id: "27",
      description: "Side Business Income",
      amount: 12000,
      date: "2025-07-03",
      category: "Others",
      type: "income",
      createdAt: "2025-07-03T18:45:00.000Z",
      updatedAt: "2025-07-03T18:45:00.000Z"
    },
    {
      id: "28",
      description: "Electricity Bill - KPLC July",
      amount: 2900,
      date: "2025-07-05",
      category: "Utilities",
      type: "expense",
      createdAt: "2025-07-05T16:45:00.000Z",
      updatedAt: "2025-07-05T16:45:00.000Z"
    },
    {
      id: "29",
      description: "Family Lunch",
      amount: 4500,
      date: "2025-07-07",
      category: "Food",
      type: "expense",
      createdAt: "2025-07-07T14:30:00.000Z",
      updatedAt: "2025-07-07T14:30:00.000Z"
    },
    {
      id: "30",
      description: "Public Transport - Weekly Pass",
      amount: 850,
      date: "2025-07-08",
      category: "Transport",
      type: "expense",
      createdAt: "2025-07-08T08:15:00.000Z",
      updatedAt: "2025-07-08T08:15:00.000Z"
    },
    {
      id: "31",
      description: "Spotify Premium Subscription",
      amount: 999,
      date: "2025-07-10",
      category: "Entertainment",
      type: "expense",
      createdAt: "2025-07-10T12:00:00.000Z",
      updatedAt: "2025-07-10T12:00:00.000Z"
    },
    {
      id: "32",
      description: "Dental Cleaning - Dental Associates",
      amount: 4200,
      date: "2025-07-12",
      category: "Health",
      type: "expense",
      createdAt: "2025-07-12T15:30:00.000Z",
      updatedAt: "2025-07-12T15:30:00.000Z"
    },
    {
      id: "33",
      description: "Online Workshop Fee",
      amount: 2500,
      date: "2025-07-15",
      category: "Education",
      type: "expense",
      createdAt: "2025-07-15T10:45:00.000Z",
      updatedAt: "2025-07-15T10:45:00.000Z"
    },
    {
      id: "34",
      description: "Weekend Getaway - Nakuru",
      amount: 8500,
      date: "2025-07-18",
      category: "Entertainment",
      type: "expense",
      createdAt: "2025-07-18T19:20:00.000Z",
      updatedAt: "2025-07-18T19:20:00.000Z"
    },
    {
      id: "35",
      description: "Grocery Restock",
      amount: 3800,
      date: "2025-07-20",
      category: "Food",
      type: "expense",
      createdAt: "2025-07-20T11:15:00.000Z",
      updatedAt: "2025-07-20T11:15:00.000Z"
    },
    {
      id: "36",
      description: "Parking Fees - CBD",
      amount: 600,
      date: "2025-07-22",
      category: "Transport",
      type: "expense",
      createdAt: "2025-07-22T16:30:00.000Z",
      updatedAt: "2025-07-22T16:30:00.000Z"
    }
  ];

  return sampleTransactions;
};

// Export utility functions
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);

export const formatDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

export const validateTransaction = (transaction) => {
  const errors = [];
  
  if (!transaction.description?.trim()) {
    errors.push("Description is required");
  }
  
  if (!transaction.amount || transaction.amount <= 0) {
    errors.push("Amount must be greater than 0");
  }
  
  if (!transaction.date) {
    errors.push("Date is required");
  }
  
  if (!transaction.category) {
    errors.push("Category is required");
  }
  
  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.push("Type must be either 'income' or 'expense'");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const calculateStats = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = income - expense;
  const count = transactions.length;
  const averageTransaction = count > 0 ? (income + expense) / count : 0;
  
  const categoryTotals = {};
  transactions.forEach(t => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
  });
  
  return {
    income,
    expense,
    balance,
    count,
    averageTransaction,
    categoryTotals
  };
};
