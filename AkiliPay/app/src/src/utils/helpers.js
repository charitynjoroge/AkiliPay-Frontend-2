export const calculateFinancials = (transactions) => {
  const totalInflow = transactions
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const suspiciousCount = transactions.filter(t => t.ml_flag === 'Suspicious').length;
  const netCashflow = totalInflow - totalOutflow;
  const expenseRatio = totalOutflow / (totalInflow || 1) * 100;
  const savingsRate = ((totalInflow - totalOutflow) / (totalInflow || 1) * 100);

  return {
    totalInflow,
    totalOutflow,
    netCashflow,
    suspiciousCount,
    expenseRatio,
    savingsRate,
  };
};

export const getFinancialAdvice = (financials) => {
  const { netCashflow, expenseRatio, savingsRate } = financials;

  if (netCashflow < 0) {
    return {
      title: '⚠️ Critical Alert',
      message: 'Your expenses exceed revenue. Review unnecessary expenses immediately.',
      color: '#ff4444',
    };
  } else if (expenseRatio > 70) {
    return {
      title: '⚠️ High Expense Warning',
      message: 'Expenses are 70%+ of revenue. Aim to reduce costs or increase prices.',
      color: '#ffbb33',
    };
  } else if (savingsRate > 20) {
    return {
      title: '✅ Healthy Business',
      message: `Great job! Save ${savingsRate.toFixed(1)}% for growth and emergency fund.`,
      color: '#00C851',
    };
  } else {
    return {
      title: '📈 Growth Opportunity',
      message: 'Consider investing in marketing or inventory to boost revenue.',
      color: '#33b5e5',
    };
  }
};

export const formatCurrency = (amount) => {
  return `Ksh ${amount.toLocaleString()}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};