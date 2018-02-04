## Development procedure

When developing the project, please use **Git flow**.

1. Clone the project
2. Make sure that your local repository contains three repositories: `develop`, `master`, `release`. You can check your local branches using `git branch`

#### Bash commands to fetch all remote branches to your local repository:

```
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

3. Run `git flow init` in the repository root. Correct configuration below:

```
git flow init

Which branch should be used for bringing forth production releases?
   - develop
   - master
Branch name for production releases: [master]

Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

### I want to create a new feature

`git flow feature start FEATURE-NAME` will create a new branch called `feature/FEATURE-NAME`, based on the `develop` branch.

Make your commits, and finalize the feature by running `git flow feature finish FEATURE-NAME`. This will merge the branch `feature/FEATURE-NAME` to `develop` branch.  **Note: you still need to push the `develop` branch to the server after merging the feature to `develop` !**

Optionally, you can push the branch to the server with command `git flow feature publish FEATURE-NAME` to allow other people to develop the feature. After this command, you can just run `git push` to push local changes to the remote feature branch.

### I want to create a new hotfix

`git flow hotfix start HOTFIX-VERSION` will create a hotfix branch based on the `master` branch.

Make your commits, and finalize the hotfix by running `git flow hotfix finish HOTFIX-VERSION`. This will merge the hotfix `master` branch.