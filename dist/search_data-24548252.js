searchData={"items":[{"type":"module","doc":"Configuration module.","title":"Pix.Config","ref":"Pix.Config.html"},{"type":"type","doc":"","title":"Pix.Config.arch/0","ref":"Pix.Config.html#t:arch/0"},{"type":"type","doc":"","title":"Pix.Config.args/0","ref":"Pix.Config.html#t:args/0"},{"type":"type","doc":"","title":"Pix.Config.from/0","ref":"Pix.Config.html#t:from/0"},{"type":"type","doc":"","title":"Pix.Config.from_git/0","ref":"Pix.Config.html#t:from_git/0"},{"type":"type","doc":"","title":"Pix.Config.from_path/0","ref":"Pix.Config.html#t:from_path/0"},{"type":"function","doc":"","title":"Pix.Config.get/0","ref":"Pix.Config.html#get/0"},{"type":"type","doc":"","title":"Pix.Config.pipeline/0","ref":"Pix.Config.html#t:pipeline/0"},{"type":"type","doc":"","title":"Pix.Config.pipeline_alias/0","ref":"Pix.Config.html#t:pipeline_alias/0"},{"type":"type","doc":"","title":"Pix.Config.pix_exs/0","ref":"Pix.Config.html#t:pix_exs/0"},{"type":"type","doc":"","title":"Pix.Config.pix_exs_pipeline/0","ref":"Pix.Config.html#t:pix_exs_pipeline/0"},{"type":"type","doc":"","title":"Pix.Config.supported_arch/0","ref":"Pix.Config.html#t:supported_arch/0"},{"type":"type","doc":"","title":"Pix.Config.t/0","ref":"Pix.Config.html#t:t/0"},{"type":"module","doc":"Environment information.","title":"Pix.Env","ref":"Pix.Env.html"},{"type":"function","doc":"","title":"Pix.Env.arch/0","ref":"Pix.Env.html#arch/0"},{"type":"function","doc":"","title":"Pix.Env.ci?/0","ref":"Pix.Env.html#ci?/0"},{"type":"function","doc":"","title":"Pix.Env.git_commit_sha/0","ref":"Pix.Env.html#git_commit_sha/0"},{"type":"function","doc":"","title":"Pix.Env.git_project_name/0","ref":"Pix.Env.html#git_project_name/0"},{"type":"function","doc":"","title":"Pix.Env.pix_docker_build_opts/0","ref":"Pix.Env.html#pix_docker_build_opts/0"},{"type":"function","doc":"","title":"Pix.Env.pix_docker_run_opts/0","ref":"Pix.Env.html#pix_docker_run_opts/0"},{"type":"behaviour","doc":"Defines Pix pipeline projects.\n\nA Pix pipeline project is defined by calling `use Pix.Pipeline.Project` in a module placed in `pipeline.exs`:\n\n```elixir\ndefmodule MyApp.Pipeline do\n  use Pix.Pipeline.Project\n  import Pix.Pipeline.SDK\n\n  @impl true\n  def pipeline() do\n    pipeline(\"myapp\",\n      description: \"MyApp pipeline\",\n      dockerignore: [\".git\", \"_build\", \"deps\"]\n    )\n    |> stage(\"base\", from: \"alpine:3.18\")\n    |> run(\"apk add --no-cache git\")\n    |> stage(\"build\", from: \"elixir:1.15\")\n    |> arg(\"MIX_ENV\", \"prod\")\n    |> copy(\"mix.exs\", \".\")\n    |> run(\"mix deps.get\")\n    |> copy(\"lib\", \"lib\")\n    |> run(\"mix compile\")\n    |> output(\"/app/_build\")\n  end\n\n  @impl true\n  def shell(pipeline, shell_stage, from_target) do\n    pipeline\n    |> stage(shell_stage, from: from_target)\n    |> run(\"apk add --no-cache bash\")\n    |> cmd(\"bash\")\n  end\nend\n```","title":"Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html"},{"type":"behaviour","doc":"A pipeline project must implement the `c:pipeline/0` callback to define the pipeline stages and instructions.\nThe pipeline is built using the `Pix.Pipeline.SDK` module which provides a fluent API for:\n\n- Creating pipeline stages\n- Adding Docker instructions (RUN, COPY, ARG etc)\n- Defining outputs\n- Setting build arguments\n- Configuring .dockerignore","title":"Pipeline Definition - Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html#module-pipeline-definition"},{"type":"behaviour","doc":"Optionally, a pipeline can implement the `c:shell/3` callback to provide an interactive shell environment.\nThe shell callback receives:\n\n- The pipeline definition\n- The shell stage name\n- The target stage to base the shell from (or :default)\n\nThis enables debugging and interactive development within pipeline stages.","title":"Shell Support - Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html#module-shell-support"},{"type":"behaviour","doc":"Each stage in a pipeline:\n\n- Has a unique name\n- Can be marked as private\n- Can enable/disable caching\n- Can define outputs\n- Can have stage-specific build arguments","title":"Pipeline Stages - Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html#module-pipeline-stages"},{"type":"behaviour","doc":"The `Pix.Pipeline.SDK` module provides a complete API for building Dockerfiles programmatically:\n\n- Stage management (FROM)\n- File operations (COPY, ADD)\n- Command execution (RUN, CMD)\n- Environment setup (ENV, ARG)\n- Output artifacts\n- And more every other Docker instruction","title":"Pipeline SDK - Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html#module-pipeline-sdk"},{"type":"behaviour","doc":"When using the `Pix.Pipeline.SDK.copy/3` function, it's possible to specify a context directory to copy from.\nTo copy files from the directory where the pipeline is defined (the directory where the `pipeline.exs` file is located),\nuse `copy(src, dest, from: pipeline_ctx()`.\n\n\nSee `Pix.Pipeline.SDK` for the complete API reference.","title":"Pipeline COPY context - Pix.Pipeline.Project","ref":"Pix.Pipeline.Project.html#module-pipeline-copy-context"},{"type":"callback","doc":"","title":"Pix.Pipeline.Project.pipeline/0","ref":"Pix.Pipeline.Project.html#c:pipeline/0"},{"type":"callback","doc":"","title":"Pix.Pipeline.Project.shell/3","ref":"Pix.Pipeline.Project.html#c:shell/3"},{"type":"type","doc":"","title":"Pix.Pipeline.Project.t/0","ref":"Pix.Pipeline.Project.html#t:t/0"},{"type":"module","doc":"Provides APIs for building Dockerfiles pipelines programmatically.\n\nThe names of the functions map to the [Dockerfile](https://docs.docker.com/engine/reference/builder/) commands.\nSome of the functions have additional options to extend the functionality of the commands (eg. `private` and `cache` in `stage/2`)\nand some functions are extension to the commands (eg. `output/2`).\n\nFor example:\n\n```elixir\nimport Pix.Pipeline.SDK\n\npipeline =\n  pipeline(\"gohello\", description: \"My pipeline description\")\n  |> stage(\"build\", from: \"golang:1.23\", private: true)\n  |> copy(\"hello.go\", \".\")\n  |> run(\"go build -o hello hello.go\")\n  |> stage(\"app\", from: \"scratch\")\n  |> copy(\"hello\", \".\", from: \"build\")\n  |> cmd([\"/hello\"])\n\npipeline\n|> dump()\n|> IO.puts()\n```","title":"Pix.Pipeline.SDK","ref":"Pix.Pipeline.SDK.html"},{"type":"module","doc":"```Dockerfile\nFROM golang:1.23 AS build\nCOPY hello.go .\nRUN go build -o hello hello.go\n\nFROM scratch AS app\nCOPY --from=\"build\" hello .\nCMD [\"/hello\"]\n```","title":"Output - Pix.Pipeline.SDK","ref":"Pix.Pipeline.SDK.html#module-output"},{"type":"function","doc":"Adds a [`ADD`](https://docs.docker.com/reference/dockerfile/#add) instruction.","title":"Pix.Pipeline.SDK.add/4","ref":"Pix.Pipeline.SDK.html#add/4"},{"type":"function","doc":"Adds a [`ARG`](https://docs.docker.com/reference/dockerfile/#arg) instruction in a stage scope.","title":"Pix.Pipeline.SDK.arg/3","ref":"Pix.Pipeline.SDK.html#arg/3"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.args/0","ref":"Pix.Pipeline.SDK.html#t:args/0"},{"type":"function","doc":"Adds a [`CMD`](https://docs.docker.com/reference/dockerfile/#cmd) instruction.","title":"Pix.Pipeline.SDK.cmd/2","ref":"Pix.Pipeline.SDK.html#cmd/2"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.command/0","ref":"Pix.Pipeline.SDK.html#t:command/0"},{"type":"function","doc":"Adds a [`COPY`](https://docs.docker.com/reference/dockerfile/#copy) instruction.","title":"Pix.Pipeline.SDK.copy/4","ref":"Pix.Pipeline.SDK.html#copy/4"},{"type":"function","doc":"Converts the Dockerfile into a string representation.","title":"Pix.Pipeline.SDK.dump/1","ref":"Pix.Pipeline.SDK.html#dump/1"},{"type":"function","doc":"Adds a [`ENTRYPOINT`](https://docs.docker.com/reference/dockerfile/#entrypoint) instruction.","title":"Pix.Pipeline.SDK.entrypoint/2","ref":"Pix.Pipeline.SDK.html#entrypoint/2"},{"type":"function","doc":"Adds a [`ENV`](https://docs.docker.com/reference/dockerfile/#env) instruction.","title":"Pix.Pipeline.SDK.env/2","ref":"Pix.Pipeline.SDK.html#env/2"},{"type":"function","doc":"Adds a [`EXPOSE`](https://docs.docker.com/reference/dockerfile/#expose) instruction.","title":"Pix.Pipeline.SDK.expose/2","ref":"Pix.Pipeline.SDK.html#expose/2"},{"type":"function","doc":"Adds a [`ARG`](https://docs.docker.com/reference/dockerfile/#arg) instruction in the global scope.","title":"Pix.Pipeline.SDK.global_arg/3","ref":"Pix.Pipeline.SDK.html#global_arg/3"},{"type":"function","doc":"Adds a [`HEALTHCHECK`](https://docs.docker.com/reference/dockerfile/#healthcheck) instruction.","title":"Pix.Pipeline.SDK.healthcheck/3","ref":"Pix.Pipeline.SDK.html#healthcheck/3"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.iargs/0","ref":"Pix.Pipeline.SDK.html#t:iargs/0"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.instruction/0","ref":"Pix.Pipeline.SDK.html#t:instruction/0"},{"type":"function","doc":"Adds a [`LABEL`](https://docs.docker.com/reference/dockerfile/#label) instruction.","title":"Pix.Pipeline.SDK.label/2","ref":"Pix.Pipeline.SDK.html#label/2"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.options/0","ref":"Pix.Pipeline.SDK.html#t:options/0"},{"type":"function","doc":"Declare a stage output artifact.\n\nThis function doesn't add any instruction to the Dockerfile.\nIt's used to declare the output of the stage.","title":"Pix.Pipeline.SDK.output/2","ref":"Pix.Pipeline.SDK.html#output/2"},{"type":"function","doc":"Creates a new pipeline.","title":"Pix.Pipeline.SDK.pipeline/2","ref":"Pix.Pipeline.SDK.html#pipeline/2"},{"type":"function","doc":"Build context name of the pipeline ctx directory.\n\n`Pix.Pipeline.SDK.copy(\"foo.sh\", \".\", from: Pix.Pipeline.SDK.pipeline_ctx())`","title":"Pix.Pipeline.SDK.pipeline_ctx/0","ref":"Pix.Pipeline.SDK.html#pipeline_ctx/0"},{"type":"function","doc":"Adds a [`RUN`](https://docs.docker.com/reference/dockerfile/#run) instruction.\n\nFor [Here-documents](https://docs.docker.com/reference/dockerfile/#here-documents) string see `sigil_h/2`.","title":"Pix.Pipeline.SDK.run/3","ref":"Pix.Pipeline.SDK.html#run/3"},{"type":"function","doc":"Adds a [`SHELL`](https://docs.docker.com/reference/dockerfile/#shell) instruction.","title":"Pix.Pipeline.SDK.shell/2","ref":"Pix.Pipeline.SDK.html#shell/2"},{"type":"function","doc":"A basic [Here-documents](https://docs.docker.com/reference/dockerfile/#here-documents) string sigil.\n\nIt expands to:\n\n```\n<<EOT\n... your string here ...\nEOT\n```\n\nExample:\n\n```\nrun(pipeline, ~h\"\"\"\n  if [ \"$X\" == \"x\" ]; then\n    echo \"x!\"\n  fi\n\"\"\")\n```\n\nFor more heredoc advance feature simply encode the heredoc yourself.","title":"Pix.Pipeline.SDK.sigil_h/2","ref":"Pix.Pipeline.SDK.html#sigil_h/2"},{"type":"function","doc":"Starts a new stage [`FROM`](https://docs.docker.com/reference/dockerfile/#from) the given base image.\n\n```elixir\nstage(\"build\", from: \"golang:1.23\")\n```\n\nthe optional `private` and `cache` options can be used to control the behavior of the stage:\n\n- `private: true` - the stage will not be accessible as a build target, only from other stages.\n- `cache: false` - the stage will not be cached, the stage will be built from scratch every time.","title":"Pix.Pipeline.SDK.stage/3","ref":"Pix.Pipeline.SDK.html#stage/3"},{"type":"function","doc":"Adds a [`STOPSIGNAL`](https://docs.docker.com/reference/dockerfile/#stopsignal) instruction.","title":"Pix.Pipeline.SDK.stopsignal/2","ref":"Pix.Pipeline.SDK.html#stopsignal/2"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.t/0","ref":"Pix.Pipeline.SDK.html#t:t/0"},{"type":"function","doc":"Adds a [`USER`](https://docs.docker.com/reference/dockerfile/#user) instruction.","title":"Pix.Pipeline.SDK.user/2","ref":"Pix.Pipeline.SDK.html#user/2"},{"type":"function","doc":"Adds a [`VOLUME`](https://docs.docker.com/reference/dockerfile/#volume) instruction.","title":"Pix.Pipeline.SDK.volume/2","ref":"Pix.Pipeline.SDK.html#volume/2"},{"type":"function","doc":"Adds a [`WORKDIR`](https://docs.docker.com/reference/dockerfile/#workdir) instruction.","title":"Pix.Pipeline.SDK.workdir/2","ref":"Pix.Pipeline.SDK.html#workdir/2"},{"type":"module","doc":"Pipeline stage.","title":"Pix.Pipeline.SDK.Stage","ref":"Pix.Pipeline.SDK.Stage.html"},{"type":"type","doc":"","title":"Pix.Pipeline.SDK.Stage.t/0","ref":"Pix.Pipeline.SDK.Stage.html#t:t/0"},{"type":"behaviour","doc":"Defines Pix projects.\n\nA Pix project is defined by calling `use Pix.Project` in a module placed in `.pix.exs`:\n\n```elixir\ndefmodule MyApp.Pix.Project do\n  use Pix.Project\n\n  @impl true\n  def project do\n    %{\n      pipelines: %{\n        \"elixir\" => %{\n          from: %{\n            git: \"git@github.com:user/group/repo.git\",\n            ref: \"v1.0\",\n            sub_dir: \"pipeline/elixir\"\n          },\n          default_args: %{\n            \"ELIXIR_APP_NAME\" => \"myapp\"\n          },\n          default_targets: [\n            \"elixir.format\",\n            \"elixir.credo\",\n            \"elixir.dialyzer\",\n            \"elixir.test\"\n          ]\n        },\n        \"deploy_aws\" => %{\n          from: %{\n            path: \"pipelines/deploy\",\n            sub_dir: \"aws\"\n          },\n          default_args: %{\n            \"AWS_REGION\" => \"eu-west-1\"\n          },\n          default_targets: [\n            \"deploy.plan\",\n            \"deploy.apply\"\n          ]\n        }\n      }\n    }\n  end\nend\n```","title":"Pix.Project","ref":"Pix.Project.html"},{"type":"behaviour","doc":"The project configuration returned by `c:project/0` must conform to a `t:Pix.Config.pix_exs/0` map.","title":"Project Configuration - Pix.Project","ref":"Pix.Project.html#module-project-configuration"},{"type":"behaviour","doc":"Pipeline sources can be defined in two ways:\n\n1. From a Git repository:\n\n```elixir\nfrom: %{\n  git: \"git@github.com:user/group/repo.git\",\n  ref: \"v1.0\",                    # Git reference (branch, tag, commit)\n  sub_dir: \"pipeline/elixir\"      # Optional subdirectory containing pipeline.exs\n}\n```\n\n2. From a local path:\n\n```elixir\nfrom: %{\n  path: \"pipelines/deploy\",       # Local directory path\n  sub_dir: \"aws\"                  # Optional subdirectory containing pipeline.exs\n}\n```","title":"Pipeline Sources - Pix.Project","ref":"Pix.Project.html#module-pipeline-sources"},{"type":"behaviour","doc":"Default arguments for pipelines can be specified:\n\n```elixir\ndefault_args: %{\n  \"AWS_REGION\" => \"eu-west-1\",\n  \"ANOTHER_ARG\" => \"value\"\n}\n```","title":"Pipeline Arguments - Pix.Project","ref":"Pix.Project.html#module-pipeline-arguments"},{"type":"behaviour","doc":"The following built-in variables are automatically available in all pipelines both as environment variables and as build ARGS in the pipeline:\n\n- `PIX_PROJECT_NAME`: Name of the current Git project\n- `PIX_COMMIT_SHA`: Current Git commit SHA\n- `PIX_PIPELINE_TARGET`: Name of the current pipeline target being executed\n\nIf the pipeline is defined from a local path, the following variables are also available:\n\n- `PIX_PIPELINE_FROM_PATH`\n- `PIX_PIPELINE_FROM_SUB_DIR`\n\nIf the pipeline is defined from a Git repository, the following variables are also available:\n\n- `PIX_PIPELINE_FROM_GIT_REPO`\n- `PIX_PIPELINE_FROM_GIT_REF`\n- `PIX_PIPELINE_FROM_GIT_SUB_DIR`","title":"Built-in Variables - Pix.Project","ref":"Pix.Project.html#module-built-in-variables"},{"type":"behaviour","doc":"Default targets define which pipeline stages should be executed by default when runninng `pix run PIPELINE_NAME`:\n\n```elixir\ndefault_targets: [\n  \"target1\",\n  \"target2\"\n]\n```","title":"Pipeline Targets - Pix.Project","ref":"Pix.Project.html#module-pipeline-targets"},{"type":"callback","doc":"","title":"Pix.Project.project/0","ref":"Pix.Project.html#c:project/0"},{"type":"module","doc":"Pix user settings.\n\nYou can set some global settings in your `~/.config/pix/settings.exs` file.\n\nThe file should evaluate to a map conform to `t:t/0`.\n\nFor example:\n\n```elixir\n%{\n  env: %{\n    \"PIX_DEBUG\" => \"true\"\n  },\n  command: %{\n    run: %{\n      cli_opts: [\n        ssh: true\n      ]\n    },\n    shell: %{\n      cli_opts: [\n        ssh: true\n      ]\n    }\n  }\n}\n```","title":"Pix.UserSettings","ref":"Pix.UserSettings.html"},{"type":"function","doc":"","title":"Pix.UserSettings.get/0","ref":"Pix.UserSettings.html#get/0"},{"type":"type","doc":"","title":"Pix.UserSettings.t/0","ref":"Pix.UserSettings.html#t:t/0"},{"type":"extras","doc":"# PIX\n\n[![.github/workflows/ci.yml](https://github.com/athonet-open/pix/actions/workflows/ci.yml/badge.svg)](https://github.com/athonet-open/pix/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-latest-green.svg)](https://athonet-open.github.io/pix)\n\nBuildKit pipelines.\n\nDocumentation [website](https://athonet-open.github.io/pix).","title":"PIX","ref":"readme.html"},{"type":"extras","doc":"Pix is a portable pipeline executor - a CI framework to define and execute pipelines that can run on any host with docker support.\nPipelines are defined as code and executed via docker [BuildKit](https://github.com/moby/buildkit).","title":"Introduction - PIX","ref":"readme.html#introduction"},{"type":"extras","doc":"","title":"Basic concepts - PIX","ref":"readme.html#basic-concepts"},{"type":"extras","doc":"The building blocks of a pipeline are:\n- **stage**: this is where the actual work is done (ie. execute tests, build an application, perform a deployment, etc). A stage can be parameterized via **arguments**.\n- **output**: a stage can produce outputs (ie. running a test suite and output a coverage report, generate documentation, etc).\n- **dependency**: stages are connected via **dependencies** to define an execution graph.\n\nUnder the hood, a pipeline is an instrumented docker multistage build, it is programmatically defined via Elixir code (using the `Pix.Pipeline.SDK`).","title":"The pipeline - PIX","ref":"readme.html#the-pipeline"},{"type":"extras","doc":"Pix generates the multistage docker build definition and execute it via `docker buildx build`.\nThe execution semantic (parallelism, cache, etc) is the same of a docker build graph.","title":"The pipeline executor - PIX","ref":"readme.html#the-pipeline-executor"},{"type":"extras","doc":"At the root of your project you can define a `.pix.exs` file that declare the pipeline available for your project.\nIn the .pix.exs file you declare the pipelines with their default arguments and targets.\nThe pipelines definition can be imported `from` a local `path` or a remote `git` repository.\n\nMore details in the `Pix.Project` module documentation.","title":"The Project - PIX","ref":"readme.html#the-project"},{"type":"extras","doc":"The pipeline is a programmatic definition of a docker multistage build.\nIt is composed of a set of targets, each target is a named docker build stage and defined in a `pipeline.exs` using the `Pix.Pipeline.SDK`.\n\nMore details in the `Pix.Pipeline.SDK` module documentation.","title":"The Pipeline definition - PIX","ref":"readme.html#the-pipeline-definition"},{"type":"extras","doc":"","title":"Installation - PIX","ref":"readme.html#installation"},{"type":"extras","doc":"Pix requires a `docker` engine to be installed on the host.","title":"Prerequisites - PIX","ref":"readme.html#prerequisites"},{"type":"extras","doc":"Pix can be installed natively as an Elixir escript, in this can you need erlang/elixir installed on your system:\n\n```bash\n$ mix escript.install github athonet-open/pix ref vX.Y.Z\n```\n\nalternatively, you can use it as a docker image:\n\n```bash\n$ docker run --rm -it \\\n  --volume $PWD:/$PWD --workdir /$PWD \\\n  --volume /var/run/docker.sock:/var/run/docker.sock \\\n  --volume $SSH_AUTH_SOCK:$SSH_AUTH_SOCK \\\n  --env SSH_AUTH_SOCK=$SSH_AUTH_SOCK \\\n  ghcr.io/athonet-open/pix:X.Y.Z \"$@\"\n```\n\nin this case is important to give the pix container access the docker engine.\nYou can use the Docker Socket Mounting (DooD - Docker outside of docker) or the Docker-in-Docker (dind) mode.\n\nIf you need SSH access, you need to forward the SSH agent socket to the pix container.\nNote: if running on a Mac via docker-desktop, the SSH socket of the docker VM is accessible via:\n\n```bash\n--volume /run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock \\\n--env SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock\n```","title":"Installation options - PIX","ref":"readme.html#installation-options"},{"type":"extras","doc":"For this quick start, we will use the pix project itself.\nThe pix project declares a pipeline that can be used to build and test pix itself.\n\nThe project is declared with a [.pix.exs](https://github.com/athonet-open/pix/blob/main/.pix.exs) file, where a single pipeline - `pix` - has been defined with its default arguments and targets.\n\nThe [pipeline.exs](https://github.com/athonet-open/pix/blob/main/pipeline.exs) file define the `pix` pipeline.\n\nTo run the project pipeline, we can use the `pix run` command.\n\n```bash\n$ pix run pix\n```\n\nThis will build the project, the docs, run the tests, etc..\n\nThe `pix ls --verbose pix` command can be used to list all the pipelines declared in the project along with their configuration.\n\nThen the `pix graph pix` command can be used to generate a graph of a specific pipeline.\n\nThe Pix Elixir documentation is built by `pix.docs` target of the pipeline, run `pix run --output pix` to run the pipeline and output the produced artifacts to the current directory. The docs will be available under `.pipeline/output/doc/index.html`.\n\nFor more information about the available commands and their options, run `pix help`.","title":"Quick start - PIX","ref":"readme.html#quick-start"},{"type":"extras","doc":"User specific settings can be defined in the `~/.config/pix/settings.exs` file, the file is loaded automatically by pix.\nRefer to `Pix.UserSettings` for more information.","title":"User settings - PIX","ref":"readme.html#user-settings"}],"proglang":"elixir","content_type":"text/markdown","producer":{"name":"ex_doc","version":"0.36.1"}}