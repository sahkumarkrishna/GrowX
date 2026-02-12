# GrowX - Deployment Guide for Render

## 🚀 Quick Deploy to Render

### Prerequisites
- GitHub account
- Render account (free tier available)
- MongoDB Atlas database

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure the service:**
   - **Name:** `growx`
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Runtime:** Node
   - **Build Command:** 
     ```
     npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
     ```
   - **Start Command:** 
     ```
     npm start --prefix backend
     ```
   - **Plan:** Free

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables from your `backend/.env`:
   ```
   PORT=8000
   NODE_ENV=production
   MONGO_URI=<your-mongodb-atlas-uri>
   SECRET_KEY=<your-secret-key>
   CLOUD_NAME=<your-cloudinary-name>
   API_KEY=<your-cloudinary-api-key>
   API_SECRET=<your-cloudinary-api-secret>
   ADMIN_EMAIL=<your-admin-email>
   ADMIN_PASSWORD=<your-admin-password>
   FRONTEND_URL=https://growx.onrender.com
   ```

6. **Click "Create Web Service"**

### Step 3: Wait for Deployment
- Render will automatically build and deploy your app
- First deployment takes 5-10 minutes
- You'll get a URL like: `https://growx.onrender.com`

### Step 4: Update Frontend URLs (if needed)
If your Render URL is different, update `frontend/.env.production`:
```env
VITE_USER_API=https://your-app-name.onrender.com/api/v1/user
# ... update all other URLs
```

### Step 5: Create Admin User
After deployment, run the seed script once:
```bash
# SSH into Render or use Render Shell
cd backend
node seedAdmin.js
```

## 📝 Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

### MongoDB Atlas Setup
1. Whitelist Render IPs: `0.0.0.0/0` (all IPs)
2. Use connection string with password encoded
3. Enable "Connect from anywhere" in Network Access

### Custom Domain (Optional)
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies in package.json
- Ensure Node version compatibility

### App Not Loading
- Check if MongoDB connection is successful
- Verify environment variables are set correctly
- Check application logs in Render dashboard

### CORS Errors
- Ensure FRONTEND_URL is set correctly
- Check CORS configuration in backend/index.js

## 🎉 Success!
Your app should now be live at: `https://growx.onrender.com`

### Test URLs:
- Frontend: `https://growx.onrender.com`
- Admin Login: `https://growx.onrender.com/admin/login`
- API Health: `https://growx.onrender.com/api/v1/user`

## 📞 Support
For issues, check:
- Render Logs: Dashboard → Logs
- MongoDB Atlas: Metrics & Logs
- Browser Console: Network & Console tabs
