import { useState, useEffect, useMemo } from "react";
import Head from "next/head";

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

// Categories used 
const categories = [
  "Food",
  "Transport",
  "Salary",
  "Rent",
  "Utilities",
  "Entertainment",
  "Health",
  "Education",
  "Others",
];

// File key for localStorage to simulate JSON file persistence
const LOCAL_STORAGE_KEY = "pesaview-transactions";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  // Form state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState("expense"); // "income" or "expense"

  // Filter
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        setTransactions(JSON.parse(data));
      } catch {
        setTransactions([]);
      }
    }
  }, []);

  // Save transactions whenever changes occur
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  function addTransaction(e) {
    e.preventDefault();

    if (!description.trim() || !amount || Number(amount) <= 0 || !date || !category) {
      alert("Please fill all fields correctly.");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: Number(amount),
      date,
      category,
      type, // income or expense
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    // Clear form
    setDescription("");
    setAmount("");
    setDate(formatDate(new Date()));
    setCategory(categories[0]);
    setType("expense");
  }

  // Filter transactions based on filter inputs
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filterCategory !== "All" && t.category !== filterCategory) return false;
      if (filterStartDate && t.date < filterStartDate) return false;
      if (filterEndDate && t.date > filterEndDate) return false;
      return true;
    });
  }, [transactions, filterCategory, filterStartDate, filterEndDate]);

  // Calculations for summaries
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Prepare data for charts
  // Aggregate by month and category
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
      categories.forEach((c) => (data[m][c] = 0));
    });

    filteredTransactions.forEach((t) => {
      const d = new Date(t.date);
      const m = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
      if (!data[m]) {
        data[m] = { income: 0, expense: 0 };
        categories.forEach((c) => (data[m][c] = 0));
      }
      data[m][t.type] += t.amount;
      data[m][t.category] += t.amount;
    });

    return { months, data };
  }, [filteredTransactions]);

  // Remove transaction
  const removeTransaction = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <>
      <Head>
        <title>PesaView - Personal Finance Tracker</title>
        <meta name="description" content="Track and manage your personal finances with PesaView"/>
      </Head>
      <div style={{ maxWidth: 1000, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ 
            color: "#2c3e50", 
            fontSize: "2.5rem", 
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            marginBottom: 10
          }}>
            🏦 PesaView
          </h1>
          <p style={{ 
            color: "#7f8c8d", 
            fontSize: "1.1rem",
            fontStyle: "italic",
            margin: 0
          }}>
            My Personal Finance Tracker
          </p>
        </div>

        {/* Add Transaction Form */}
        <form
          onSubmit={addTransaction}
          style={{
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 20,
            marginBottom: 30,
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Add New Transaction</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <div style={{ flex: "1 1 200px" }}>
              <label>
                Description<br />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="e.g. Lunch at restaurant"
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <div style={{ flex: "1 1 120px" }}>
              <label>
                Amount (KES)<br />
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="1000"
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <label>
                Date<br />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <div style={{ flex: "1 1 140px" }}>
              <label>
                Category<br />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ flex: "1 1 120px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <label>
                Type<br />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </label>
            </div>
            <div style={{ flex: "1 1 100px", display: "flex", alignItems: "flex-end" }}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {/* Filters */}
        <section
          style={{
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 20,
            marginBottom: 30,
            backgroundColor: "#fff",
          }}
        >
          <h2>Filter Transactions</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <div style={{ flex: "1 1 150px" }}>
              <label>
                Category<br />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                >
                  <option value="All">All</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <label>
                Start Date<br />
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <div style={{ flex: "1 1 160px" }}>
              <label>
                End Date<br />
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <div style={{ flex: "1 1 100px", display: "flex", alignItems: "center" }}>
              <button
                onClick={() => {
                  setFilterCategory("All");
                  setFilterStartDate("");
                  setFilterEndDate("");
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: 24,
                }}
                type="button"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 30,
            backgroundColor: "#e9ecef",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <div style={{ fontWeight: "bold", color: "green" }}>
            Total Income: {formatCurrency(totalIncome)}
          </div>
          <div style={{ fontWeight: "bold", color: "red" }}>
            Total Expense: {formatCurrency(totalExpense)}
          </div>
          <div style={{ fontWeight: "bold" }}>
            Balance: {formatCurrency(totalIncome - totalExpense)}
          </div>
        </section>

        {/* Transaction List */}
        <section style={{ marginBottom: 40 }}>
          <h2>Transactions</h2>
          {!filteredTransactions.length && <p>No transactions found.</p>}
          {filteredTransactions.length > 0 && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "8px" }}>Date</th>
                  <th style={{ padding: "8px" }}>Description</th>
                  <th style={{ padding: "8px" }}>Category</th>
                  <th style={{ padding: "8px" }}>Type</th>
                  <th style={{ padding: "8px" }}>Amount (KES)</th>
                  <th style={{ padding: "8px", width: "80px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: t.type === "income" ? "#d4edda" : "#f8d7da",
                    }}
                  >
                    <td style={{ padding: "8px" }}>{t.date}</td>
                    <td style={{ padding: "8px" }}>{t.description}</td>
                    <td style={{ padding: "8px" }}>{t.category}</td>
                    <td style={{ padding: "8px", textTransform: "capitalize" }}>{t.type}</td>
                    <td style={{ padding: "8px" }}>{formatCurrency(t.amount)}</td>
                    <td style={{ padding: "8px" }}>
                      <button
                        onClick={() => removeTransaction(t.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          padding: "6px 10px",
                          cursor: "pointer",
                        }}
                        aria-label="Delete transaction"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Charts */}
        <section style={{ marginBottom: 40 }}>
          <h2>Summary Charts</h2>
          {chartData.months.length === 0 ? (
            <p>No data available for charts.</p>
          ) : (
            <>
              {/* Expenses vs Income Line Chart */}
              <LineChart months={chartData.months} data={chartData.data} />

              {/* Expense by Category Bar Chart */}
              <CategoryBarChart months={chartData.months} data={chartData.data} />
            </>
          )}
        </section>
      </div>
    </>
  );
}

