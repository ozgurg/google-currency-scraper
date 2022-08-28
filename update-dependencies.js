import { exec } from "child_process";

import packageJson from "./package.json" assert { type: "json" };

if (packageJson.dependencies !== undefined) {
    const dependencies = Object.keys(packageJson.dependencies);

    (async () => {
        await exec(`npm i ${dependencies.join(" ")} --save`);
    })();
}

if (packageJson.devDependencies !== undefined) {
    const devDependencies = Object.keys(packageJson.devDependencies);

    (async () => {
        await exec(`npm i ${devDependencies.join(" ")} --save-dev`);
    })();
}
