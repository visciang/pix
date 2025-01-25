# pix

Pipelines for buildx.

## Introduction

Pix is a portable pipeline executor - a CI framework to define and execute pipelines that can run on any host with docker support.
Pipelines are defined as code and executed via docker `buildkit`.

## Basic concepts

### The pipeline

The pipeline is the core of the Pix framework.
It's just an instrumented docker multistage build programmatically defined via Elixir code (using the `Pix.Pipeline.SDK`).

### The pipeline executor

Pix generates the multistage docker build definition and execute it via `docker buildx build`.
The execution semantics (parallelism, cache, etc) are the same as a standard docker build.

## Installation

Pix can be installed nativelly as an elixir escript.

```bash
$ mix escript.install github visciang/pix ref vX.Y.Z
```

alternatively, you can use it as a docker image:

```bash
$ docker run --rm -it \
  --volume $PWD:/code --workdir /code \
  # docker outside of docker mode \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  # SSG forwarding \
  --volume $SSH_AUTH_SOCK:$SSH_AUTH_SOCK \
  --env SSH_AUTH_SOCK=$SSH_AUTH_SOCK \
  ghcr.io/visciang/pix:X.Y.Z
```

in this case is important to expose the docker daemon socket to the container with the `--volume` option and forward the SSH agent socket too (if you build need SSH access).

## Quick start

For this quick start, we will use pix project itself.
The pix project defines a pix pipeline that can be used to build and test pix itself.

The project is defined with a [.pix.exs](.pix.exs) file.

In the .pix.exs file, we setup a single pipelines - `pix` - with their default arguments and targets.
The pipeline definition is imported `from` a local `path` (in this case `.`, root directory).

In the root directory we have the [pipeline.exs](pipeline.exs) file that defines the pipeline.
The pipeline definition is composed of a set of targets, each target is a named docker stage.

To run the project pipeline, we can use the `pix run` command.

```bash
$ pix run pix
```

This will build the project, the docs, run the tests, etc..

The `pix ls` command can be used to list all the pipelines defined in the project.
Then the `pix graph` command can be used to generate a graph of a specific pipeline.

The Pix elixir documentation is built by the pipeline, run `pix run --output pix` to run the pipeline and output the produced artifacts to the current directory. The docs will be availbale under `.pipeline/output/doc/index.html`.

For more information about the available commands and their options, run `pix help`.
