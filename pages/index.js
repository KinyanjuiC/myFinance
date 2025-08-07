import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { generateSampleData } from "../utils/dataUtils";

// Utility to format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);

// Utility to format date as yyyy-mm-dd
const formatDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Enhanced styles object for consistent styling
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px',
    background: 'linear-gradient(135deg, #c766eaff 0%, #4ba27cff 100%)',
    borderRadius: '15px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: '0.9',
    margin: '0'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'flex-end'
  },
  inputGroup: {
    flex: '1 1 200px',
    minWidth: '150px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none'
  },
  inputFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
  },
  buttonHover: {
    backgroundColor: '#5a6fd8',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    boxShadow: '0 2px 10px rgba(220, 53, 69, 0.3)'
  },
  buttonSuccess: {
    backgroundColor: '#28a745',
    boxShadow: '0 2px 10px rgba(40, 167, 69, 0.3)'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6'
  },
  tableCell: {
    padding: '15px',
    borderBottom: '1px solid #e9ecef'
  },
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    zIndex: 1000,
    opacity: 0,
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease'
  },
  notificationShow: {
    opacity: 1,
    transform: 'translateX(0)'
  }
};

// Categories used with icons for better UX
const categories = [
  { name: "Food", icon: "🍽️" },
  { name: "Transport", icon: "🚗" },
  { name: "Salary", icon: "💰" },
  { name: "Rent", icon: "🏠" },
  { name: "Utilities", icon: "⚡" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Health", icon: "🏥" },
  { name: "Education", icon: "📚" },
  { name: "Others", icon: "📦" },
];

// File key for localStorage to simulate JSON file persistence
const LOCAL_STORAGE_KEY = "pesaview-transactions";

// Notification component for user feedback
function Notification({ message, type, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      style={{
        ...styles.notification,
        ...(show ? styles.notificationShow : {}),
        backgroundColor: type === 'error' ? '#dc3545' : '#28a745'
      }}
    >
      {message}
    </div>
  );
}

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState(categories[0].name);
  const [type, setType] = useState("expense"); // "income" or "expense"

  // Filter state with enhanced options
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  useEffect(() => {
    setIsLoading(true);
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        setTransactions(JSON.parse(data));
        showNotification("Transactions loaded successfully!");
      } catch {
        setTransactions([]);
        showNotification("Error loading transactions", "error");
      }
    }
    setIsLoading(false);
  }, []);

  // Save transactions whenever changes occur
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  // Enhanced form validation
  const validateForm = () => {
    if (!description.trim()) {
      showNotification("Please enter a description", "error");
      return false;
    }
    if (!amount || Number(amount) <= 0) {
      showNotification("Please enter a valid amount", "error");
      return false;
    }
    if (!date) {
      showNotification("Please select a date", "error");
      return false;
    }
    if (!category) {
      showNotification("Please select a category", "error");
      return false;
    }
    return true;
  };

  // Add or update transaction with enhanced functionality
  function addTransaction(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const transactionData = {
      id: editingTransaction?.id || Date.now().toString(),
      description: description.trim(),
      amount: Number(amount),
      date,
      category,
      type,
      createdAt: editingTransaction?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTransaction) {
      // Update existing transaction
      setTransactions((prev) => 
        prev.map(t => t.id === editingTransaction.id ? transactionData : t)
      );
      showNotification("Transaction updated successfully!");
      setEditingTransaction(null);
    } else {
      // Add new transaction
      setTransactions((prev) => [transactionData, ...prev]);
      showNotification("Transaction added successfully!");
    }

    // Clear form
    resetForm();
    setIsLoading(false);
  }

  // Reset form to initial state
  const resetForm = () => {
    setDescription("");
    setAmount("");
    setDate(formatDate(new Date()));
    setCategory(categories[0].name);
    setType("expense");
    setEditingTransaction(null);
  };

  // Edit transaction
  const editTransaction = (transaction) => {
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setDate(transaction.date);
    setCategory(transaction.category);
    setType(transaction.type);
    setEditingTransaction(transaction);
    showNotification("Transaction loaded for editing");
  };

  // Enhanced filter transactions with sorting
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((t) => {
      if (filterCategory !== "All" && t.category !== filterCategory) return false;
      if (filterType !== "All" && t.type !== filterType) return false;
      if (filterStartDate && t.date < filterStartDate) return false;
      if (filterEndDate && t.date > filterEndDate) return false;
      return true;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, filterCategory, filterType, filterStartDate, filterEndDate, sortBy, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, filterType, filterStartDate, filterEndDate, sortBy, sortOrder]);

  // Pagination helper functions
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  // Calculations for summaries with enhanced metrics
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const transactionCount = filteredTransactions.length;
  const averageTransaction = transactionCount > 0 ? (totalIncome + totalExpense) / transactionCount : 0;

  // Enhanced data export functionality
  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pesaview-transactions-${formatDate(new Date())}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification("Transactions exported to CSV!");
  };

  // Load sample data for demonstration
  const loadSampleData = () => {
    const sampleData = generateSampleData();
    setTransactions(sampleData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleData));
    showNotification("Sample data loaded successfully!");
  };

  // Prepare data for charts with enhanced aggregation
  const chartData = useMemo(() => {
    // Use months from first transaction to latest or last 12 months
    const dateSet = new Set();
    filteredTransactions.forEach((t) => {
      const d = new Date(t.date);
      const m = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
      dateSet.add(m);
    });
    const months = Array.from(dateSet).sort();

    // Prepare data: { month: {income: n, expense: n, category1: n, category2: n, ... } }
    const data = {};
    months.forEach((m) => {
      data[m] = { income: 0, expense: 0 };
      categories.forEach((c) => (data[m][c.name] = 0));
    });

    filteredTransactions.forEach((t) => {
      const d = new Date(t.date);
      const m = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
      if (!data[m]) {
        data[m] = { income: 0, expense: 0 };
        categories.forEach((c) => (data[m][c.name] = 0));
      }
      data[m][t.type] += t.amount;
      data[m][t.category] += t.amount;
    });

    return { months, data };
  }, [filteredTransactions]);

  // Enhanced remove transaction with confirmation
  const removeTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (window.confirm(`Are you sure you want to delete "${transaction?.description}"?`)) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      showNotification("Transaction deleted successfully");
    }
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL transactions? This action cannot be undone.")) {
      setTransactions([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      showNotification("All transactions cleared", "error");
    }
  };

  return (
    <>
      <Head>
        <title>PesaView - Personal Finance Tracker</title>
        <meta name="description" content="Track and manage your personal finances with PesaView" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Notification 
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={hideNotification}
      />

      <div style={styles.container}>
        {/* Enhanced Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>🏦 PesaView</h1>
          <p style={styles.subtitle}>Your Personal Finance Tracker</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={loadSampleData}
              style={{
                ...styles.button,
                backgroundColor: '#17a2b8',
                boxShadow: '0 2px 10px rgba(23, 162, 184, 0.3)',
                fontSize: '12px'
              }}
            >
              🎯 Load Sample Data
            </button>
            <button
              onClick={exportToCSV}
              style={{
                ...styles.button,
                ...styles.buttonSuccess,
                fontSize: '12px'
              }}
              disabled={filteredTransactions.length === 0}
            >
              📊 Export CSV
            </button>
            <button
              onClick={clearAllData}
              style={{
                ...styles.button,
                ...styles.buttonDanger,
                fontSize: '12px'
              }}
              disabled={transactions.length === 0}
            >
              🗑️ Clear All Data
            </button>
          </div>
        </header>

        {/* Enhanced Summary Cards */}
        <div style={styles.summaryGrid}>
          <div style={{...styles.summaryCard, borderLeft: '4px solid #28a745'}}>
            <h3 style={{ color: '#28a745', margin: '0 0 10px 0', fontSize: '1.1rem' }}>💰 Total Income</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745', margin: '0' }}>
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <div style={{...styles.summaryCard, borderLeft: '4px solid #dc3545'}}>
            <h3 style={{ color: '#dc3545', margin: '0 0 10px 0', fontSize: '1.1rem' }}>💸 Total Expenses</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc3545', margin: '0' }}>
              {formatCurrency(totalExpense)}
            </p>
          </div>
          <div style={{...styles.summaryCard, borderLeft: `4px solid ${balance >= 0 ? '#28a745' : '#dc3545'}`}}>
            <h3 style={{ color: balance >= 0 ? '#28a745' : '#dc3545', margin: '0 0 10px 0', fontSize: '1.1rem' }}>
              {balance >= 0 ? '📈' : '📉'} Balance
            </h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: balance >= 0 ? '#28a745' : '#dc3545', margin: '0' }}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div style={{...styles.summaryCard, borderLeft: '4px solid #667eea'}}>
            <h3 style={{ color: '#667eea', margin: '0 0 10px 0', fontSize: '1.1rem' }}>📊 Transactions</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea', margin: '0' }}>
              {transactionCount}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '5px 0 0 0' }}>
              Avg: {formatCurrency(averageTransaction)}
            </p>
          </div>
        </div>

        {/* Enhanced Transaction Form */}
        <form onSubmit={addTransaction} style={styles.card}>
          <h2 style={{ color: '#495057', marginBottom: '20px', fontSize: '1.5rem' }}>
            {editingTransaction ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
          </h2>
          <div style={styles.formGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                📝 Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="e.g. Lunch at restaurant"
                style={styles.input}
                maxLength={100}
              />
            </div>
            <div style={{...styles.inputGroup, flex: '1 1 150px'}}>
              <label style={styles.label}>
                💵 Amount (KES)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="1000.00"
                style={styles.input}
              />
            </div>
            <div style={{...styles.inputGroup, flex: '1 1 160px'}}>
              <label style={styles.label}>
                📅 Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={styles.input}
                max={formatDate(new Date())}
              />
            </div>
            <div style={{...styles.inputGroup, flex: '1 1 160px'}}>
              <label style={styles.label}>
                🏷️ Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.input}
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{...styles.inputGroup, flex: '1 1 140px'}}>
              <label style={styles.label}>
                💹 Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={styles.input}
              >
                <option value="expense">💸 Expense</option>
                <option value="income">💰 Income</option>
              </select>
            </div>
            <div style={{...styles.inputGroup, flex: '0 0 auto'}}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '100%' }}>
                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(editingTransaction ? styles.buttonSuccess : {}),
                    minWidth: '100px'
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳' : editingTransaction ? '💾 Update' : '➕ Add'}
                </button>
                {editingTransaction && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      ...styles.button,
                      backgroundColor: '#6c757d',
                      boxShadow: '0 2px 10px rgba(108, 117, 125, 0.3)'
                    }}
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Enhanced Filters */}
        <section style={styles.card}>
          <h2 style={{ color: '#495057', marginBottom: '20px', fontSize: '1.5rem' }}>🔍 Filter & Sort Transactions</h2>
          <div style={styles.formGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>🏷️ Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={styles.input}
              >
                <option value="All">🎯 All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>💹 Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={styles.input}
              >
                <option value="All">🎯 All Types</option>
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📅 Start Date</label>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📅 End Date</label>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                style={styles.input}
                min={filterStartDate}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📊 Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.input}
              >
                <option value="date">📅 Date</option>
                <option value="amount">💵 Amount</option>
                <option value="description">📝 Description</option>
                <option value="category">🏷️ Category</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>⬇️ Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={styles.input}
              >
                <option value="desc">⬇️ Descending</option>
                <option value="asc">⬆️ Ascending</option>
              </select>
            </div>
            <div style={{...styles.inputGroup, flex: '0 0 auto'}}>
              <button
                onClick={() => {
                  setFilterCategory("All");
                  setFilterType("All");
                  setFilterStartDate("");
                  setFilterEndDate("");
                  setSortBy("date");
                  setSortOrder("desc");
                  setCurrentPage(1);
                  showNotification("Filters cleared");
                }}
                style={{
                  ...styles.button,
                  ...styles.buttonDanger,
                  marginTop: '24px'
                }}
                type="button"
              >
                🗑️ Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Transaction List */}
        <section style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#495057', fontSize: '1.5rem', margin: 0 }}>
              📋 Transactions ({filteredTransactions.length})
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              {filteredTransactions.length !== transactions.length && (
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ ...styles.label, marginBottom: 0, fontSize: '13px' }}>
                  📄 Per Page:
                </label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{ 
                    ...styles.input, 
                    width: 'auto', 
                    padding: '6px 8px',
                    fontSize: '13px',
                    minWidth: '70px'
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
          
          {!filteredTransactions.length && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#6c757d',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '2px dashed #dee2e6'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📊</div>
              <p style={{ fontSize: '1.1rem', margin: '0' }}>
                {transactions.length === 0 ? 'No transactions yet. Add your first transaction above!' : 'No transactions match your current filters.'}
              </p>
            </div>
          )}
          
          {filteredTransactions.length > 0 && (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057'}}>📅 Date</th>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057'}}>📝 Description</th>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057'}}>🏷️ Category</th>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057'}}>💹 Type</th>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057'}}>💵 Amount</th>
                      <th style={{...styles.tableCell, fontWeight: 'bold', color: '#495057', width: '120px'}}>⚙️ Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((t) => {
                      const categoryData = categories.find(c => c.name === t.category) || { icon: '📦' };
                      return (
                        <tr
                          key={t.id}
                          style={{
                            backgroundColor: t.type === "income" ? "#d4edda" : "#f8d7da",
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = t.type === "income" ? "#c3e6cb" : "#f1c2c7";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = t.type === "income" ? "#d4edda" : "#f8d7da";
                          }}
                        >
                          <td style={styles.tableCell}>
                            {new Date(t.date).toLocaleDateString('en-KE', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td style={{...styles.tableCell, maxWidth: '200px'}}>
                            <div style={{ 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap',
                              fontWeight: '500'
                            }} title={t.description}>
                              {t.description}
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '5px',
                              padding: '4px 8px',
                              backgroundColor: 'rgba(255,255,255,0.7)',
                              borderRadius: '12px',
                              fontSize: '0.9rem'
                            }}>
                              {categoryData.icon} {t.category}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              backgroundColor: t.type === 'income' ? '#28a745' : '#dc3545',
                              color: 'white',
                              textTransform: 'capitalize'
                            }}>
                              {t.type === 'income' ? '💰' : '💸'} {t.type}
                            </span>
                          </td>
                          <td style={{...styles.tableCell, fontWeight: 'bold', fontSize: '1rem'}}>
                            {formatCurrency(t.amount)}
                          </td>
                          <td style={styles.tableCell}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button
                                onClick={() => editTransaction(t)}
                                style={{
                                  ...styles.button,
                                  backgroundColor: '#ffc107',
                                  color: '#212529',
                                  padding: '6px 10px',
                                  fontSize: '12px',
                                  minWidth: 'auto',
                                  boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)'
                                }}
                                title="Edit transaction"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => removeTransaction(t.id)}
                                style={{
                                  ...styles.button,
                                  ...styles.buttonDanger,
                                  padding: '6px 10px',
                                  fontSize: '12px',
                                  minWidth: 'auto'
                                }}
                                title="Delete transaction"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ 
                  marginTop: '20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      style={{
                        ...styles.button,
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: currentPage === 1 ? '#6c757d' : '#667eea',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.6 : 1
                      }}
                      title="First page"
                    >
                      ⏮️ First
                    </button>
                    
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      style={{
                        ...styles.button,
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: currentPage === 1 ? '#6c757d' : '#667eea',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.6 : 1
                      }}
                      title="Previous page"
                    >
                      ◀️ Prev
                    </button>

                    {/* Page Numbers */}
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            style={{
                              ...styles.button,
                              padding: '8px 12px',
                              fontSize: '12px',
                              minWidth: '40px',
                              backgroundColor: currentPage === pageNum ? '#28a745' : '#667eea',
                              fontWeight: currentPage === pageNum ? 'bold' : '600'
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      style={{
                        ...styles.button,
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: currentPage === totalPages ? '#6c757d' : '#667eea',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.6 : 1
                      }}
                      title="Next page"
                    >
                      Next ▶️
                    </button>
                    
                    <button
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      style={{
                        ...styles.button,
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: currentPage === totalPages ? '#6c757d' : '#667eea',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.6 : 1
                      }}
                      title="Last page"
                    >
                      Last ⏭️
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Enhanced Charts */}
        <section style={styles.card}>
          <h2 style={{ color: '#495057', marginBottom: '20px', fontSize: '1.5rem' }}>📊 Financial Analytics</h2>
          {chartData.months.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#6c757d',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '2px dashed #dee2e6'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📈</div>
              <p style={{ fontSize: '1.1rem', margin: '0' }}>
                Add some transactions to see your financial analytics charts!
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '30px' }}>
                <LineChart months={chartData.months} data={chartData.data} />
              </div>
              <div>
                <CategoryBarChart months={chartData.months} data={chartData.data} />
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

