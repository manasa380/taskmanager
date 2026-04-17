import './script.css'

const API = "https://taskmanager-backend-77wk.onrender.com"

const app = document.querySelector('#app')!

const token = localStorage.getItem('token')

if (token) {
  showDashboard()
} else {
  showHome()
}

// -------- HOME SCREEN --------
function showHome() {
  app.innerHTML = `
    <h1>Welcome 👋</h1>
    <p>Are you a new user?</p>

    <button id="signupPage">Signup</button>
    <button id="loginPage">Login</button>
  `

  document.getElementById('signupPage')!.onclick = showSignup
  document.getElementById('loginPage')!.onclick = showLogin
}

// -------- SIGNUP --------
function showSignup() {
  app.innerHTML = `
    <h1>Signup 📝</h1>

    <input id="name" placeholder="Name" />
    <input id="email" placeholder="Email" />
    <input id="password" type="password" placeholder="Password" />

    <button id="signupBtn">Signup</button>
    <p id="msg"></p>

    <button id="goLogin">Already have account? Login</button>
  `

  document.getElementById('signupBtn')!.onclick = signup
  document.getElementById('goLogin')!.onclick = showLogin
}

// -------- LOGIN --------
function showLogin() {
  app.innerHTML = `
    <h1>Login 🔐</h1>

    <input id="email" placeholder="Email" />
    <input id="password" type="password" placeholder="Password" />

    <button id="loginBtn">Login</button>
    <p id="msg"></p>

    <button id="goSignup">New user? Signup</button>
  `

  document.getElementById('loginBtn')!.onclick = login
  document.getElementById('goSignup')!.onclick = showSignup
}

// -------- SIGNUP FUNCTION --------
async function signup() {
  const name = (document.getElementById('name') as HTMLInputElement).value
  const email = (document.getElementById('email') as HTMLInputElement).value
  const password = (document.getElementById('password') as HTMLInputElement).value

  const res = await fetch(`${API}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  const data = await res.json()
  document.getElementById('msg')!.textContent = data.message
}

// -------- LOGIN FUNCTION --------
async function login() {
  const email = (document.getElementById('email') as HTMLInputElement).value
  const password = (document.getElementById('password') as HTMLInputElement).value

  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (data.token) {
    localStorage.setItem('token', data.token)
    showDashboard()
  } else {
    document.getElementById('msg')!.textContent = data.message || "Login failed"
  }
}

// -------- DASHBOARD --------
function showDashboard() {
  app.innerHTML = `
    <h1>Task Manager 🚀</h1>
    <button id="logoutBtn">Logout</button>

    <br/><br/>
    <input id="taskInput" placeholder="Enter task" />
    <button id="addBtn">Add Task</button>

    <ul id="taskList"></ul>
  `

  document.getElementById('logoutBtn')!.onclick = logout
  document.getElementById('addBtn')!.onclick = addTask

  loadTasks()
}

// -------- LOGOUT --------
function logout() {
  localStorage.removeItem('token')
  showHome()
}

// -------- ADD TASK --------
async function addTask() {
  const input = document.getElementById('taskInput') as HTMLInputElement
  const token = localStorage.getItem('token')

  if (!input.value) return

  await fetch(`${API}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token!
    },
    body: JSON.stringify({ title: input.value })
  })

  input.value = ''
  loadTasks()
}

// -------- LOAD TASKS --------
async function loadTasks() {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API}/api/tasks`, {
    headers: { 'Authorization': token! }
  })

  const tasks = await res.json()

  const list = document.getElementById('taskList')!
  list.innerHTML = ''

  tasks.forEach((task: any) => {
    const li = document.createElement('li')
    li.textContent = task.title
    list.appendChild(li)
  })
}