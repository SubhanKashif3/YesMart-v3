# Navigate to your repository
Set-Location ./

# Stage all changes
git add .

# Take user input for the commit message
$commitMessage = Read-Host -Prompt "Enter your commit message"

# Commit with the provided message
git commit -m $commitMessage

# Push changes to the main branch of the origin remote
git push -v origin main
