# Update Your Global Nx Installation

There are some cases where an issue could arise when using an outdated global installation of Nx. If the structure of your Nx workspace no longer matches up with what the globally installed copy of Nx expects, it may fail to hand off to your local installation properly and instead error. This commonly results in errors such as:

- `Could not find Nx modules in this workspace.`
- `The current directory isn't part of an Nx workspace.`

If you find yourself in this position, you will need to update your global install of Nx.

In most cases, you can update a globally installed npm package by rerunning the command you used to install it, as described [above](#installing-nx-globally)

If you cannot remember which package manager you installed Nx globally with or are still encountering issues, you can locate other installs of Nx with these commands:

{% tabs %}
{% tab label="npm" %}

```shell
npm list --global nx
```

{% /tab %}
{% tab label="yarn" %}

```shell
yarn global list nx
```

{% /tab %}
{% tab label="pnpm" %}

```shell
pnpm list --global nx
```

{% /tab %}
{% /tabs %}

{% callout type="note" title="Older Global Installations" %}

In prior versions, Nx could be installed globally via `@nrwl/cli` or `@nrwl/tao`. If you are seeing these warnings but cannot find other global installations of Nx via the above commands, you should look for these packages as well. In general, you should remove these and install the latest version of `nx` instead.

{% /callout %}

You can then remove the extra global installations by running the following commands for the duplicate installations:

{% tabs %}
{% tab label="npm" %}

```shell
npm rm --global nx @nrwl/cli @nrwl/tao
```

{% /tab %}
{% tab label="yarn" %}

```shell
yarn global remove nx @nrwl/cli @nrwl/tao
```

{% /tab %}
{% tab label="pnpm" %}

```shell
pnpm rm --global nx @nrwl/cli @nrwl/tao
```

{% /tab %}
{% /tabs %}

Finally, to complete your global installation update, simply reinstall it as described [above](#installing-nx-globally).
