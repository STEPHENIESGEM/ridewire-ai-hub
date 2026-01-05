# Terminal Setup Guide for RideWire AI Hub

A beginner-friendly guide for setting up and running RideWire AI Hub using the terminal/command line.

---

## 📋 Prerequisites

Before you begin, make sure you have these installed:

### 1. Node.js and npm
**What it is:** JavaScript runtime needed to run the application

**Check if installed:**
```bash
node --version
npm --version
```

**Expected output:**
```
v16.0.0 (or higher)
8.0.0 (or higher)
```

**If not installed:**
- Visit https://nodejs.org
- Download and install the LTS (Long Term Support) version
- Restart your terminal after installation

### 2. PostgreSQL Database
**What it is:** Database system for storing user data

**Check if installed:**
```bash
psql --version
```

**Expected output:**
```
psql (PostgreSQL) 12.0 (or higher)
```

**If not installed:**
- **Mac:** `brew install postgresql`
- **Linux:** `sudo apt-get install postgresql`
- **Windows:** Download from https://www.postgresql.org/download/

### 3. Git (Optional but Recommended)
**What it is:** Version control system

**Check if installed:**
```bash
git --version
```

**If not installed:**
- Visit https://git-scm.com/downloads

---

## 🚀 Setup Instructions

### Step 1: Get the Code

**Option A: Clone from GitHub (recommended)**
```bash
git clone https://github.com/STEPHENIESGEM/ridewire-ai-hub.git
cd ridewire-ai-hub
```

**Option B: Download ZIP**
1. Go to https://github.com/STEPHENIESGEM/ridewire-ai-hub
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal and navigate to the extracted folder:
   ```bash
   cd path/to/ridewire-ai-hub
   ```

### Step 2: Install Dependencies

Install all required packages:
```bash
npm install
```

**What this does:** Downloads all the libraries and tools the app needs

**Expected output:** A progress bar showing package installation

**If you see errors:**
- Make sure Node.js is installed correctly
- Try `npm cache clean --force` then `npm install` again

### Step 3: Set Up Environment Variables

Create a configuration file for your API keys and settings:

```bash
# Copy the example file
cp .env.example .env

# Open the file in your editor
# Mac/Linux:
nano .env

# Windows:
notepad .env
```

**Add your configuration:**
```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ridewire_db

# API Keys (get these from the respective platforms)
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_anthropic_key_here
GEMINI_API_KEY=your_google_key_here

# JWT Configuration
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRATION=24h

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:3000

# Email Configuration (optional for now)
SMTP_HOST=smtp.stepheniesgem.io
SMTP_PORT=587
SMTP_USER=noreply@stepheniesgem.io
SMTP_PASS=your_email_password

# Legal Configuration
LEGAL_DISCLAIMER_VERSION=1.0.0
REQUIRE_DISCLAIMER_ACCEPTANCE=true
```

**Save and exit:**
- In nano: Press `Ctrl+X`, then `Y`, then `Enter`
- In notepad: File → Save

### Step 4: Set Up the Database

Create the database and tables:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database (in PostgreSQL prompt)
CREATE DATABASE ridewire_db;

# Create user
CREATE USER ridewire_user WITH PASSWORD 'your_secure_password';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ridewire_db TO ridewire_user;

# Exit PostgreSQL
\q
```

**Run the schema:**
```bash
psql -U ridewire_user -d ridewire_db -f schema.sql
```

**Run the migration for legal compliance:**
```bash
psql -U ridewire_user -d ridewire_db -f database/migrations/add_user_agreements.sql
```

### Step 5: Test Your Setup

Run the link testing script:
```bash
node scripts/test-links.js
```

**Expected output:**
```
✅ All routes are properly defined!
```

---

## 🏃 Running the Application

### Development Mode (Recommended for Testing)

**Start the backend server:**
```bash
# In terminal window 1
npm run server
```

**Expected output:**
```
Server running on port 3000
Database connected successfully
```

**Start the frontend development server:**
```bash
# In terminal window 2 (open a new terminal)
npm run dev
```

**Expected output:**
```
Compiled successfully!
You can now view ridewire-ai-hub in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.x.x:3001
```

**Open in browser:**
- Visit http://localhost:3001
- You should see the RideWire AI Hub login page

### Production Mode

**Build the application:**
```bash
npm run build
```

**Start the production server:**
```bash
npm start
```

---

## 🧪 Testing

### Test the Routes
```bash
node scripts/test-links.js
```

### Manual Testing Checklist

Once the app is running, test these flows:

1. **Registration Flow**
   - Go to http://localhost:3001/register
   - Create a new account
   - Verify you're redirected to chat

2. **Login Flow**
   - Log out
   - Go to http://localhost:3001/login
   - Log in with your credentials
   - Verify you're redirected to dashboard

3. **Navigation**
   - Test all navigation links
   - Verify protected routes redirect to login when not authenticated
   - Check that 404 page shows for invalid routes

4. **Legal Disclaimer**
   - First time visiting /chat should show disclaimer modal
   - Accept disclaimer
   - Verify it doesn't show again

---

## 🛠️ Common Issues and Solutions

### Issue: "Port 3000 is already in use"

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=3001
```

