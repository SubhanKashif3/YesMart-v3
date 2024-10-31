# Navigate to your repository
cd ./

# Stage all changes
git add .

# Take user input for the commit message
read -p "Enter your commit message: " commitMessage

# Commit with the provided message
git commit -m "$commitMessage"

# Push changes to the main branch of the origin remote
git push -v origin main
