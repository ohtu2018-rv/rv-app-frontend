import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DangerBtn from "./../components/DangerBtn";
import SuccessBtn from "./../components/SuccessBtn";

storiesOf("Danger button", module)
  .add("With fill", () => (
    <DangerBtn fill={true} onClick={action("clicked danger button with fill")}>
      Danger button
    </DangerBtn>
  ))
  .add("Without fill", () => (
    <DangerBtn onClick={action("clicked danger button without fill")}>
      Danger button
    </DangerBtn>
  ));

storiesOf("Success button", module)
  .add("With fill", () => (
    <SuccessBtn
      fill={true}
      onClick={action("clicked success button with fill")}
    >
      Success button
    </SuccessBtn>
  ))
  .add("Without fill", () => (
    <SuccessBtn onClick={action("clicked success button without fill")}>
      Success button
    </SuccessBtn>
  ));
