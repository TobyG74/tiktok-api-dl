# HOW TO CONTRIBUTE

We welcome contributions to this project. Please read the following guidelines.

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/TobyG74/tiktok-api-dl/issues)

## How to contribute

### Step 1: Fork this repository

- Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.

### Step 2: Clone the repository

- Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the copy to clipboard icon.
- Open a terminal and run the following git command:

```bash
git clone https://github.com/your-username/tiktok-api-dl.git
```

### Step 3: Create a branch

- Change to the repository directory on your computer (if you are not already there):

```bash
cd tiktok-api-dl
```

- Now create a branch using the git checkout command:

```bash
git checkout -b your-new-branch-name
```

### Step 4: Make changes

- Make the changes in the code as per the requirements mentioned in the issue.

### Step 5: Commit all your changes

- Now add the changes to the branch you just created using the git add command:

```bash
git add .
```

- Now commit those changes using the git commit command:

```bash
git commit -m "Your commit message"
```

#### Git Commit Message

We structure our commit messages like this:

```bash
feat: add new feature
fix: correct a bug
docs: document changes
style: formatting, missing semi colons, etc; no code change
refactor: refactoring production code
test: adding tests, refactoring test; no production code change
chore: updating build tasks, package manager configs, etc; no production code change
```

Example:

```bash
git commit -m "fix: bug in TiktokAPI.ts file"
```

### Step 6: Push changes to GitHub

- Push your changes using the command git push:

```bash
git push origin your-branch-name
```

### Step 7: Submit your changes for review

- If you go to your repository on GitHub, you'll see a Compare & pull request button. Click on that button.
- Now submit the pull request.

## Code of Conduct

Please read our [Code of Conduct](https://github.com/TobyG74/tiktok-api-dl/blob/master/CODE_OF_CONDUCT.md) before contributing.

## License

By contributing to tiktok-api-dl, you agree that your contributions will be licensed under its MIT license.
