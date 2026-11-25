import { useState } from "react";
import {
  LayoutDashboard, Wallet, Users, FolderKanban,
  UserRound, ShoppingCart, ChartNoAxesCombined,
  Bell, Search, Menu, Plus, ArrowUpRight,
  ArrowDownRight, DollarSign, BriefcaseBusiness,
  Clock, CheckCircle, MoreHorizontal, LogOut,
  Settings, FileText, X, TrendingUp, Package,
  CalendarDays
} from "lucide-react";

import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

import "./index.css";

const revenueData = [
  { month: "Jan", revenue: 35000, expenses: 18000 },
  { month: "Feb", revenue: 42000, expenses: 22000 },
  { month: "Mar", revenue: 38000, expenses: 19000 },
  { month: "Apr", revenue: 55000, expenses: 28000 },
  { month: "May", revenue: 48000, expenses: 25000 },
  { month: "Jun", revenue: 68000, expenses: 32000 },
  { month: "Jul", revenue: 75000, expenses: 35000 },
];

const initialEmployees = [
  { id: "EMP001", name: "Ahmed Mohamed", department: "Finance", role: "Accountant", salary: "$2,500", status: "Active" },
  { id: "EMP002", name: "Sara Ali", department: "HR", role: "HR Manager", salary: "$3,200", status: "Active" },
  { id: "EMP003", name: "Omar Hassan", department: "IT", role: "Developer", salary: "$3,000", status: "On Leave" },
  { id: "EMP004", name: "Mariam Adel", department: "Marketing", role: "Marketing Manager", salary: "$2,800", status: "Active" },
];

const initialProjects = [
  { name: "Website Development", client: "Tech Solutions", budget: "$15,000", progress: 80, status: "In Progress" },
  { name: "Mobile Application", client: "Smart Group", budget: "$22,000", progress: 55, status: "In Progress" },
  { name: "Financial System", client: "Global Finance", budget: "$30,000", progress: 100, status: "Completed" },
  { name: "ERP Integration", client: "Alpha Company", budget: "$18,000", progress: 35, status: "Pending" },
];

