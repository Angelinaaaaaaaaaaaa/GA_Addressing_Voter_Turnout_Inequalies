# **Capstone Report: Addressing Voter Turnout Disparities through Data-Driven Resource Allocation**

## **📌 Overview**

This repository contains the implementation for our capstone project, which focuses on addressing voter turnout
disparities using **Structural Causal Models (SCMs)** and **Mixed Integer Programming (MIP)**. We optimize polling
station placement in Georgia with the dual objectives of:

1. **Maximizing overall voter turnout**
2. **Reducing racial disparities in voting accessibility**

The project leverages **public election data**, **census demographics**, and **fairness constraints** to identify
equitable polling station allocations. Our methodology quantifies the impact of interventions on turnout rates and
ensures resources are allocated to communities with the greatest need.

---

## **🚀 Features**

- ✅ **Data-driven polling station optimization**
- 🔍 **Structural Causal Models (SCMs) for intervention evaluation**
- 🏛 **Mixed Integer Programming (MIP) for optimal resource allocation**
- ⚖️ **Fairness constraints to mitigate racial and socioeconomic disparities**
- 📊 **Publicly available datasets for replication and analysis**

---

## **📥 Getting Started**

### **1️⃣ Install Dependencies**

Before running the project, ensure you have **Node.js** installed. Then, install the required dependencies using:

```bash
npm install
```

---

### **2️⃣ Build the Project**

Compile the project using:

```bash
npm run build
```

This step ensures all required assets and configurations are correctly set up.

---

### **3️⃣ Start the Application**

Run the application locally:

```bash
npm start
```

This will launch the project and allow you to interact with the dataset and model results.

---

## **📊 Dataset**

The dataset includes **2020 Georgia election data** along with **demographic and socioeconomic indicators** to assess
disparities in polling station distribution. Key features include:

- 🗳 **Polling Station Accessibility**: Ratio of polling stations to the eligible voting population
- 📈 **Voter Turnout Rates**: By race and gender groups
- 💰 **Socioeconomic Indicators**: Unemployment rate, campaign contributions, and social engagement metrics (e.g.,
  election-related tweets)
- 🌍 **Geographic Data**: County-level neighborhood distance matrix for estimating the impact of nearby counties

We model **polling station allocation** as an **integer programming problem**, identifying areas below the state-wide
polling station average for targeted intervention.

---

## **📌 Upcoming Features**

- 📍 **Redesign zoom in / zoom out features**
- 🎨 **Modular UI components for interactive data visualization**
- 📈 **Improved fairness constraints in resource allocation**
- 🌎 **Multiple map instances per page for comparative analysis**
- 📊 **Integration of Axios for dynamic data fetching**

---

## **🤝 Contributing**

We welcome contributions! Feel free to open issues, suggest improvements, or submit pull requests to help refine the
model and enhance fairness in voter accessibility.

---

## **📜 License**

This project is licensed under the **MIT License**.

Happy coding! ✌️
