# Step-by-step: run the concept in VS Code, then publish it to GitHub

This guide covers the **concept prototype** only (the `returnproof-concept` folder). It has no backend and no secrets.
If you want to run the full ReturnProof project instead, use the separate guide from the main project.

**What you will end with**

1. The prototype running on your computer at http://localhost:3100, edited in VS Code.
2. The prototype in a GitHub repository.
3. A public website at `https://<your-username>.github.io/<repository-name>/`, published automatically by GitHub Actions
   every time you push to `main`.

---

## Part 1. Decide before you start

| Decision | Recommendation |
|---|---|
| Repository name | `returnproof-concept`. The website address uses this name, so choose it now. |
| Public or private | **Public** if you want a free GitHub Pages website. GitHub Pages for a *private* repository needs a paid GitHub plan, and plan rules change, so check your plan first. |
| Website or repository only | If you only want the code on GitHub, you can skip Part 6 and the site will not be published. |
| Licence | Optional. Without a licence, others cannot legally reuse the code. Add one through GitHub later if you want. |

Before publishing, read the banner text the site shows: *Concept prototype · Not affiliated with Meesho · Synthetic data only*.
Keep that statement in any public version.

---

## Part 2. Install the tools (once)

### 2.1 Visual Studio Code
Download from https://code.visualstudio.com and install it.

### 2.2 Node.js 22 (or any version 20.9 or later)
The project was tested on Node 22. The easiest way to install and switch Node versions is **nvm**:

- **Windows:** install *nvm-windows* from https://github.com/coreybutler/nvm-windows/releases, then open a new PowerShell and run:
  ```powershell
  nvm install 22
  nvm use 22
  ```
