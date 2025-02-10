// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle")
const body = document.body

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", body.classList.contains("dark-mode"))
  updateModeToggleIcon()
})

// Check for saved user preference
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode")
}

function updateModeToggleIcon() {
  const icon = modeToggle.querySelector("i")
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }
}

updateModeToggleIcon()

// Budget Calculator
const budgetForm = document.getElementById("budget-form")
const budgetResult = document.getElementById("budget-result")

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const income = Number.parseFloat(document.getElementById("income").value)
  const expenses = Number.parseFloat(document.getElementById("expenses").value)
  const savings = income - expenses

  budgetResult.innerHTML = `
        <h4>Budget Summary</h4>
        <p>Income: $${income.toFixed(2)}</p>
        <p>Expenses: $${expenses.toFixed(2)}</p>
        <p>Savings: $${savings.toFixed(2)}</p>
    `

  // Create a pie chart
  const ctx = document.createElement("canvas")
  budgetResult.appendChild(ctx)

  // Import Chart.js
  // Assuming Chart.js is included in your HTML file via a <script> tag
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Expenses", "Savings"],
      datasets: [
        {
          data: [expenses, savings],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
})

// Loan Calculator
const loanForm = document.getElementById("loan-form")
const loanResult = document.getElementById("loan-result")

loanForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const loanAmount = Number.parseFloat(document.getElementById("loan-amount").value)
  const interestRate = Number.parseFloat(document.getElementById("interest-rate").value) / 100 / 12
  const loanTerm = Number.parseFloat(document.getElementById("loan-term").value) * 12

  const monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1)
  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  loanResult.innerHTML = `
        <h4>Loan Summary</h4>
        <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
        <p>Total Payment: $${totalPayment.toFixed(2)}</p>
        <p>Total Interest: $${totalInterest.toFixed(2)}</p>
    `
})

// Mock stock data (replace with real API in production)
const mockStockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.8, change: -0.3 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 305.15, change: 1.2 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3380.0, change: -0.7 },
  { symbol: "FB", name: "Facebook, Inc.", price: 325.45, change: 0.8 },
]

const stockContainer = document.getElementById("stock-container")

function displayStockData(stocks) {
  stockContainer.innerHTML = ""
  stocks.forEach((stock) => {
    const stockCard = document.createElement("div")
    stockCard.classList.add("stock-card")
    const changeClass = stock.change >= 0 ? "positive" : "negative"
    const changeSymbol = stock.change >= 0 ? "+" : ""
    stockCard.innerHTML = `
            <h3>${stock.symbol}</h3>
            <p>${stock.name}</p>
            <p class="price">$${stock.price.toFixed(2)}</p>
            <p class="change ${changeClass}">${changeSymbol}${stock.change}%</p>
        `
    stockContainer.appendChild(stockCard)
  })
}

// In a real application, you would fetch live data from an API
// For this example, we'll use the mock data
displayStockData(mockStockData)

// Simulate live updates
setInterval(() => {
  mockStockData.forEach((stock) => {
    stock.price += (Math.random() - 0.5) * 5
    stock.change = ((Math.random() - 0.5) * 2).toFixed(2)
  })
  displayStockData(mockStockData)
}, 5000)

// Form validation
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // Add your form submission logic here
  alert("Thank you for your message. We will get back to you soon!")
  contactForm.reset()
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})


