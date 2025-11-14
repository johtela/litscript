#!/usr/bin/env node
/**
 * # Running from Command Line
 * 
 * When ran from command line, we provide additional functionality to 
 * *scaffold* files and configuration needed by LiTScript. We assume that
 * project is already created, and that `package.json` file exist.

 * ## Main Entry Point
 * 
 * If user specifies `init` as the first argument for the `lits` executable,
 * we run the scaffolding. Otherwise we jump to the main program.
 */
//#region -c cli.ts imports
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import * as lits from ".";
//#endregion

if (process.argv.length > 2 && process.argv[2].toLowerCase() == "init") {
  scaffold().then(() => process.exit());
} else lits.main(process.argv.slice(2));
/**
 * ## Reading NPM data
 *
 * We define an interface for `package.json` schema. The interface covers only
 * the fields that we are interested in.
 */
const package_json = "package.json";

interface Package {
  name?: string;
  version?: string;
  description?: string;
  scripts?: { [name: string]: string };
  repository?: {
    type: string;
    url: string;
  };
  author?: string;
}
/**
 * ## Scaffolding
 *
 * To be able to read user input from console, we need to ask a `readline`
 * interface from node.js. Then we ask the user to enter the most important
 * configuration parameters. All of them have sensible defaults, which are shown
 * to the user. She can accept the default values by pressing enter. Finally
 * we construct the Options object and save it to `litsconfig.json`.
 */
async function scaffold() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  if (
    !fs.existsSync(lits.litsconfig) ||
    (await askYesNo(
      rl,
      `${lits.litsconfig} already exists. Do you want to overwrite it?`,
      false
    ))
  ) {
    let baseDir = await askOptional(
      rl,
      "Project base directory",
      lits.defaults.baseDir
    );
    let outDir = await askOptional(
      rl,
      "Documentation output directory",
      lits.defaults.outDir
    );
    let outputFormat = await askOptional(
      rl,
      "Output format html/markdown",
      lits.defaults.outputFormat
    );
    let pkgExist = fs.existsSync(package_json);
    let pkg: Package = pkgExist
      ? JSON.parse(fs.readFileSync(package_json, "utf8"))
      : {};
    let frontMatter =
      outputFormat == "markdown"
        ? undefined
        : await askFrontMatterOptions(rl, pkg);
    let litsconfig = {
      baseDir,
      outDir,
      outputFormat,
      frontMatter,
    };
    if (
      pkgExist &&
      (await askYesNo(
        rl,
        "Do you want to add scripts for LiTScript in 'package.json'?",
        false
      ))
    ) {
      if (!pkg.scripts) pkg.scripts = {};
      pkg.scripts["lits"] = "lits";
      pkg.scripts["lits-watch"] = "lits --watch";
      pkg.scripts["lits-serve"] = "lits --serve";
      console.log(`Writing ${package_json}...`);
      fs.writeFileSync(package_json, JSON.stringify(pkg, null, 2));
    }
    console.log(`Writing ${lits.litsconfig}...`);
    fs.writeFileSync(lits.litsconfig, JSON.stringify(litsconfig, null, 4));
  }
  /**
   * To make editing LiTScript's configuration in VSCode easier, we can
   * provide schemas for all the JSON files. Their references will be copied
   * to the `settings.json` in the project level `.vscode` subdirectory.
   */
  let vscodedir = path.resolve(".vscode");
  if (
    fs.existsSync(vscodedir) &&
    (await askYesNo(
      rl,
      "Configure VSCode to use LiTScript JSON schemas?",
      true
    ))
  )
    configureSchemas(vscodedir);
  console.log("Done.\n");
  console.log("Run command 'lits' to generate documentation.");
}
/**
 * ## Asking Front Matter Settings
 *
 * Settings pertaining to front matter are queried separately, only if HTML
 * output is chosen. We utilize the information in `package.json` to provide
 * good defaults.
 */
