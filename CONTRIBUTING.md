# Issues

## How to open an Issue?

* Check if your issue is already opened, do not open duplicate issues!
* Write your title clear and concise.
* Write detailed and understandable details in the description.
* Select appropriate assignees, labels, projects, milestones for the issue.

## How to Label an Issue?

### **Platform Labels**
* `Platform: Documentation` This Issue represents to the Documentation parts of the project.
* `Platform: Backend` The Issue represents to the backend parts of the project.
* `Platform: Frontend` The Issue represents to the frontend parts of the project.

### **Priority Labels**
* `Priority: Critical` 
* `Priority: High`
* `Priority: Low` 
* `Priority: Medium`
#### NOTE: These are the priority level of issues.

### **Status Labels**
* `Status: Abandoned` The Issue is not related to anyting about the project or the repository. (e.g. It was opened for misuderstood or etc.)
* `Status: Accepted` Assignees of the Issue accepted to work on the related issue.
* `Status: Blocked` The job blocked because of this issue.
* `Status: Dublicate`  Some time another Issue for the purpose of this one has already been opened (and maybe has been closed).
* `Status: Help Needed`  Assignees of the Issue need a help for the Issue.
* `Status: Invalid` Assignees of the Issue solved it. This is generally shows that the Issue should be closed.
* `Status: Review Needed` Assignees of the Issue need a review for the Issue.
* `Status: Revision Needed`  Assignees of the Issue need a revision for the Issue.

### **Type Labels**
* `Type:Bug` There is a bug in the specified part(s) of the project.
* `Type:Code Review`  A code review about the project related part(s).
* `Type:Configuration` A new feature needs to be (or will be) designed/implemented in the project.
* `Type:Costumer Review`  A question about the project or the repository related part(s).
* `Type:Enhancement` Some enhancement needs to be (or will be) done to the specified part(s) of the project.
* `Type:Maintenance`  A maintenance about the project or the repository related part(s).
* `Type:Meeting`  A meeting about the project or the repository related part(s).
* `Type:Question` A question about the project or the repository related part(s).

## How to Close an Issue?
* Always close issues by giving an explanation.
* Commenting on future considerations would be an optional good practice.
* Summarizing the resolution of the issue would be an optional good practice.

## **Additional Resources**

[GitHub Issues](https://guides.github.com/features/issues/)
              
[GitHub Developer Issues ](https://developer.github.com/v3/issues/)

[Issue Formatting](https://help.github.com/articles/working-with-advanced-formatting/)

# Commits 

Similar to how events build history in time, commits builds our software in time. As historians tries to understand specifics of a single event with great effort, we have all the opportunity to escape those efforts and help ourselves read our history a lot easier.

## Syntax

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Example

```
fix(middleware): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Fixes #2310
```

### Types

* feat (new feature for the user, not a new feature for build script)
* fix (bug fix for the user, not a fix to a build script)
* docs (changes to the documentation)
* style (formatting, missing semi colons, etc; no production code change)
* refactor (refactoring production code, eg. renaming a variable)
* test (adding missing tests, refactoring tests; no production code change)
* chore (updating grunt tasks etc; no production code change)

### Subject

* The first line cannot be longer than 70 characters. (including type and scope)
* The type and scope should always be lowercase as shown below. 
* The scope can be empty (e.g. if the change is a global or difficult to assign to a single component).
* Use the imperative, present tense: **change** not _changed_ nor _changes_.
* Do not capitalize subject line (if it's not a special name).
* Do not end subject line with a dot.
* Refer files with fullname such as `README.md`
* You can refer to issues _at the end_ such as `docs(templates): enumerate items of MEETING.md (#27)`

### Body

* The second line is always blank.
* All other lines should be wrapped at 80 characters. 
* Include motivation for the change and contrasts with previous behavior.

### Footer

* Reference issues if needed as `Closes #234`, `Fixes #212`.
* Breaking changes should be noted.

## Semantics

* First of all remember that syntax style of commits devised to help you in semantics as well.
* Try to be _**modular**_. For example, if you can't decide what the `type` of the commit is then you should divide it into seperate parts.
* Make sure that every change in the commit is towards _**a single goal**_. Do not jumble two separate task related changes into one commit.

# Workflow

When working with a team on a `Git` managed project, it’s important to make sure the team is all in agreement on how the flow of changes will be applied. A `Git Workflow` is a recipe or recommendation for how to use `Git` to accomplish work in a **consistent** and **productive** manner. Git workflows encourage users to leverage Git **effectively** and **consistently**.


### Feature Branch Model
* Create branch for any feature, fix, issue with meaningful names.
* Try to preserve good quality of history for even the smallest branches.
* Use pull requests to submit final changes.

### Rebase Merging
* Don't directly use `merge` command, **merge commits are not allowed**.
* `Rebase` and then resolve conflicts in _your branch_, **changing master history is not allowed**.
