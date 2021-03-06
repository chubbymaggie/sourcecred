// @flow

import {render} from "enzyme";
import {exampleEntities} from "./example/example";
import {description} from "./render";
import enzymeToJSON from "enzyme-to-json";

require("../../app/testUtil").configureAphrodite();
require("../../app/testUtil").configureEnzyme();

describe("plugins/github/render", () => {
  const examples = exampleEntities();
  for (const name of Object.keys(examples)) {
    it(`renders the right description for a ${name}`, () => {
      const entity = examples[name];
      const renderedEntity = render(description(entity));
      expect(enzymeToJSON(renderedEntity)).toMatchSnapshot();
    });
  }
});
