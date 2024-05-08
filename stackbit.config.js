import { defineStackbitConfig } from "@stackbit/types";
import { SanityContentSource } from "@stackbit/cms-sanity";
import path from "path";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "16",
  contentSources: [
    new SanityContentSource({
      rootPath: path.join(__dirname, "../portfolio-app"),
      studioPath: path.join(__dirname, "../portfolio-app/sanity"),
      studioUrl: "https://your-sanity-studio-url", // Sanity Studio의 배포 URL 입력
      projectId: process.env.SANITY_PROJECT_ID,
      token: process.env.SANITY_ACCESS_TOKEN,
      dataset: process.env.SANITY_DATASET || "production",
    }),
  ],
  mapModels: ({ models }) => {
    return models.map((model) => {
      if (model.name === "page") {
        return { ...model, type: "page", urlPath: "/{slug}" };
      }
      return model;
    });
  },
  import: {
    contentFile: "sanity-export/export.tar.gz",
    datasetEnvVar: "SANITY_DATASET",
    deployGraphql: false,
    deployStudio: true,
    projectIdEnvVar: "SANITY_PROJECT_ID",
    sanityStudioPath: "./studio",
    tokenEnvVar: "SANITY_ACCESS_TOKEN",
    type: "sanity",
  },
});