### Issue: "Cannot connect to database"

**Solution:**
1. Check PostgreSQL is running:
   ```bash
   # Mac/Linux
   sudo service postgresql status
   
   # Or
   pg_ctl status
   ```

2. Verify DATABASE_URL in .env is correct
3. Check username and password are correct

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Issue: "Permission denied" errors

**Solution:**
```bash
# Fix npm permissions (Mac/Linux)
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# Or run with elevated permissions (not recommended)
sudo npm install
```

### Issue: API keys not working

**Solution:**
1. Verify .env file is in the root directory
2. Check there are no spaces around the `=` sign
3. Restart the server after changing .env
4. Make sure API keys are active on respective platforms

---

## 📝 Terminal Commands Reference

### Navigation
```bash
# List files in current directory
ls

# Change directory
cd folder_name

# Go up one directory
cd ..

# See current directory path
pwd

# Go to home directory
cd ~
```

### File Operations
```bash
# View file contents
cat filename.txt

# Edit file (nano)
nano filename.txt

# Edit file (vim)
vim filename.txt

# Copy file
cp source.txt destination.txt

# Move/rename file
mv old_name.txt new_name.txt

# Delete file
rm filename.txt
```

### Process Management
```bash
# See running processes
ps aux

# Kill process by PID
kill <PID>

# Kill process by name
pkill node

# Stop current process
Ctrl+C
```

### Git Commands
```bash
# Check status
git status

# Pull latest changes
git pull

# See commit history
git log

# Switch branches
git checkout branch_name
```

---

## 🎓 Terminal Basics for Beginners

### Opening Terminal

**Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

**Windows:**
- Press `Win + R`
- Type "cmd" or "powershell"
- Press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### Basic Terminal Tips

1. **Tab Completion:** Press `Tab` to auto-complete file/folder names
2. **Command History:** Press `Up Arrow` to see previous commands
3. **Clear Screen:** Type `clear` or press `Ctrl + L`
4. **Cancel Command:** Press `Ctrl + C` to stop a running command
5. **Copy/Paste:** 
   - Mac: `Cmd + C` and `Cmd + V`
   - Windows/Linux: `Ctrl + Shift + C` and `Ctrl + Shift + V`

---

## 🔐 Security Best Practices

1. **Never commit .env file to Git**
   - It contains secret API keys
   - Already in .gitignore

2. **Use strong passwords**
   - For database users
   - For JWT secrets (random 32+ characters)

3. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

4. **Secure API keys**
   - Never share them publicly
   - Rotate keys if compromised
   - Use environment variables, not hardcoded values

---

## 📞 Getting Help

### Documentation
- Check README.md for project overview
- See API documentation (coming soon)

### Support
- Email: support@stepheniesgem.io
- GitHub Issues: https://github.com/STEPHENIESGEM/ridewire-ai-hub/issues

### Troubleshooting Steps
1. Check error message carefully
2. Search for the error online
3. Check GitHub issues for similar problems
4. Ask for help with:
   - What you were trying to do
   - The exact error message
   - Your operating system
   - Node.js version

---

## ✅ Setup Checklist

- [ ] Node.js and npm installed
- [ ] PostgreSQL installed and running
- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] .env file created and configured
- [ ] Database created and schema loaded
- [ ] Legal migration applied
- [ ] Test script runs successfully
- [ ] Backend server starts without errors
- [ ] Frontend dev server starts successfully
- [ ] Can register new account
- [ ] Can login successfully
- [ ] All navigation links work
- [ ] Legal disclaimer shows on first /chat visit

---

*Last Updated: January 5, 2026*
*Version: 1.0.0*

**Need help?** Contact support@stepheniesgem.io