// Enhanced Line chart with improved styling and interactivity
function LineChart({ months, data }) {
  const width = 900;
  const height = 350;
  const padding = 70;

  const maxY = Math.max(
    ...months.map((m) => Math.max(data[m].income || 0, data[m].expense || 0))
  );

  const monthLabels = months.map((m) => {
    const [y, mon] = m.split("-");
    const date = new Date(y, Number(mon) - 1);
    return date.toLocaleString("default", { month: "short", year: "2-digit" });
  });

  const canvasRef = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw axes with enhanced styling
    ctx.strokeStyle = "#495057";
    ctx.lineWidth = 2;
    ctx.font = "13px 'Segoe UI', sans-serif";

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y axis labels and grid lines
    const ySteps = 6;
    for (let i = 0; i <= ySteps; i++) {
      const yVal = (maxY / ySteps) * i;
      const y = height - padding - (i * (height - 2 * padding)) / ySteps;

      ctx.fillStyle = "#495057";
      ctx.textAlign = "right";
      ctx.fillText(`KSh ${(yVal / 1000).toFixed(0)}K`, padding - 10, y + 4);

      // Grid lines
      if (i > 0) {
        ctx.strokeStyle = "#e9ecef";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // X axis labels
    ctx.fillStyle = "#495057";
    ctx.textAlign = "center";
    monthLabels.forEach((label, i) => {
      const x = padding + (i * (width - 2 * padding)) / Math.max(monthLabels.length - 1, 1);
      ctx.fillText(label, x, height - padding + 25);
    });

    if (months.length > 1) {
      // Draw Income line with gradient
      const incomeGradient = ctx.createLinearGradient(0, 0, 0, height);
      incomeGradient.addColorStop(0, "#28a745");
      incomeGradient.addColorStop(1, "#20c997");
      
      ctx.strokeStyle = incomeGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      months.forEach((m, i) => {
        const x = padding + (i * (width - 2 * padding)) / Math.max(monthLabels.length - 1, 1);
        const y = height - padding - (data[m].income / maxY) * (height - 2 * padding || 1);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Expense line with gradient
      const expenseGradient = ctx.createLinearGradient(0, 0, 0, height);
      expenseGradient.addColorStop(0, "#dc3545");
      expenseGradient.addColorStop(1, "#fd7e14");
      
      ctx.strokeStyle = expenseGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      months.forEach((m, i) => {
        const x = padding + (i * (width - 2 * padding)) / Math.max(monthLabels.length - 1, 1);
        const y = height - padding - (data[m].expense / maxY) * (height - 2 * padding || 1);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw data points
      months.forEach((m, i) => {
        const x = padding + (i * (width - 2 * padding)) / Math.max(monthLabels.length - 1, 1);
        
        // Income points
        const incomeY = height - padding - (data[m].income / maxY) * (height - 2 * padding || 1);
        ctx.fillStyle = "#28a745";
        ctx.beginPath();
        ctx.arc(x, incomeY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Expense points
        const expenseY = height - padding - (data[m].expense / maxY) * (height - 2 * padding || 1);
        ctx.fillStyle = "#dc3545";
        ctx.beginPath();
        ctx.arc(x, expenseY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Enhanced Legend
    const legendY = padding - 30;
    // Income legend
    ctx.fillStyle = "#28a745";
    ctx.fillRect(width - padding - 200, legendY, 20, 15);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(width - padding - 200, legendY, 20, 15);
    ctx.fillStyle = "#495057";
    ctx.textAlign = "left";
    ctx.font = "14px 'Segoe UI', sans-serif";
    ctx.fillText("💰 Income", width - padding - 175, legendY + 12);

    // Expense legend
    ctx.fillStyle = "#dc3545";
    ctx.fillRect(width - padding - 90, legendY, 20, 15);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(width - padding - 90, legendY, 20, 15);
    ctx.fillStyle = "#495057";
    ctx.fillText("💸 Expense", width - padding - 65, legendY + 12);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: '#495057', marginBottom: '20px', fontSize: '1.2rem' }}>
        📈 Income vs Expense Trend
      </h3>
      <div style={{ 
        display: 'inline-block', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <canvas width={width} height={height} ref={canvasRef} />
      </div>
    </div>
  );
}

// Enhanced Bar chart with improved styling and animation
function CategoryBarChart({ months, data }) {
  const width = 900;
  const height = 450;
  const padding = 80;
  const categoriesToShow = categories.filter((c) => c.name !== "Salary").map(c => c.name);

  // Calculate max value as the highest total expenses per month (stacked height)
  let maxVal = 0;
  months.forEach((m) => {
    let monthTotal = 0;
    categoriesToShow.forEach((c) => {
      monthTotal += (data[m][c] || 0);
    });
    if (monthTotal > maxVal) maxVal = monthTotal;
  });

  const canvasRef = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Enhanced axes
    ctx.strokeStyle = "#495057";
    ctx.lineWidth = 2;
    ctx.font = "13px 'Segoe UI', sans-serif";

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y axis labels and grid lines
    const ySteps = 6;
    for (let i = 0; i <= ySteps; i++) {
      const yVal = (maxVal / ySteps) * i;
      const y = height - padding - (i * (height - 2 * padding)) / ySteps;

      ctx.fillStyle = "#495057";
      ctx.textAlign = "right";
      ctx.fillText(`KSh ${(yVal / 1000).toFixed(0)}K`, padding - 15, y + 4);

      if (i > 0) {
        ctx.strokeStyle = "#e9ecef";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // X axis labels (months)
    ctx.fillStyle = "#495057";
    ctx.textAlign = "center";
    months.forEach((m, i) => {
      const x = padding + (i * (width - 2 * padding)) / months.length;
      const label = (() => {
        const [y, mon] = m.split("-");
        const date = new Date(y, Number(mon) - 1);
        return date.toLocaleString("default", { month: "short", year: "2-digit" });
      })();
      ctx.fillText(label, x + 30, height - padding + 25);
    });

    // Enhanced color palette
    const colors = [
      "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7",
      "#dda0dd", "#98d8c8", "#f7dc6f", "#bb8fce", "#85c1e9"
    ];

    const barWidth = Math.max(20, (width - 2 * padding) / months.length - 20);

    // Draw stacked bars with enhanced styling
    months.forEach((m, i) => {
      let yStart = height - padding;
      categoriesToShow.forEach((c, idx) => {
        const val = data[m][c] || 0;
        const barHeight = maxVal > 0 ? (val / maxVal) * (height - 2 * padding) : 0;
        if (val > 0) {
          // Create gradient for each bar segment
          const gradient = ctx.createLinearGradient(0, yStart - barHeight, 0, yStart);
          gradient.addColorStop(0, colors[idx % colors.length]);
          gradient.addColorStop(1, colors[idx % colors.length] + "80");
          
          ctx.fillStyle = gradient;
          const x = padding + i * ((width - 2 * padding) / months.length) + 10;
          
          // Draw bar segment
          ctx.fillRect(x, yStart - barHeight, barWidth, barHeight);
          
          // Add border between segments
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, yStart - barHeight, barWidth, barHeight);
          
          yStart -= barHeight;
        }
      });
    });

    // Enhanced Legend with better positioning
    const legendStartY = 40;
    const legendCols = Math.ceil(categoriesToShow.length / 3);
    const legendItemWidth = 120;
    
    categoriesToShow.forEach((c, idx) => {
      const row = idx % 3;
      const col = Math.floor(idx / 3);
      const x = width - padding - (legendCols - col) * legendItemWidth;
      const y = legendStartY + row * 25;
      
      // Legend color box with border
      ctx.fillStyle = colors[idx % colors.length];
      ctx.fillRect(x, y, 18, 18);
      ctx.strokeStyle = "#495057";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, 18, 18);
      
      // Legend text with category icon
      ctx.fillStyle = "#495057";
      ctx.textAlign = "left";
      ctx.font = "12px 'Segoe UI', sans-serif";
      const categoryData = categories.find(cat => cat.name === c);
      ctx.fillText(`${categoryData?.icon || "📦"} ${c}`, x + 25, y + 13);
    });
  };

  if (months.length === 0) return null;

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h3 style={{ color: '#495057', marginBottom: '20px', fontSize: '1.2rem' }}>
        📊 Expense Categories Breakdown by Month (Stacked)
      </h3>
      <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: '0 0 20px 0', fontStyle: 'italic' }}>
        Each bar shows total expenses per month, broken down by category. Height = total monthly expenses.
      </p>
      <div style={{ 
        display: 'inline-block', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <canvas width={width} height={height} ref={canvasRef} />
      </div>
    </div>
  );
}