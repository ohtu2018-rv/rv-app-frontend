import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DangerBtn from "./../components/DangerBtn";
import SuccessBtn from "./../components/SuccessBtn";

storiesOf("Danger button", module)
  .add("With fill", () => (
    <DangerBtn
      fill={true}
      onClick={action("clicked danger button with fill")}
      text="Danger button"
    />
  ))
  .add("Without fill", () => (
    <DangerBtn
      onClick={action("clicked danger button without fill")}
      text="Danger button"
    />
  ));

storiesOf("Success button", module)
  .add("With fill", () => (
    <SuccessBtn
      fill={true}
      onClick={action("clicked success button with fill")}
      text="Success button"
    />
  ))
  .add("Without fill", () => (
    <SuccessBtn
      onClick={action("clicked success button without fill")}
      text="Success button"
    />
  ));
