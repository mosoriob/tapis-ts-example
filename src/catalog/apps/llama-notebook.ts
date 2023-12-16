import { Apps } from "@tapis/tapis-typescript";

const llamaNotebookApp: Apps.ReqPostApp = {
  id: "jupyter-lab-hpc-llm",
  version: "0.9.0",
  description:
    "Run an interactive Jupyter Lab session on an HPC compute node. For the LLama Index Environment",
  owner: "${apiUserId}",
  enabled: true,
  runtime: Apps.RuntimeEnum.Singularity,
  runtimeOptions: [Apps.RuntimeOptionEnum.SingularityRun],
  containerImage:
    "docker://ghcr.io/in-for-disaster-analytics/tap_llmrepository-docker:sha-3c1bbe8",
  jobType: Apps.JobTypeEnum.Batch,
  maxJobs: -1,
  maxJobsPerUser: -1,
  strictFileInputs: true,
  jobAttributes: {
    execSystemExecDir: "${JobWorkingDir}/jobs/${JobUUID}",
    execSystemInputDir: "${JobWorkingDir}/jobs/${JobUUID}/input",
    execSystemOutputDir: "${JobWorkingDir}/jobs/${JobUUID}/output",
    execSystemLogicalQueue: "gpu-a100-small",
    maxMinutes: 100,
    parameterSet: {
      containerArgs: [
        {
          name: "mount",
          description: "Mount a directory from the host into the container",
          inputMode: Apps.ArgInputModeEnum.Fixed,
          arg: "--bind /share",
        },
        {
          name: "NVIDIA Flag",
          description: "Flag to enable NVIDIA cuda",
          inputMode: Apps.ArgInputModeEnum.Fixed,
          arg: "--nv",
        },
      ],

      envVariables: [
        {
          key: "email",
        },
      ],
    },
  },
  tags: ["portalName: ALL"],
  notes: {
    label: "Jupyter Lab HPC (Frontera)",
    helpUrl: "https://jupyterlab.readthedocs.io/en/stable/",
    hideNodeCountAndCoresPerNode: false,
    isInteractive: true,
    icon: "jupyter",
    category: "Data Processing",
  },
};

export default llamaNotebookApp;