const initialTransactions = [
  { name: "Office Rent", category: "Operations", date: "Nov 20, 2026", amount: "-$2,500", status: "Paid" },
  { name: "Client Payment", category: "Income", date: "Nov 19, 2026", amount: "+$8,500", status: "Received" },
  { name: "Employee Salaries", category: "HR", date: "Nov 18, 2026", amount: "-$12,000", status: "Paid" },
  { name: "Project Revenue", category: "Projects", date: "Nov 16, 2026", amount: "+$6,200", status: "Received" },
];

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Finance", icon: Wallet },
  { name: "HR Management", icon: Users },
  { name: "Projects", icon: FolderKanban },
  { name: "Clients (CRM)", icon: UserRound },
  { name: "Procurement", icon: ShoppingCart },
  { name: "Reports", icon: ChartNoAxesCombined },
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "", department: "", role: "", salary: ""
  });

  const [clients] = useState([
    { name: "Tech Solutions", company: "Technology", email: "info@tech.com", status: "Active" },
    { name: "Global Finance", company: "Finance", email: "contact@global.com", status: "Active" },
    { name: "Smart Group", company: "Business", email: "hello@smart.com", status: "Pending" },
  ]);

  const [transactions, setTransactions] = useState(initialTransactions);

  function addEmployee(e) {
    e.preventDefault();

    setEmployees([
      ...employees,
      {
        ...form,
        id: "EMP00" + (employees.length + 1),
        salary: "$" + form.salary,
        status: "Active"
      }
    ]);

    setForm({ name: "", department: "", role: "", salary: "" });
    setShowForm(false);
  }

  function deleteEmployee(id) {
    setEmployees(employees.filter(emp => emp.id !== id));
  }

  function addTransaction(e) {
    e.preventDefault();

    setTransactions([
      {
        name: form.name,
        category: form.department || "Operations",
        date: "Today",
        amount: form.salary.startsWith("+") || form.salary.startsWith("-")
          ? form.salary
          : "$" + form.salary,
        status: "Pending"
      },
      ...transactions
    ]);

    setForm({ name: "", department: "", role: "", salary: "" });
    setShowForm(false);
  }

  const stats = [
    { title: "Total Revenue", value: "$124,500", change: "+12.5%", icon: DollarSign, color: "purple" },
    { title: "Total Expenses", value: "$48,200", change: "+5.2%", icon: Wallet, color: "orange" },
    { title: "Net Profit", value: "$76,300", change: "+18.2%", icon: TrendingUp, color: "green" },
    { title: "Active Projects", value: "24", change: "+4.3%", icon: BriefcaseBusiness, color: "blue" },
  ];

  function heading() {
    const descriptions = {
      Dashboard: "Here's what's happening with your company today.",
      Finance: "Manage your financial operations and transactions.",
      "HR Management": "Manage employees, attendance and payroll.",
      Projects: "Track your projects, tasks and resources.",
      "Clients (CRM)": "Manage your clients and business relationships.",
      Procurement: "Manage purchase requests and inventory.",
      Reports: "Analyze your business performance and KPIs."
    };

    return descriptions[page];
  }

  function tablePage() {
    if (page === "HR Management") {
      return (
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Employees</h3>
              <p>Manage your company employees</p>
            </div>
            <button className="primary-btn" onClick={() => setShowForm(true)}>
              <Plus size={17}/> Add Employee
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th><th>Name</th><th>Department</th>
                  <th>Role</th><th>Salary</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase())).map(e => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td><b>{e.name}</b></td>
                    <td>{e.department}</td>
                    <td>{e.role}</td>
                    <td>{e.salary}</td>
                    <td><span className="badge">{e.status}</span></td>
                    <td><button className="icon-btn" onClick={() => deleteEmployee(e.id)}><X size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (page === "Projects") {
      return (
        <div className="panel">
          <div className="panel-head">
            <div><h3>All Projects</h3><p>Monitor your project progress</p></div>
            <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Add Project</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Project</th><th>Client</th><th>Budget</th><th>Progress</th><th>Status</th></tr></thead>
              <tbody>
                {initialProjects.map((p, i) => (
                  <tr key={i}>
                    <td><b>{p.name}</b></td><td>{p.client}</td><td>{p.budget}</td>
                    <td><div className="progress"><div style={{width:p.progress+"%"}}></div></div>{p.progress}%</td>
                    <td><span className="badge">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (page === "Clients (CRM)") {
      return (
        <div className="panel">
          <div className="panel-head">
            <div><h3>Clients</h3><p>Manage your customers</p></div>
            <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Add Client</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Client Name</th><th>Industry</th><th>Email</th><th>Status</th></tr></thead>
              <tbody>{clients.map((c,i)=><tr key={i}><td><b>{c.name}</b></td><td>{c.company}</td><td>{c.email}</td><td><span className="badge">{c.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      );
    }

    if (page === "Finance") {
      return (
        <>
          <div className="stats-grid">
            {stats.slice(0,3).map((s,i)=><StatCard key={i} item={s}/>)}
          </div>
          <div className="panel">
            <div className="panel-head">
              <div><h3>Financial Transactions</h3><p>Track income and expenses</p></div>
              <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Add Transaction</button>
            </div>
            <TransactionTable transactions={transactions}/>
          </div>
        </>
      );
    }

    if (page === "Procurement") {
      return (
        <div className="panel">
          <div className="panel-head"><div><h3>Procurement & Inventory</h3><p>Purchase requests and stock overview</p></div><button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> New Request</button></div>
          <div className="stats-grid">
            <StatCard item={{title:"Total Products",value:"450",icon:Package,color:"purple"}}/>
            <StatCard item={{title:"Purchase Requests",value:"18",icon:ShoppingCart,color:"orange"}}/>
            <StatCard item={{title:"Available Assets",value:"125",icon:CheckCircle,color:"green"}}/>
          </div>
          <TransactionTable transactions={transactions}/>
        </div>
      );
    }

    if (page === "Reports") {
      return (
        <>
          <div className="stats-grid">{stats.map((s,i)=><StatCard key={i} item={s}/>)}</div>
          <ChartPanel/>
        </>
      );
    }
  }

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><ChartNoAxesCombined size={25}/></div>
          <div><h2>FinCore</h2><span>ERP MANAGEMENT</span></div>
          <button className="close-menu" onClick={()=>setSidebarOpen(false)}><X/></button>
        </div>

        <div className="workspace">
          <span className="workspace-icon">F</span>
          <div><b>Finance Company</b><small>Enterprise Workspace</small></div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {menu.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.name}
                className={`nav-item ${page === item.name ? "active" : ""}`}
                onClick={()=>{setPage(item.name);setSidebarOpen(false);setSearch("");}}>
                <Icon size={19}/><span>{item.name}</span>
                {page === item.name && <span className="active-dot"/>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={19}/> Settings</button>
          <div className="user-profile">
            <div className="avatar">AM</div>
            <div><b>Admin Manager</b><small>Administrator</small></div>
            <LogOut size={17}/>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={()=>setSidebarOpen(true)}><Menu/></button>
          <div className="breadcrumb">Pages <span>/</span> <b>{page}</b></div>
          <div className="top-actions">
            <div className="search-box"><Search size={17}/><input placeholder="Search anything..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
            <button className="notification"><Bell size={20}/><i/></button>
            <div className="top-avatar">AM</div>
          </div>
        </header>

        <div className="content">
          <div className="page-title">
            <div><h1>{page}</h1><p>{heading()}</p></div>
            <div className="date-label"><CalendarDays size={17}/> November 2026</div>
          </div>

          {page === "Dashboard" ? (
            <>
              <div className="welcome">
                <div><span>WELCOME BACK, ADMIN</span><h2>Good to see you again! 👋</h2><p>Here's your company overview for today.</p></div>
                <div className="welcome-icon"><ChartNoAxesCombined size={65}/></div>
              </div>

              <div className="stats-grid">
                {stats.map((s,i)=><StatCard key={i} item={s}/>)}
              </div>

              <div className="charts-grid">
                <ChartPanel/>
                <div className="panel">
                  <div className="panel-head"><div><h3>Revenue Overview</h3><p>Income distribution</p></div><MoreHorizontal/></div>
                  <div className="donut">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart><Pie data={[{name:"Revenue",value:65},{name:"Expenses",value:35}]} dataKey="value" innerRadius={65} outerRadius={88} paddingAngle={5}>
                        <Cell fill="#6954c8"/><Cell fill="#e9e5f5"/>
                      </Pie><Tooltip/></PieChart>
                    </ResponsiveContainer>
                    <div className="donut-label"><b>65%</b><span>Revenue</span></div>
                  </div>
                  <div className="legend"><span>● Revenue</span><b>$124,500</b></div>
                  <div className="legend"><span>● Expenses</span><b>$48,200</b></div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head"><div><h3>Recent Transactions</h3><p>Latest financial activities</p></div><button className="text-btn" onClick={()=>setPage("Finance")}>View all →</button></div>
                <TransactionTable transactions={transactions.slice(0,4)}/>
              </div>
            </>
          ) : tablePage()}

          {showForm && (
            <div className="modal-overlay">
              <form className="modal" onSubmit={page==="HR Management"?addEmployee:addTransaction}>
                <div className="panel-head"><h3>Add New {page==="HR Management"?"Employee":page==="Finance"?"Transaction":page==="Projects"?"Project":page==="Clients (CRM)"?"Client":"Request"}</h3><button type="button" className="icon-btn" onClick={()=>setShowForm(false)}><X/></button></div>
                <label>Name / Description</label>
                <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter name"/>
                <label>Department / Category</label>
                <input value={form.department} onChange={e=>setForm({...form,department:e.target.value})} placeholder="Enter department"/>
                <label>Role / Details</label>
                <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="Enter details"/>
                <label>Salary / Amount</label>
                <input required value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} placeholder="Enter amount"/>
                <button className="primary-btn" type="submit"><Plus size={17}/> Save</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({item}) {
  const Icon = item.icon;
  return (
    <div className="stat-card">
      <div className={`stat-icon ${item.color}`}><Icon size={21}/></div>
      <div className="stat-info"><span>{item.title}</span><h2>{item.value}</h2><small><ArrowUpRight size={14}/>{item.change || "+8.2%"} <span>from last month</span></small></div>
    </div>
  );
}

function ChartPanel() {
  return (
    <div className="panel chart-panel">
      <div className="panel-head"><div><h3>Financial Performance</h3><p>Revenue vs Expenses</p></div><span className="badge">Last 7 months</span></div>
      <div className="chart">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7058ca" stopOpacity={0.3}/><stop offset="95%" stopColor="#7058ca" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eeeaf5"/>
            <XAxis dataKey="month" axisLine={false} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false}/>
            <Tooltip/>
            <Area type="monotone" dataKey="revenue" stroke="#7058ca" fill="url(#rev)" strokeWidth={3}/>
            <Area type="monotone" dataKey="expenses" stroke="#f2a65a" fill="none" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TransactionTable({transactions}) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{transactions.map((t,i)=><tr key={i}><td><b>{t.name}</b></td><td>{t.category}</td><td>{t.date}</td><td className={t.amount.startsWith("+")?"positive":"negative"}>{t.amount}</td><td><span className="badge">{t.status}</span></td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default App;