async function askFrontMatterOptions(rl: readline.Interface, pkg: Package) {
  let projectName = await askMandatory(rl, "Project name", pkg.name);
  let repository =
    pkg.repository && pkg.repository.type == "git"
      ? pkg.repository.url.match(/git\+(.+)\.git$/)[1]
      : pkg.repository?.url;
  repository = await askMandatory(rl, "Repository", repository);
  let download = pkg.name
    ? "https://www.npmjs.com/package/" + pkg.name
    : undefined;
  download = await askMandatory(rl, "Download", download);
  let footer = pkg.author
    ? `Copyright © ${new Date().getFullYear()} ${pkg.author}`
    : undefined;
  footer = await askMandatory(rl, "Footer", footer);
  return {
    projectName,
    repository,
    download,
    footer,
  };
}
/**
 * ## Requesting User Input
 *
 * To make querying user input easier, we implement few functions that ask
 * certain type of questions from the user. First we define a function that
 * asks a boolean value, i.e. yes or no. We always define a default answer too.
 */
async function askYesNo(
  rl: readline.Interface,
  question: string,
  defaultAnswer: boolean
) {
  return new Promise<boolean>((resolve) =>
    rl.question(
      `${question} Yes/No (${defaultAnswer ? "Yes" : "No"}) `,
      (answer) =>
        resolve(
          answer == "" ? defaultAnswer : answer.toLowerCase().startsWith("y")
        )
    )
  );
}
/**
 * Next we define the most basic question that returns a string.
 */
async function ask(
  rl: readline.Interface,
  question: string,
  defaultAnswer?: string
) {
  return new Promise<string>((resolve) =>
    rl.question(
      `${question}${defaultAnswer ? ` (${defaultAnswer}): ` : ": "}`,
      (answer) => resolve(answer == "" ? defaultAnswer : answer)
    )
  );
}
/**
 * This variant asks a string that is optional. It returns undefined, if the
 * user is happy with the default value.
 */
async function askOptional(
  rl: readline.Interface,
  question: string,
  defaultAnswer?: string
) {
  let res = await ask(rl, question, defaultAnswer);
  return res == defaultAnswer ? undefined : res;
}
/**
 * The last version asks a string that is mandatory. So, it always returns
 * a value.
 */
async function askMandatory(
  rl: readline.Interface,
  question: string,
  defaultAnswer?: string
) {
  while (true) {
    let answer = await ask(rl, question, defaultAnswer);
    if (answer) return answer;
  }
}
/**
 * ## Configuring JSON Schemas
 *
 * To make VS Code use our application specific JSON schemas, we need to add
 * its reference to the `settings.json` file. The file contains a section that
 * defines a file match filters for used schemas.
 */
const settings_json = "settings.json";

interface Schema {
  fileMatch: string[];
  url: string;
}
/**
 * We update the schema definitions only, if we don't find a duplicate filter
 * in the file. This way we don't overwrite anything in the settings.
 */
function configureSchemas(vscodedir: string) {
  let settingsPath = path.resolve(vscodedir, settings_json);
  let settings = fs.existsSync(settingsPath)
    ? JSON.parse(fs.readFileSync(settingsPath, "utf8"))
    : {};
  let schemadir = path.relative(".", path.resolve(__dirname, "../schemas"));
  let jsonschemas: Schema[] = settings["json.schemas"];
  if (!jsonschemas) {
    settings["json.schemas"] = [];
    jsonschemas = settings["json.schemas"];
  }
  addSchema(
    jsonschemas,
    "/litsconfig.json",
    path.join(schemadir, "litsconfig-schema.json")
  );
  addSchema(jsonschemas, "/toc.json", path.join(schemadir, "toc-schema.json"));
  addSchema(
    jsonschemas,
    "/dependencies.json",
    path.join(schemadir, "dependency-graph-schema.json")
  );
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4));
}

function addSchema(schemas: Schema[], fileMatch: string, url: string) {
  if (!schemas.find((s) => s.fileMatch[0] == fileMatch))
    schemas.push({
      fileMatch: [fileMatch],
      url: url.replace(/\\/g, "/"),
    });
}
