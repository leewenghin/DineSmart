## DineSmart

- clone your repository
- run "npm -i"
- ng serve

## Multi People Git Condition - Stash your changes

If you're not ready to commit your changes but want to temporarily save them, you can stash your changes. Stashing allows you to save your changes and apply them later. Here's how you can do it:
**Using CMD / Powershell**

1. **Stash your changes:**

- git stash

2. **Merge changes from another branch (if necessary, e.g., merging changes from origin/master):**

- git merge branch_name (e.g., git merge origin/master)

3. **Apply your stashed changes:**

- git stash apply

## Ignore `__pycache__` folder in version control

**Remove Existing __pycache__ Directory**

- git rm -r --cached **pycache**
- git commit -m "Remove **pycache** from version control"

**Update .gitignore and Commit**

- git add .gitignore
- git commit -m "Update .gitignore to ignore **pycache**"
