# Deploy the concept on Vercel

This guide assumes you have already pushed the project to GitHub using `docs/GUIDE_VSCODE_AND_GITHUB.md`. Vercel reads the
repository directly from GitHub, so every later update is a `git push`.

## Before you start

- **Plan.** Vercel's free *Hobby* plan is intended for personal, non-commercial projects. If this concept is being used for a
  company pitch or any commercial purpose, check Vercel's current terms before deploying, and choose a paid plan if required.
- **Public URL.** A Vercel deployment is public by default. The site carries the banner *Not affiliated with Meesho · Synthetic
  data only*. Keep it.
- **No secrets.** The project needs no environment variables. Do not add any.

## Part 1. What Vercel will do

Vercel detects Next.js automatically. For this project it will:

1. install the exact packages recorded in `package-lock.json` (`npm ci`);
2. run `npm run build`, which produces a standard Next.js build;
3. serve the site at the root of its own address.

Vercel does **not** use the GitHub Pages export. That export is enabled only when the `GITHUB_PAGES` setting is `true`,
and you should not set it on Vercel. The project declares that it needs Node.js 20.9 or later, but the setting that actually
controls the version is the one you choose in Part 4.

## Part 2. Create a Vercel account

1. Go to https://vercel.com and choose **Sign Up**.
2. Choose **Continue with GitHub** and approve the request. Using your GitHub account makes importing the repository simpler.

## Part 3. Import the repository

1. On the Vercel dashboard, choose **Add New…**, then **Project**.
2. Under *Import Git Repository*, find `returnproof-concept` and choose **Import**.
3. If the repository is not listed, choose **Adjust GitHub App Permissions**, select *Only select repositories*, tick
   `returnproof-concept`, save, and return to the import page.

## Part 4. Configure the project

The configuration screen shows the settings below. For this project, leave almost everything at its default.

| Setting | What to choose |
|---|---|
| Project Name | `returnproof-concept`, or any name you prefer. This forms the first part of the address. |
| Framework Preset | **Next.js** (detected automatically; leave it) |
| Root Directory | `./` if the repository contains only the concept, which is what the GitHub guide produces. If you pushed the whole ReturnProof repository instead, choose the `concept` folder here. |
| Build and Output Settings | Leave the defaults. Do not override the build command, output directory or install command. |
| Environment Variables | **None.** Leave this section empty. |

Before deploying, check the Node.js version. Open **Settings → General** after the project is created, look for
**Node.js Version**, and choose **22.x** if it is not already set. The project was verified on Node 22. Vercel's
default may be a different version, so this check matters.

## Part 5. Deploy

1. Click **Deploy**.
2. Wait about one to two minutes. The build log shows *Installing dependencies*, *Running "npm run build"* and then
   *Build Completed*.
3. When the status shows **Ready**, click the preview image or the address shown under the project name. The address looks
   like `https://returnproof-concept.vercel.app` (the exact name may carry a suffix if the name was already taken).

## Part 6. Check the live site

Use the same checklist as the GitHub Pages guide:

- [ ] The banner is at the top and says *Not affiliated with Meesho · Synthetic data only*.
- [ ] Styles are present.
- [ ] The whole journey works, including Go back and Restart demo.
- [ ] The layout fits a phone width (**F12**, then the device toolbar).
- [ ] The console (**F12 → Console**) shows no red errors.

## Part 7. How updates work

Vercel deploys automatically from GitHub:

- A **push to `main`** creates a **Production** deployment, which is the address you share.
- A push to **any other branch** creates a **Preview** deployment with its own unique address. Use these to check changes before
  they reach `main`.
- A **pull request** also gets a preview address, and Vercel comments on it with the link.

To see the history, open the project and choose **Deployments**. If a production deployment causes a problem, open an older
successful deployment and choose the option to promote it to Production. The exact label may vary slightly with the dashboard
version.

## Part 8. Optional: your own domain

1. Open the project and go to **Settings → Domains**.
2. Enter your domain, for example `concept.example.com`, and choose **Add**.
3. Vercel shows the DNS records to create at your domain registrar. Add them, then wait for verification. This can take a
   few minutes to a few hours.

Skip this step if the default address is enough.

## Part 9. GitHub Pages and Vercel together

Both can run at the same time, but two live addresses can confuse people. Decide which one you share.

- To keep both, do nothing.
- To keep only Vercel, delete the file `.github/workflows/pages.yml` in the repository, commit with a message such as
  "Use Vercel only", and push. The Pages build stops running.

## Part 10. Alternative: deploy with the Vercel command line

This route was **not tested** in preparing this guide. It deploys your local files directly, so the GitHub connection above is
the better option for regular updates.

```bash
npm install -g vercel
vercel login                 # follow the prompt to sign in
cd returnproof-concept
vercel                       # creates a preview deployment and asks setup questions
vercel --prod                # publishes the production deployment
```

Answer the setup questions with the same choices as Part 4. When the command finishes, it prints the address.

## Part 11. Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Build fails at *Installing dependencies* | `package-lock.json` is out of step with `package.json` | Run `npm install` locally, commit the updated lockfile, push |
| Build fails with a Node.js version message | Vercel is using an unsupported version | Settings → General → Node.js Version → 22.x, then redeploy |
| "No Next.js version detected" or the wrong project shape | Root Directory is wrong | Settings → General → Root Directory; set `concept` if the repository holds the whole project |
| Build fails in `npm run build` but works locally | A difference in environment or a file not committed | Run `npm ci && npm run build` in a clean copy to reproduce; check nothing needed is in `.gitignore` |
| The repository does not appear when importing | GitHub App not allowed to see it | Adjust GitHub App Permissions and select the repository |
| A preview address asks you to log in | Vercel's deployment protection for previews | Check Settings → Deployment Protection; this is a setting, not a fault in the site |
| Production shows an old version | The latest push went to a branch other than `main` | Merge into `main`, or set the production branch in Settings → Git |
| Unstyled page at the Vercel address | None expected: Vercel serves the root path | If it happens, confirm the GITHUB_PAGES setting is not defined in Vercel's environment variables |

## Part 12. Things to be careful about

- Deployments are public. The same care applies as for the GitHub Pages site.
- Vercel analytics and similar features are off by default. Do not turn on analytics or session recording for a concept
  prototype without thinking about visitors' privacy.
- Avoid adding real customer or contact data to the project, even for testing.

## Summary of the sequence

1. Create a Vercel account with GitHub.
2. Add New → Project → Import `returnproof-concept`.
3. Keep the Next.js preset, root directory `./`, no environment variables; set Node.js to 22.x.
4. Deploy, then check the live address against the checklist.
5. Push to `main` to update production; use branches and pull requests for previews.
