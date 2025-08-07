# 🏦 PesaView - Personal Finance Tracker

A comprehensive personal finance tracking application built with Next.js and React, designed to help you manage your income and expenses effectively.

## ✨ Features

### 🎨 Aesthetic User Interface (5 marks)
- **Modern Design**: Clean, professional interface with gradient backgrounds and card-based layouts
- **Color-Coded Categories**: Each transaction category has unique icons and colors for easy identification
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Custom Styling**: Beautiful typography, smooth transitions, and hover effects
- **Visual Feedback**: Loading states, animations, and interactive elements enhance user experience

### ⚙️ Working Functionality (10 marks)
- **Transaction Management**: Add, edit, and delete income/expense transactions
- **Data Persistence**: Automatic saving to localStorage with error handling
- **Advanced Filtering**: Filter by category, type, date range with real-time updates
- **Smart Sorting**: Sort transactions by date, amount, description, or category
- **Pagination Controls**: Navigate through large datasets with customizable page sizes (5, 10, 20, 50 items per page)
- **Data Export**: Export transactions to CSV format for external analysis
- **Data Validation**: Comprehensive form validation with user-friendly error messages
- **Sample Data**: Load demo data spanning May-July 2025 to quickly explore application features

### 🚀 Rich User Experience (10 marks)
- **Interactive Charts**: Visual analytics with custom-drawn income vs expense charts
- **Real-time Updates**: Instant calculation of totals, averages, and balances
- **Smart Notifications**: Toast notifications for all user actions with auto-dismissal
- **Enhanced Navigation**: Intuitive form controls with proper focus management
- **Pagination Interface**: User-friendly pagination with page size controls and navigation buttons
- **Accessibility**: Keyboard navigation, screen reader support, and high contrast mode
- **Performance**: Optimized rendering with useMemo hooks and efficient state management
- **Error Handling**: Graceful error handling with informative user feedback

## 🛠️ Technical Implementation

### Technologies Used
- **Frontend**: Next.js 15.0, React 18.3.1
- **Styling**: Custom CSS with CSS-in-JS styling
- **Charts**: Custom HTML5 Canvas implementations
- **Data**: localStorage for client-side persistence

### Key Components
- **Transaction Form**: Add/Edit transactions with validation
- **Filter System**: Advanced filtering and sorting capabilities
- **Summary Dashboard**: Real-time financial overview with key metrics
- **Data Visualization**: Custom charts showing financial trends
- **Notification System**: User feedback system

### Code Quality Features
- **Type Safety**: Comprehensive validation functions
- **Performance**: Efficient re-rendering with React hooks
- **Modularity**: Reusable utility functions and components
- **Documentation**: Well-commented code with clear structure

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   Navigate to `http://localhost:3000` in your browser

4. **Load Sample Data**
   Click "Load Sample Data" to see the application with demo transactions from May-July 2025

## 📱 Features Walkthrough

### Adding Transactions
1. Fill in the transaction form with description, amount, date, category, and type
2. Click "Add" to save the transaction
3. Form includes validation to ensure data integrity

### Managing Data
- **Edit**: Click the edit button (✏️) on any transaction to modify it
- **Delete**: Click the delete button (🗑️) to remove transactions
- **Filter**: Use the filter section to narrow down your view
- **Sort**: Change sorting options to organize transactions
- **Paginate**: Navigate through transactions using pagination controls and adjust page size
- **Export**: Download your data as CSV for backup or analysis

### Visual Analytics
- **Income vs Expense Chart**: Track your financial trends over time
- **Category Breakdown**: See where your money is going by category
- **Summary Cards**: Quick overview of totals, balance, and transaction count

