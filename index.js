#!/usr/bin/env node

const { Command } = require("commander");
const inquirer = require("inquirer");
const { analyzeContract } = require("./src/ai-prompt");
const fs = require("fs");
const path = require("path");
const program = new Command();
program.name("auditai").description("a cli tool to audit contract");

const getApiKey = async () => {
  const { apiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your OpenAI API key",
      validate: (input) => input.length > 0 || "API key is required",
    },
  ]);
  return apiKey;
};
program
  .command("check <files>")
  .description("analyze a samrt contract")
  .action(async (file) => {
    try {
      const apiKey = await getApiKey();

      const contractPath = path.resolve(process.cwd(), file);
      console.log(`Checking file at path: ${contractPath}`);

      if (!fs.existsSync(contractPath)) {
        console.error("File not found");
        process.exit(1);
      }
      if (fs.statSync(contractPath).isDirectory()) {
        console.error("Path is a directory, not a file:", contractPath);
        process.exit(1);
      }

      const contract = fs.readFileSync(contractPath, "utf8");

      await analyzeContract(contract, apiKey);
    } catch (error) {
      console.error("Error during analysis", error.message);
    }
  });

program.parse(process.argv);
