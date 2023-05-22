import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./src/steps/features/loggin-in.feature", {
    errors: {
      missingScenarioInStepDefinitions: true, // Error when a scenario is in the feature file, but not in the step definition
      missingStepInStepDefinitions: true, // Error when a step is in the feature file, but not in the step definitions
      missingScenarioInFeature: true, // Error when a scenario is in the step definitions, but not in the feature
      missingStepInFeature: true, // Error when a step is in the step definitions, but not in the feature
    }
  });

defineFeature(feature, (test) => {
  test("Entering a correct password", ({ given, when, then }) => {
    let variable=0;
    given("I have previously created a password", () => {
      variable+=1;
    });

    when("I enter my password correctly", () => {
        variable +=2;
    });

    then("I should be granted access", () => {
      expect(variable).toBe(3);
    });
  });
});
