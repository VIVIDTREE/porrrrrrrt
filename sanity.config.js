/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\sanity\[[...index]]\page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

export default defineConfig({
  basePath: "/sanity",
  projectId: "xi2zimpb",
  dataset: "production",
  useCdn: true,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: "Sanity Deployment",
          sites: [
            {
              title: "Sanity Studio",
              apiId: "5acaf497-bc19-49e1-8bf0-1cb4a5cb7b7a",
              buildHookId: "663b0318717a909a87c963f7",
              name: "sanity nstudio",
            },
            {
              title: "Website",
              apiId: "5acaf497-bc19-49e1-8bf0-1cb4a5cb7b7a",
              buildHookId: "663b0318717a909a87c963f7",
              name: "simwongi",
              url: "https://my-sanity-deployment.com",
            },
          ],
        }),
      ],
    }),
  ],
});