// Simple Line chart to visualize Income vs Expense over time
function LineChart({ months, data }) {
  // To draw chart without external libs we use canvas element
  // Dimensions
  const width = 800;
  const height = 300;
  const padding = 50;

  // Compute max value for y axis to scale
  const maxY = Math.max(
    ...months.map((m) => Math.max(data[m].income, data[m].expense))
  );

  // Convert month string to short label (e.g. "2023-06" -> "Jun 23")
  const monthLabels = months.map((m) => {
    const [y, mon] = m.split("-");
    const date = new Date(y, Number(mon) - 1);
    return date.toLocaleString("default", { month: "short", year: "2-digit" });
  });

  // Draw on canvas reference
  const canvasRef = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";

    // Y axis line
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // X axis line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y axis labels and grid lines
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const yVal = (maxY / ySteps) * i;
      const y = height - padding - (i * (height - 2 * padding)) / ySteps;

      ctx.fillStyle = "#333";
      ctx.textAlign = "right";
      ctx.fillText(formatCurrency(yVal).replace("KES", "KSh"), padding - 5, y + 4);

      // Grid line
      ctx.strokeStyle = "#ddd";
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // X axis labels
    monthLabels.forEach((label, i) => {
      const x =
        padding + (i * (width - 2 * padding)) / (monthLabels.length - 1);
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.fillText(label, x, height - padding + 20);
    });

    // Draw Income line (green)
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    months.forEach((m, i) => {
      const x =
        padding + (i * (width - 2 * padding)) / (monthLabels.length - 1);
      const y =
        height - padding -
        (data[m].income / maxY) * (height - 2 * padding || 1);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Expense line (red)
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    months.forEach((m, i) => {
      const x =
        padding + (i * (width - 2 * padding)) / (monthLabels.length - 1);
      const y =
        height - padding -
        (data[m].expense / maxY) * (height - 2 * padding || 1);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Legend
    ctx.fillStyle = "green";
    ctx.fillRect(width - padding - 150, padding - 25, 15, 15);
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText("Income", width - padding - 130, padding - 12);

    ctx.fillStyle = "red";
    ctx.fillRect(width - padding - 70, padding - 25, 15, 15);
    ctx.fillStyle = "#333";
    ctx.fillText("Expense", width - padding - 50, padding - 12);
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h3>Income vs Expense Over Time</h3>
      <canvas width={width} height={height} ref={canvasRef} />
    </div>
  );
}

// Bar chart showing category expenses per month
function CategoryBarChart({ months, data }) {
  // Dimensions
  const width = 800;
  const height = 400;
  const padding = 60;
  const categoriesToShow = categories.filter((c) => c !== "Salary"); // Expense categories only

  // Find max category total value in any month
  let maxVal = 0;
  months.forEach((m) => {
    categoriesToShow.forEach((c) => {
      if (data[m][c] > maxVal) maxVal = data[m][c];
    });
  });

  const canvasRef = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    // Y axis
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";

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
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const yVal = (maxVal / ySteps) * i;
      const y = height - padding - (i * (height - 2 * padding)) / ySteps;

      ctx.fillStyle = "#333";
      ctx.textAlign = "right";
      ctx.fillText(formatCurrency(yVal).replace("KES", "KSh"), padding - 10, y + 4);

      ctx.strokeStyle = "#ddd";
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // X axis labels (months)
    months.forEach((m, i) => {
      const x =
        padding + (i * (width - 2 * padding)) / (months.length);
      const label = (() => {
        const [y, mon] = m.split("-");
        const date = new Date(y, Number(mon) - 1);
        return date.toLocaleString("default", { month: "short", year: "2-digit" });
      })();
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.fillText(label, x + 15, height - padding + 20);
    });

    // Bars - stacked bar chart of each category for each month
    const barWidth = (width - 2 * padding) / months.length - 12;

    const colors = [
      "#ff6384",
      "#36a2eb",
      "#ffce56",
      "#4bc0c0",
      "#9966ff",
      "#ff9f40",
      "#c9cbcf",
      "#e7e9ed",
    ];

    months.forEach((m, i) => {
      let yStart = height - padding;
      categoriesToShow.forEach((c, idx) => {
        const val = data[m][c];
        const barHeight = (val / maxVal) * (height - 2 * padding);
        if (val > 0) {
          ctx.fillStyle = colors[idx % colors.length];
          ctx.fillRect(
            padding + i * ((width - 2 * padding) / months.length) + 5,
            yStart - barHeight,
            barWidth,
            barHeight
          );
          yStart -= barHeight;
        }
      });
    });

    // Legend
    categoriesToShow.forEach((c, idx) => {
      ctx.fillStyle = colors[idx % colors.length];
      ctx.fillRect(width - padding - 150, padding / 2 + idx * 20, 15, 15);
      ctx.fillStyle = "#333";
      ctx.textAlign = "left";
      ctx.fillText(c, width - padding - 130, padding / 2 + 12 + idx * 20);
    });
  };

  if (months.length === 0) return null;

  return (
    <div>
      <h3>Expense Breakdown by Category per Month</h3>
      <canvas width={width} height={height} ref={canvasRef} />
    </div>
  );
}