- **macOS or Linux (including WSL):** install nvm, then open a new terminal and run:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  nvm install 22
  nvm use 22
  ```

Check it worked:
```bash
node -v      # should print v22.x.x
npm -v       # should print a 10.x or later number
```

### 2.3 Git
- **Windows:** download from https://git-scm.com, or run `winget install Git.Git` in PowerShell.
- **macOS:** run `xcode-select --install` in Terminal.
- **Linux or WSL:** run `sudo apt update && sudo apt install -y git`.

Check it:
```bash
git --version
```

### 2.4 Tell Git who you are (once)
Use the name and email address of the GitHub account you will publish from:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Part 3. Put the project in a folder

1. Download `returnproof-concept.zip`.
2. Extract it. You get one folder called `returnproof-concept`. Move that folder somewhere easy to find, for example
   `Documents/projects/returnproof-concept`.

   Do not open the zip file itself, and do not run anything from inside the zip.

The folder should contain `package.json`, `app/`, `components/`, `data/`, `tests/`, `docs/`, `.github/` and `README.md`
directly inside it. If you see a second `returnproof-concept` folder inside, you have extracted one level too deep.

---

## Part 4. Open the project in VS Code

1. Open VS Code.
2. **File → Open Folder…**, select the `returnproof-concept` folder, then click **Select Folder** (Windows) or **Open** (macOS).
3. If VS Code asks whether you trust the authors of the files, choose **Yes, I trust the authors**. You wrote or received this folder.
4. Open the integrated terminal: **Terminal → New Terminal**, or press `` Ctrl+` `` (`` Cmd+` `` on macOS).

Check that the terminal is inside the project:
```bash
pwd          # macOS or Linux: should end with /returnproof-concept
cd           # Windows PowerShell: prints the current folder
```

Make sure the terminal uses the right Node version. Run `node -v`. If it does not show v22 (or 20.9+), run `nvm use 22`.

> **Windows PowerShell note.** If `npm` fails with *running scripts is disabled on this system*, run this once, then try again:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
> This change affects only your user account and can be reversed with `Set-ExecutionPolicy -Scope CurrentUser Restricted`.

---

## Part 5. Run it locally

### 5.1 Install the packages (first time only, about one minute)
In the VS Code terminal:
```bash
npm install
```
You will see a long list of packages being added. Warnings about deprecated packages are normal and do not stop the install.
Wait until the prompt returns.

### 5.2 Start the development server
```bash
npm run dev
```
The terminal should print `Ready` and show `http://localhost:3100`. Hold **Ctrl** (or **Cmd**) and click the address, or open
http://localhost:3100 in your browser yourself.

You should see the order details screen with the banner at the top. Go through the journey:

1. **View return details** → look at the timeline.
2. **Pickup details** → read the explanation.
3. **Show pickup details** → expands the extra information.
4. **Get help with this return** → edit the pre-filled message if you like → **Review summary** → **Confirm and prepare summary**.
5. **Go back** buttons move back one screen. **Restart demo** in the banner clears everything.

Leave the server running while you work. Changes you save in VS Code appear in the browser automatically.

To stop the server, click the terminal and press **Ctrl+C**.

### 5.2a Warnings you may see, and what they mean

The version of this project in the repository has these fixes already applied. If you still see one of the messages below,
your copy is older than the version described here.

- **"N vulnerabilities" after `npm install`.** The earlier version had a known problem in the test tool Vitest. The
  packages involved run only when you run tests on your computer. They are not part of the website visitors see. The
  current version is fixed. Check with `npm audit`, which should print *found 0 vulnerabilities*. Avoid running
  `npm audit fix --force` yourself: it can install major version changes that break the tests.
- **"Your Vite config uses features that are unsupported by configLoader native".** The test configuration file must be
  named `vitest.config.mts`. If you still have `vitest.config.ts`, rename it. The warning then disappears.
- **"A tree hydrated but some attributes of the server rendered HTML didn't match".** The message names an attribute on the
  `<html>` element, such as `data-qb-installed`. Browser extensions add attributes like this, so the mismatch comes from
  your browser, not from the prototype's content. The current version tells React to tolerate differences on that one
  element. To confirm, open http://localhost:3100 in a private window with extensions turned off. The message should not
  appear.
- **"Slow filesystem detected".** A speed hint, not an error. It usually means the folder is on a network or external
  drive, or is scanned in real time by security software. The server still works. To speed it up, move the folder to a
  local drive, such as C:\Users\<you>\Documents\returnproof-concept, and close and reopen VS Code.

### 5.3 Run the checks
```bash
npm run typecheck    # strict TypeScript: should finish with no output
npm test             # nine tests: should end with "9 passed"
```

### 5.4 Optional: run the production build locally
```bash
npm run build
npm run start        # http://localhost:3100
```
Stop it with **Ctrl+C**.

---

## Part 6. Create the GitHub repository

### 6.1 Create a GitHub account
If you do not have one, sign up at https://github.com. Confirm your email address; GitHub will not let you publish until you do.

### 6.2 Create an empty repository
1. Sign in to GitHub. Click the **+** at the top right → **New repository**.
2. **Repository name:** `returnproof-concept` (must match Part 1 if you want the website).
3. **Description:** `Concept prototype, not affiliated with Meesho. Synthetic data only.`
4. **Public** or **Private**, as decided in Part 1.
5. **Important:** leave *Add a README file*, *Add .gitignore* and *Choose a license* **unchecked**. The project already has
   these files, and a README on GitHub would conflict with the one you have.
6. Click **Create repository**. Leave the page open; you will need the address shown on it.

---

## Part 7. Commit the project locally

You can do this in the terminal (Part 7A) or in VS Code's Source Control panel (Part 7B). Both produce the same result.

### 7A. Terminal method
In the VS Code terminal, inside the `returnproof-concept` folder:
```bash
git init -b main
git add .
git status --short
```
Check the output of `git status --short`. It should list files such as `package.json`, `package-lock.json`, `app/...`,
`.github/workflows/pages.yml`. It must **not** list `node_modules/`, `.next/`, `out/` or `next-env.d.ts`. Those are ignored by
the `.gitignore` file. If you see `node_modules` listed, stop and check that you are in the right folder.

Then save the first version:
```bash
git commit -m "Initial concept prototype"
```

Check it:
```bash
git log --oneline
```
You should see one commit.

### 7B. VS Code method
1. Click the **Source Control** icon in the left bar (it looks like branching lines), or press `Ctrl+Shift+G` (`Cmd+Shift+G`).
2. Click **Initialize Repository**. Choose the `returnproof-concept` folder if asked.
3. The list of changed files appears. Click **+** next to *Changes* to stage everything. Check that `node_modules` is not listed.
4. Type `Initial concept prototype` in the message box, then click the tick ✓ **Commit**.

---

## Part 8. Publish the repository to GitHub

You need to prove to GitHub that you are allowed to upload. GitHub no longer accepts your account password for this.
Use **one** of the three methods below.

### 8A. VS Code sign-in (use this only if you did NOT create the empty repository in Part 6)
1. In the Source Control panel, click **Publish Branch**.
2. VS Code asks you to sign in to GitHub. Follow the prompt to sign in with your browser and return to VS Code.
3. Choose whether the new repository should be private or public, to match Part 1. VS Code creates the repository for you,
   with the name of the folder.

If you already created the empty repository in Part 6, do **not** use this option, because it would create a second one.
Use 8B instead.

### 8B. Terminal method (you already created the empty repository)
Replace `YOUR-USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR-USERNAME/returnproof-concept.git
git push -u origin main
```
The first time, Git asks you to sign in. Choose the GitHub browser sign-in if it offers it. Otherwise create a
**fine-grained personal access token** (GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens),
give it *Contents: Read and write* for this repository, and paste it when Git asks for a password.

### 8C. GitHub CLI (optional, not tested in this project)
If you install the GitHub CLI (`gh`), you can sign in with `gh auth login` and create and push in one command:
```bash
gh repo create returnproof-concept --public --source=. --remote=origin --push
```
Use `--private` instead of `--public` if you chose a private repository. Check the output carefully; this path was not
run in preparing this guide.

---

## Part 9. Check the repository on GitHub

Open `https://github.com/YOUR-USERNAME/returnproof-concept` and check:

- The file list matches what you expect, including the `.github` folder and `docs/`.
- There is **no** `node_modules` folder.
- The README shows the banner text and the start instructions.
- The commit shows `Initial concept prototype`.

If `node_modules` appears on GitHub, do not continue. Remove it and push again:
```bash
git rm -r --cached node_modules
git commit -m "Stop tracking node_modules"
git push
```

---

## Part 10. Turn on the website (GitHub Pages)

The file `.github/workflows/pages.yml` is already in the project. Pushing to `main` runs it automatically. You only need to
tell GitHub to use it.

1. On your repository page, click **Settings** (the tab on the far right).
2. In the left menu, click **Pages**.
3. Under **Build and deployment**, open **Source** and choose **GitHub Actions**. Do not choose a branch.
4. Click the **Actions** tab. You should see a run called **Deploy concept to GitHub Pages**. Wait for it to finish; it takes
   about one to two minutes. Two stages appear: *build* and *deploy*. Both should show a green tick.
5. Go back to **Settings → Pages**. The page now shows *Your site is live at* followed by the address.

The address is:
```
https://YOUR-USERNAME.github.io/returnproof-concept/
```
Keep the final slash.

If the first run fails, the cause is almost always one of the items in Part 12. Fix the problem, then push a new commit or
open the Actions tab and click **Run workflow**.

---

## Part 11. Check the live site

Open the address in a normal browser window, then check:

- [ ] The purple banner is at the top and says *Not affiliated with Meesho · Synthetic data only*.
- [ ] Styles are present (coloured buttons, cards). If the page is plain black text, see Part 12.
- [ ] The whole journey works: order → return details → pickup details → help → confirmation → back → restart.
- [ ] Open it on a phone, or press **F12** and use the device toolbar to narrow the window. The layout should fit the width.
- [ ] Open the browser console (**F12 → Console**). There should be no red errors on any screen.
- [ ] Open the address in a private window to check it is public.

This check is the one part of the prototype that has not been performed by anyone yet. Report anything that looks wrong; it is
much cheaper to fix now than after you share the link.

---

## Part 12. Updating the site later

Every change you make is published by repeating the same steps:

1. Edit files in VS Code. Check them locally with `npm run dev` and `npm test`.
2. Source Control panel → **+** to stage → type a message → **Commit**.
3. Click **Sync Changes** (or **Push**) in the Source Control panel, or run `git push` in the terminal.
4. Wait for the **Actions** tab to show a green tick. The live site updates a minute or two later.

---

## Part 13. Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `npm: command not found` | Node is not installed, or the terminal was opened before installing it | Install Node (Part 2.2), close the terminal, open a new one |
| `npm.ps1 cannot be loaded… scripts disabled` (Windows) | PowerShell execution policy | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (Part 4) |
| `Port 3100 is already in use` | Another copy of the prototype is running | Stop the other terminal with Ctrl+C, or find the process using port 3100 and stop it |
| Browser shows an error after `npm run dev` | Node version too old | `node -v`; use `nvm use 22` |
| `git: command not found` | Git not installed | Part 2.3, then restart VS Code |
| `Permission denied (publickey)` or `Authentication failed` | Git is not signed in to GitHub | Use Part 8A or 8B's token method |
| `Updates were rejected because the remote contains work` | The repository was created with a README | Delete the GitHub repository and create it again following Part 6, leaving the boxes unchecked |
| `node_modules` shows up on GitHub | The project was committed before the `.gitignore` existed | Follow the fix at the end of Part 9 |
| Actions run fails at *Install exact dependencies* | `package-lock.json` is out of step with `package.json` | Run `npm install` locally, commit the updated `package-lock.json`, push again |
| Actions run fails at *Run the journey tests* | A test fails locally too | Run `npm test` locally and fix the failure before pushing |
| The live site is plain text with no styles | The site was built without the repository path | Check the repository name is exactly `returnproof-concept`; the workflow builds the path from the name automatically |
| The live address shows *404* | GitHub Pages source is not set to GitHub Actions, or the first deployment has not finished | Part 10, step 3; wait for the Actions run to finish |
| Pages settings say a paid plan is required | The repository is private | Make the repository public (Settings → General → Danger Zone → Change visibility), or keep it private and do not publish the site |

---

## Part 14. Things to be careful about when publishing

- **Public means public.** Anyone with the address can see the site and the full code.
- **No secrets.** The project has no passwords, keys or `.env` file. Do not add any. The `.gitignore` already excludes `.env`
  files, but check `git status` before each commit anyway.
- **Keep the statements.** The banner states the prototype is not affiliated with Meesho and uses synthetic data. Keep that
  wording if the site is shared.
- **Brand use.** The visual style is inspired by Meesho's public website, and no logo or photographs are used. Whether a public
  Meesho-styled page is appropriate for your situation is your decision; this guide does not give legal advice.
- **Nothing here is connected to any real system.** The site makes no network calls to Meesho or anyone else.

---

## Appendix: command summary

```bash
# Local
cd returnproof-concept
npm install
npm run dev                 # http://localhost:3100
npm test                    # 9 journey and support tests
npm run typecheck

# First publish (after creating an empty GitHub repository)
git init -b main
git add .
git commit -m "Initial concept prototype"
git remote add origin https://github.com/YOUR-USERNAME/returnproof-concept.git
git push -u origin main

# Every later update
git add .
git commit -m "Describe the change"
git push

# Live site
https://YOUR-USERNAME.github.io/returnproof-concept/
```
