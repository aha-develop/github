# GitHub for Aha! Develop

This is an extension for [Aha! Develop](https://www.aha.io/develop) providing integration with GitHub.

It provides these contributions:

- `Links attribute` - Link Aha! Develop records to GitHub branches and pull requests. See the status checks and approvals for the PR.
- `My Pull Requests` - A full page view of recent Pull Requests and branches.
- `Webhook` - Automatically links pull requests to records if the PR title starts with the record reference number.

The GitHub extension triggers events that other extensions can use for automation. For example, an extension can listen for the label event:

```js
aha.on({ event: 'aha-develop.github.pr.labeled' }, async ({ record, payload }) => {
  if (payload.label.name = 'documentation') {
    const task = new aha.models.Task();
    task.record = record;
    task.name = 'Write documentation';
    task.body = `Todo created from GitHub PR ${payload["pull_request"]["html_url"]}`;
    await task.save();
  }
});
```

## Working on the extension

Install `aha-cli`:

```sh
npm install -g aha-cli
```

Clone the repo:

```sh
git clone https://github.com/aha-develop/github.git
```

Install required modules:

```sh
yarn install
```

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Install the extension into Aha! and set up a watcher:

```sh
aha extension:install
aha extension:watch
```

Now, any change you make inside your working copy will automatically take effect in your Aha! account.

## Building

When you have finished working on your extension, package it into a `.gz` file so that others can install it:

```sh
aha extension:build
```

After building, you can upload the `.gz` file to a publicly accessible URL, such as a GitHub release, so that others can install it using that URL.

To learn more about developing Aha! Develop extensions, including the API reference, the full documentation is located here: [Aha! Develop Extension API](https://www.aha.io/support/develop/extensions)
