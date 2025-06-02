# Rebuild and deploy script for food-blog

# Step 1: Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

# Step 2: Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green

# If you're using gh-pages package:
# npm run deploy

# If you're manually deploying to GitHub Pages, push the dist folder
# cd dist
# git init
# git add .
# git commit -m "Deploy to GitHub Pages"
# git push -f https://github.com/your-username/food-blog.git main:gh-pages

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site should be available at: https://dongbaekdreams.github.io/food-blog/" -ForegroundColor Cyan 