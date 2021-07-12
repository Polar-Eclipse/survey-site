# Polar Survey

This is the repository of our group project.

## Extensions for VSCode

The following are recommended extensions to use when developing this
application.

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  : A very powerful tool to use when working with a git project.
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
  : Provides syntax highlighting for dotenv file format.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  : Runs the ESLint for you and show you any errors, warnings, or info.
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  : Tidy up your code in some ways so that you don't have to care about those.

## Getting Started

### Clone the repository

Use `git clone https://github.com/Polar-Eclipse/survey-site.git` command or your
preferred GUI to clone this repository onto your local machine.

### Install dependencies

Make sure to run `yarn --frozen-lockfile` command to install the dependencies to
your local machine. The `--frozen-lockfile` flag is to prevent yarn overwriting
the `yarn.lock` file.

### Before you run the app

There are certain environment variables needed for the app to run. We use
environment variables to keep our important information safe from the public.
This includes the database access URI and the secret passphrase for our session
cookies.

You need a `.env` file in the root directory of the project. Copy the contents
in the `.env.example` file into `.env` file. Fill in the values with appropriate
ones.

```conf
DB_URI="mongodb://uri_to/database"
SESSION_SECRET="a secure passphrase"
```

### Code styles

We are using ESLint in order to keep the code style consistent. Feel free to
make use of the VSCode suggestions feature. It'll help you fix the style issues
with a couple of mouse clicks.

### External documentation

Whenever you create a new Typescript, Javascript, CSS, or EJS file, make sure
you include the comment header. For Typescript, Javascript, and CSS files, you
can copy the contents in the `header.txt` file and edit accordingly. For EJS
files, you can copy the header from another EJS file and edit the description.

## How to Implement a New Feature

### Command Line

1. Check that you do not have any non-commited changes in your project directory
   using `git status`. If there are changes, make sure that you either save it
   by creating another commit or discard using `git checkout -- .`.
1. Use `git checkout main` in order to make sure you are on the main branch.
1. Ensure that you have the latest version of code using `git pull origin`. If
   problems happen because of merge conflicts, contact the lead software
   engineer.
1. Create a new branch using command `git branch <branch name>`. The branch
   name must be descriptive of the feature you are going to implement.
   (Examples: `user-model`, `login-logout`, `question-type-long-text`)
1. Move to your new branch by typing `git checkout <branch name>`.
1. Make your edits and commit the changes as frequently as you like.
1. When your implementation is ready, push your branch to the GitHub remote
   repository by using the command `git push -u origin <branch name>`. This will
   create a branch with the same name in the GitHub repository.
1. Move onto the [final steps](#final-steps-creating-a-pull-request).

### GitKraken, VSCode, or Any GUI

1. Make sure that your working directory is clean. Check for any staged files.
   If you see them, either create a new commit or discard the changes.
1. Move to the main branch. On VSCode, you can click on the current branch name
   at the bottom left the window to change the branch. On GitKraken, double
   click on the main branch name.
1. Make sure your local main branch is up to date with the remote main branch.
   On VSCode, click on the menu of the "Source Control" section in the "Source
   Control" tab. (It is **not** the menu for the tab. Look for the menu for the
   section.) Click on the "pull" option. On GitKraken, look for the "Pull"
   button in the bar at the top of the screen. If there are problems pulling
   from the remote, contact the lead software engineer.
1. Create a new branch from the updated main branch. On VSCode, click on the
   current branch name again, and click on the "Create new branch" option.
   The branch name must be descriptive of the feature you are going to
   implement.
   (Examples: `user-model`, `login-logout`, `question-type-long-text`)
1. Make sure you are on your newly created branch. Most GUI frontends will do
   this automatically, but double check just in case.
1. Make your edits and commit the changes as frequently as you like.
1. When your implementation is ready, push your branch to the GitHub remote
   repository. On VSCode, go to the menu of the "Source Control" tab again, and
   click on "Push" option. If a prompt comes up for the branch name, leave it
   as the same as the one you used for your local branch.
1. Move onto the [final steps](#final-steps-creating-a-pull-request).

### Final Steps (Creating a Pull Request)

1. Go to the GitHub repository page using your web browser.
1. Go into the "Pull requests" section.
1. Click on "New pull request" button.
1. Select `main` for the base branch and your new branch as the compare branch.
1. Click on "Create pull request" button. Do not panic if GitHub says that it
   cannot be automatically merged. You can still create the pull request.
1. Fill in the title and optionally a description of what you worked on.
1. Click "Create pull request" button again to finally create a pull request.
1. Wait for the feedback from other group members.
