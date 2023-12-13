import { Apps } from "@tapis/tapis-typescript";

const imgClassifyApp: Apps.ReqPostApp = {
  id: "img-classify-mosorio",
  version: process.env.TEST_APP_VERSION,
  description: "Image classifier run using Singularity in batch mode",
  jobType: Apps.JobTypeEnum.Batch,
  runtime: Apps.RuntimeEnum.Singularity,
  runtimeOptions: [Apps.RuntimeOptionEnum.SingularityRun],
  containerImage: "docker://tapis/img-classify-sing:0.1",
  jobAttributes: {
    parameterSet: {
      appArgs: [
        {
          arg: "--image_file",
          name: "arg1",
        },
      ],
      archiveFilter: { includeLaunchFiles: false },
    },
    nodeCount: 1,
    coresPerNode: 1,
    memoryMB: 1,
    maxMinutes: 10,
  },
};

export default imgClassifyApp;
