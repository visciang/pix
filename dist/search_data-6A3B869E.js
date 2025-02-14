searchData={"items":[{"type":"module","title":"Pix.Config","doc":"Configuration module.","ref":"Pix.Config.html"},{"type":"type","title":"Pix.Config.arch/0","doc":"","ref":"Pix.Config.html#t:arch/0"},{"type":"type","title":"Pix.Config.args/0","doc":"","ref":"Pix.Config.html#t:args/0"},{"type":"type","title":"Pix.Config.from/0","doc":"","ref":"Pix.Config.html#t:from/0"},{"type":"type","title":"Pix.Config.from_git/0","doc":"","ref":"Pix.Config.html#t:from_git/0"},{"type":"type","title":"Pix.Config.from_path/0","doc":"","ref":"Pix.Config.html#t:from_path/0"},{"type":"function","title":"Pix.Config.get/0","doc":"","ref":"Pix.Config.html#get/0"},{"type":"type","title":"Pix.Config.pipeline/0","doc":"","ref":"Pix.Config.html#t:pipeline/0"},{"type":"type","title":"Pix.Config.pipeline_alias/0","doc":"","ref":"Pix.Config.html#t:pipeline_alias/0"},{"type":"type","title":"Pix.Config.pix_exs/0","doc":"","ref":"Pix.Config.html#t:pix_exs/0"},{"type":"type","title":"Pix.Config.pix_exs_pipeline/0","doc":"","ref":"Pix.Config.html#t:pix_exs_pipeline/0"},{"type":"type","title":"Pix.Config.supported_arch/0","doc":"","ref":"Pix.Config.html#t:supported_arch/0"},{"type":"type","title":"Pix.Config.t/0","doc":"","ref":"Pix.Config.html#t:t/0"},{"type":"module","title":"Pix.Env","doc":"Environment information.","ref":"Pix.Env.html"},{"type":"function","title":"Pix.Env.arch/0","doc":"","ref":"Pix.Env.html#arch/0"},{"type":"function","title":"Pix.Env.ci?/0","doc":"","ref":"Pix.Env.html#ci?/0"},{"type":"function","title":"Pix.Env.git_commit_sha/0","doc":"","ref":"Pix.Env.html#git_commit_sha/0"},{"type":"function","title":"Pix.Env.git_project_name/0","doc":"","ref":"Pix.Env.html#git_project_name/0"},{"type":"function","title":"Pix.Env.pix_docker_build_opts/0","doc":"","ref":"Pix.Env.html#pix_docker_build_opts/0"},{"type":"function","title":"Pix.Env.pix_docker_run_opts/0","doc":"","ref":"Pix.Env.html#pix_docker_run_opts/0"},{"type":"behaviour","title":"Pix.Pipeline.Project","doc":"Defines Pix pipeline projects.\n\nA Pix pipeline project is defined by calling `use Pix.Pipeline.Project` in a module placed in `pipeline.exs`:\n\n```elixir\ndefmodule MyApp.Pipeline do\n  use Pix.Pipeline.Project\n  import Pix.Pipeline.SDK\n\n  @impl true\n  def pipeline() do\n    pipeline(\"myapp\",\n      description: \"MyApp pipeline\",\n      dockerignore: [\".git\", \"_build\", \"deps\"]\n    )\n    |> stage(\"base\", from: \"alpine:3.18\")\n    |> run(\"apk add --no-cache git\")\n    |> stage(\"build\", from: \"elixir:1.15\")\n    |> arg(\"MIX_ENV\", \"prod\")\n    |> copy(\"mix.exs\", \".\")\n    |> run(\"mix deps.get\")\n    |> copy(\"lib\", \"lib\")\n    |> run(\"mix compile\")\n    |> output(\"/app/_build\")\n  end\n\n  @impl true\n  def shell(pipeline, shell_stage, from_target) do\n    pipeline\n    |> stage(shell_stage, from: from_target)\n    |> run(\"apk add --no-cache bash\")\n    |> cmd(\"bash\")\n  end\nend\n```","ref":"Pix.Pipeline.Project.html"},{"type":"behaviour","title":"Pipeline Definition - Pix.Pipeline.Project","doc":"A pipeline project must implement the `c:pipeline/0` callback to define the pipeline stages and instructions.\nThe pipeline is built using the `Pix.Pipeline.SDK` module which provides a fluent API for:\n\n- Creating pipeline stages\n- Adding Docker instructions (RUN, COPY, ARG etc)\n- Defining outputs\n- Setting build arguments\n- Configuring .dockerignore","ref":"Pix.Pipeline.Project.html#module-pipeline-definition"},{"type":"behaviour","title":"Shell Support - Pix.Pipeline.Project","doc":"Optionally, a pipeline can implement the `c:shell/3` callback to provide an interactive shell environment.\nThe shell callback receives:\n\n- The pipeline definition\n- The shell stage name\n- The target stage to base the shell from (or :default)\n\nThis enables debugging and interactive development within pipeline stages.","ref":"Pix.Pipeline.Project.html#module-shell-support"},{"type":"behaviour","title":"Pipeline Stages - Pix.Pipeline.Project","doc":"Each stage in a pipeline:\n\n- Has a unique name\n- Can be marked as private\n- Can enable/disable caching\n- Can define outputs\n- Can have stage-specific build arguments","ref":"Pix.Pipeline.Project.html#module-pipeline-stages"},{"type":"behaviour","title":"Pipeline SDK - Pix.Pipeline.Project","doc":"The `Pix.Pipeline.SDK` module provides a complete API for building Dockerfiles programmatically:\n\n- Stage management (FROM)\n- File operations (COPY, ADD)\n- Command execution (RUN, CMD)\n- Environment setup (ENV, ARG)\n- Output artifacts\n- And more every other Docker instruction","ref":"Pix.Pipeline.Project.html#module-pipeline-sdk"},{"type":"behaviour","title":"Pipeline COPY context - Pix.Pipeline.Project","doc":"When using the `Pix.Pipeline.SDK.copy/3` function, it's possible to specify a context directory to copy from.\nTo copy files from the directory where the pipeline is defined (the directory where the `pipeline.exs` file is located),\nuse `copy(src, dest, from: pipeline_ctx()`.\n\n\nSee `Pix.Pipeline.SDK` for the complete API reference.","ref":"Pix.Pipeline.Project.html#module-pipeline-copy-context"},{"type":"callback","title":"Pix.Pipeline.Project.pipeline/0","doc":"","ref":"Pix.Pipeline.Project.html#c:pipeline/0"},{"type":"callback","title":"Pix.Pipeline.Project.shell/3","doc":"","ref":"Pix.Pipeline.Project.html#c:shell/3"},{"type":"type","title":"Pix.Pipeline.Project.t/0","doc":"","ref":"Pix.Pipeline.Project.html#t:t/0"},{"type":"module","title":"Pix.Pipeline.SDK","doc":"Provides APIs for building Dockerfiles pipelines programmatically.\n\nThe names of the functions map to the [Dockerfile](https://docs.docker.com/engine/reference/builder/) commands.\nSome of the functions have additional options to extend the functionality of the commands (eg. `private` and `cache` in `stage/2`)\nand some functions are extension to the commands (eg. `output/2`).\n\nFor example:\n\n```elixir\nimport Pix.Pipeline.SDK\n\npipeline =\n  pipeline(\"gohello\", description: \"My pipeline description\")\n  |> stage(\"build\", from: \"golang:1.23\", private: true)\n  |> copy(\"hello.go\", \".\")\n  |> run(\"go build -o hello hello.go\")\n  |> stage(\"app\", from: \"scratch\")\n  |> copy(\"hello\", \".\", from: \"build\")\n  |> cmd([\"/hello\"])\n\npipeline\n|> dump()\n|> IO.puts()\n```","ref":"Pix.Pipeline.SDK.html"},{"type":"module","title":"Output - Pix.Pipeline.SDK","doc":"```Dockerfile\nFROM golang:1.23 AS build\nCOPY hello.go .\nRUN go build -o hello hello.go\n\nFROM scratch AS app\nCOPY --from=\"build\" hello .\nCMD [\"/hello\"]\n```","ref":"Pix.Pipeline.SDK.html#module-output"},{"type":"function","title":"Pix.Pipeline.SDK.add/4","doc":"Adds a [`ADD`](https://docs.docker.com/reference/dockerfile/#add) instruction.","ref":"Pix.Pipeline.SDK.html#add/4"},{"type":"function","title":"Pix.Pipeline.SDK.arg/3","doc":"Adds a [`ARG`](https://docs.docker.com/reference/dockerfile/#arg) instruction in a stage scope.","ref":"Pix.Pipeline.SDK.html#arg/3"},{"type":"type","title":"Pix.Pipeline.SDK.args/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:args/0"},{"type":"function","title":"Pix.Pipeline.SDK.cmd/2","doc":"Adds a [`CMD`](https://docs.docker.com/reference/dockerfile/#cmd) instruction.","ref":"Pix.Pipeline.SDK.html#cmd/2"},{"type":"type","title":"Pix.Pipeline.SDK.command/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:command/0"},{"type":"function","title":"Pix.Pipeline.SDK.copy/4","doc":"Adds a [`COPY`](https://docs.docker.com/reference/dockerfile/#copy) instruction.","ref":"Pix.Pipeline.SDK.html#copy/4"},{"type":"function","title":"Pix.Pipeline.SDK.dump/1","doc":"Converts the Dockerfile into a string representation.","ref":"Pix.Pipeline.SDK.html#dump/1"},{"type":"function","title":"Pix.Pipeline.SDK.entrypoint/2","doc":"Adds a [`ENTRYPOINT`](https://docs.docker.com/reference/dockerfile/#entrypoint) instruction.","ref":"Pix.Pipeline.SDK.html#entrypoint/2"},{"type":"function","title":"Pix.Pipeline.SDK.env/2","doc":"Adds a [`ENV`](https://docs.docker.com/reference/dockerfile/#env) instruction.","ref":"Pix.Pipeline.SDK.html#env/2"},{"type":"function","title":"Pix.Pipeline.SDK.expose/2","doc":"Adds a [`EXPOSE`](https://docs.docker.com/reference/dockerfile/#expose) instruction.","ref":"Pix.Pipeline.SDK.html#expose/2"},{"type":"function","title":"Pix.Pipeline.SDK.global_arg/3","doc":"Adds a [`ARG`](https://docs.docker.com/reference/dockerfile/#arg) instruction in the global scope.","ref":"Pix.Pipeline.SDK.html#global_arg/3"},{"type":"function","title":"Pix.Pipeline.SDK.healthcheck/3","doc":"Adds a [`HEALTHCHECK`](https://docs.docker.com/reference/dockerfile/#healthcheck) instruction.","ref":"Pix.Pipeline.SDK.html#healthcheck/3"},{"type":"type","title":"Pix.Pipeline.SDK.iargs/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:iargs/0"},{"type":"type","title":"Pix.Pipeline.SDK.instruction/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:instruction/0"},{"type":"function","title":"Pix.Pipeline.SDK.label/2","doc":"Adds a [`LABEL`](https://docs.docker.com/reference/dockerfile/#label) instruction.","ref":"Pix.Pipeline.SDK.html#label/2"},{"type":"type","title":"Pix.Pipeline.SDK.options/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:options/0"},{"type":"function","title":"Pix.Pipeline.SDK.output/2","doc":"Declare a stage output artifact.\n\nThis function doesn't add any instruction to the Dockerfile.\nIt's used to declare the output of the stage.","ref":"Pix.Pipeline.SDK.html#output/2"},{"type":"function","title":"Pix.Pipeline.SDK.pipeline/2","doc":"Creates a new pipeline.","ref":"Pix.Pipeline.SDK.html#pipeline/2"},{"type":"function","title":"Pix.Pipeline.SDK.pipeline_ctx/0","doc":"Build context name of the pipeline ctx directory.\n\n`Pix.Pipeline.SDK.copy(\"foo.sh\", \".\", from: Pix.Pipeline.SDK.pipeline_ctx())`","ref":"Pix.Pipeline.SDK.html#pipeline_ctx/0"},{"type":"function","title":"Pix.Pipeline.SDK.run/3","doc":"Adds a [`RUN`](https://docs.docker.com/reference/dockerfile/#run) instruction.\n\nFor [Here-documents](https://docs.docker.com/reference/dockerfile/#here-documents) string see `sigil_h/2`.","ref":"Pix.Pipeline.SDK.html#run/3"},{"type":"function","title":"Pix.Pipeline.SDK.shell/2","doc":"Adds a [`SHELL`](https://docs.docker.com/reference/dockerfile/#shell) instruction.","ref":"Pix.Pipeline.SDK.html#shell/2"},{"type":"function","title":"Pix.Pipeline.SDK.sigil_h/2","doc":"A basic [Here-documents](https://docs.docker.com/reference/dockerfile/#here-documents) string sigil.\n\nIt expands to:\n\n```\n<<EOT\n... your string here ...\nEOT\n```\n\nExample:\n\n```\nrun(pipeline, ~h\"\"\"\n  if [ \"$X\" == \"x\" ]; then\n    echo \"x!\"\n  fi\n\"\"\")\n```\n\nFor more heredoc advance feature simply encode the heredoc yourself.","ref":"Pix.Pipeline.SDK.html#sigil_h/2"},{"type":"function","title":"Pix.Pipeline.SDK.stage/3","doc":"Starts a new stage [`FROM`](https://docs.docker.com/reference/dockerfile/#from) the given base image.\n\n```elixir\nstage(\"build\", from: \"golang:1.23\")\n```\n\nthe optional `private` and `cache` options can be used to control the behavior of the stage:\n\n- `private: true` - the stage will not be accessible as a build target, only from other stages.\n- `cache: false` - the stage will not be cached, the stage will be built from scratch every time.","ref":"Pix.Pipeline.SDK.html#stage/3"},{"type":"function","title":"Pix.Pipeline.SDK.stopsignal/2","doc":"Adds a [`STOPSIGNAL`](https://docs.docker.com/reference/dockerfile/#stopsignal) instruction.","ref":"Pix.Pipeline.SDK.html#stopsignal/2"},{"type":"type","title":"Pix.Pipeline.SDK.t/0","doc":"","ref":"Pix.Pipeline.SDK.html#t:t/0"},{"type":"function","title":"Pix.Pipeline.SDK.user/2","doc":"Adds a [`USER`](https://docs.docker.com/reference/dockerfile/#user) instruction.","ref":"Pix.Pipeline.SDK.html#user/2"},{"type":"function","title":"Pix.Pipeline.SDK.volume/2","doc":"Adds a [`VOLUME`](https://docs.docker.com/reference/dockerfile/#volume) instruction.","ref":"Pix.Pipeline.SDK.html#volume/2"},{"type":"function","title":"Pix.Pipeline.SDK.workdir/2","doc":"Adds a [`WORKDIR`](https://docs.docker.com/reference/dockerfile/#workdir) instruction.","ref":"Pix.Pipeline.SDK.html#workdir/2"},{"type":"module","title":"Pix.Pipeline.SDK.Stage","doc":"Pipeline stage.","ref":"Pix.Pipeline.SDK.Stage.html"},{"type":"type","title":"Pix.Pipeline.SDK.Stage.t/0","doc":"","ref":"Pix.Pipeline.SDK.Stage.html#t:t/0"},{"type":"behaviour","title":"Pix.Project","doc":"Defines Pix projects.\n\nA Pix project is defined by calling `use Pix.Project` in a module placed in `.pix.exs`:\n\n```elixir\ndefmodule MyApp.Pix.Project do\n  use Pix.Project\n\n  @impl true\n  def project do\n    %{\n      pipelines: %{\n        \"elixir\" => %{\n          from: %{\n            git: \"git@github.com:user/group/repo.git\",\n            ref: \"v1.0\",\n            sub_dir: \"pipeline/elixir\"\n          },\n          default_args: %{\n            \"ELIXIR_APP_NAME\" => \"myapp\"\n          },\n          default_targets: [\n            \"elixir.format\",\n            \"elixir.credo\",\n            \"elixir.dialyzer\",\n            \"elixir.test\"\n          ]\n        },\n        \"deploy_aws\" => %{\n          from: %{\n            path: \"pipelines/deploy\",\n            sub_dir: \"aws\"\n          },\n          default_args: %{\n            \"AWS_REGION\" => \"eu-west-1\"\n          },\n          default_targets: [\n            \"deploy.plan\",\n            \"deploy.apply\"\n          ]\n        }\n      }\n    }\n  end\nend\n```","ref":"Pix.Project.html"},{"type":"behaviour","title":"Project Configuration - Pix.Project","doc":"The project configuration returned by `c:project/0` must conform to a `t:Pix.Config.pix_exs/0` map.","ref":"Pix.Project.html#module-project-configuration"},{"type":"behaviour","title":"Pipeline Sources - Pix.Project","doc":"Pipeline sources can be defined in two ways:\n\n1. From a Git repository:\n\n```elixir\nfrom: %{\n  git: \"git@github.com:user/group/repo.git\",\n  ref: \"v1.0\",                    # Git reference (branch, tag, commit)\n  sub_dir: \"pipeline/elixir\"      # Optional subdirectory containing pipeline.exs\n}\n```\n\n2. From a local path:\n\n```elixir\nfrom: %{\n  path: \"pipelines/deploy\",       # Local directory path\n  sub_dir: \"aws\"                  # Optional subdirectory containing pipeline.exs\n}\n```","ref":"Pix.Project.html#module-pipeline-sources"},{"type":"behaviour","title":"Pipeline Arguments - Pix.Project","doc":"Default arguments for pipelines can be specified:\n\n```elixir\ndefault_args: %{\n  \"AWS_REGION\" => \"eu-west-1\",\n  \"ANOTHER_ARG\" => \"value\"\n}\n```","ref":"Pix.Project.html#module-pipeline-arguments"},{"type":"behaviour","title":"Built-in Variables - Pix.Project","doc":"The following built-in variables are automatically available in all pipelines both as environment variables and as build ARGS in the pipeline:\n\n- `PIX_PROJECT_NAME`: Name of the current Git project\n- `PIX_COMMIT_SHA`: Current Git commit SHA\n- `PIX_PIPELINE_TARGET`: Name of the current pipeline target being executed\n\nIf the pipeline is defined from a local path, the following variables are also available:\n\n- `PIX_PIPELINE_FROM_PATH`\n- `PIX_PIPELINE_FROM_SUB_DIR`\n\nIf the pipeline is defined from a Git repository, the following variables are also available:\n\n- `PIX_PIPELINE_FROM_GIT_REPO`\n- `PIX_PIPELINE_FROM_GIT_REF`\n- `PIX_PIPELINE_FROM_GIT_SUB_DIR`","ref":"Pix.Project.html#module-built-in-variables"},{"type":"behaviour","title":"Pipeline Targets - Pix.Project","doc":"Default targets define which pipeline stages should be executed by default when runninng `pix run PIPELINE_NAME`:\n\n```elixir\ndefault_targets: [\n  \"target1\",\n  \"target2\"\n]\n```","ref":"Pix.Project.html#module-pipeline-targets"},{"type":"callback","title":"Pix.Project.project/0","doc":"","ref":"Pix.Project.html#c:project/0"},{"type":"module","title":"Pix.UserSettings","doc":"Pix user settings.\n\nYou can set some global settings in your `~/.config/pix/settings.exs` file.\n\nThe file should evaluate to a map conform to `t:t/0`.\n\nFor example:\n\n```elixir\n%{\n  env: %{\n    \"PIX_DEBUG\" => true\n  },\n  command: %{\n    run: %{\n      cli_opts: [\n        ssh: true\n      ]\n    },\n    shell: %{\n      cli_opts: [\n        ssh: true\n      ]\n    }\n  }\n}\n```","ref":"Pix.UserSettings.html"},{"type":"function","title":"Pix.UserSettings.get/0","doc":"","ref":"Pix.UserSettings.html#get/0"},{"type":"type","title":"Pix.UserSettings.t/0","doc":"","ref":"Pix.UserSettings.html#t:t/0"},{"type":"extras","title":"PIX","doc":"# PIX\n\n[![.github/workflows/ci.yml](https://github.com/visciang/pix/actions/workflows/ci.yml/badge.svg)](https://github.com/visciang/pix/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-latest-green.svg)](https://visciang.github.io/pix/readme.html)\n\nPipelines for buildx.","ref":"readme.html"},{"type":"extras","title":"Introduction - PIX","doc":"Pix is a portable pipeline executor - a CI framework to define and execute pipelines that can run on any host with docker support.\nPipelines are defined as code and executed via docker `buildkit`.","ref":"readme.html#introduction"},{"type":"extras","title":"Basic concepts - PIX","doc":"","ref":"readme.html#basic-concepts"},{"type":"extras","title":"The pipeline - PIX","doc":"The pipeline is the core of the Pix framework.\nIt's just an instrumented docker multistage build programmatically defined via Elixir code (using the `Pix.Pipeline.SDK`).","ref":"readme.html#the-pipeline"},{"type":"extras","title":"The pipeline executor - PIX","doc":"Pix generates the multistage docker build definition and execute it via `docker buildx build`.\nThe execution semantic (parallelism, cache, etc) is the same as a standard docker build.","ref":"readme.html#the-pipeline-executor"},{"type":"extras","title":"Installation - PIX","doc":"Pix can be installed nativelly as an Elixir escript.\n\n```bash\n$ mix escript.install github visciang/pix ref vX.Y.Z\n```\n\nalternatively, you can use it as a docker image:\n\n```bash\n$ docker run --rm -it \\\n  --volume $PWD:/code --workdir /code \\\n  # docker outside of docker mode \\\n  --volume /var/run/docker.sock:/var/run/docker.sock \\\n  # SSH forwarding \\\n  --volume $SSH_AUTH_SOCK:$SSH_AUTH_SOCK \\\n  --env SSH_AUTH_SOCK=$SSH_AUTH_SOCK \\\n  ghcr.io/visciang/pix:X.Y.Z\n```\n\nin this case is important to give the pix container access the docker engine.\nYou can use the Docker Socket Mounting (DooD - Docker outside of docker) or the Docker-in-Docker (dind) mode.\n\nIf you need SSH access, you need to forward the SSH agent socket to the pix container.\nNote: if running on a Mac via docker-desktop, the SSH socket of the docker VM is accessible via:\n\n```bash\n--volume /run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock \\\n--env SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock\n```","ref":"readme.html#installation"},{"type":"extras","title":"Quick start - PIX","doc":"For this quick start, we will use the pix project itself.\nThe pix project declares a pipeline that can be used to build and test pix itself.\n\nThe project is defined with a [.pix.exs](.pix.exs) file.\n\nIn the .pix.exs file, we setup a single pipeline - `pix` - with its default arguments and targets.\nThe pipeline definition is imported `from` a local `path` (in this case `.`, root directory).\n\nIn the root directory we have the [pipeline.exs](pipeline.exs) file that defines the pipeline.\nThe pipeline definition is composed of a set of targets, each target is a named docker stage.\n\nTo run the project pipeline, we can use the `pix run` command.\n\n```bash\n$ pix run pix\n```\n\nThis will build the project, the docs, run the tests, etc..\n\nThe `pix ls --verbose pix` command can be used to list all the pipelines declared in the project along with their configuration.\n\nThen the `pix graph pix` command can be used to generate a graph of a specific pipeline.\n\nThe Pix Elixir documentation is built by `pix.docs` target of the pipeline, run `pix run --output pix` to run the pipeline and output the produced artifacts to the current directory. The docs will be available under `.pipeline/output/doc/index.html`.\n\nFor more information about the available commands and their options, run `pix help`.","ref":"readme.html#quick-start"},{"type":"extras","title":"User settings - PIX","doc":"User specific settings can be defined in the `~/.config/pix/settings.exs` file, the file is loaded automatically by pix.\nRefer to `Pix.UserSettings` for more information.","ref":"readme.html#user-settings"}],"proglang":"elixir","content_type":"text/markdown","producer":{"name":"ex_doc","version":"0.36.1"}}