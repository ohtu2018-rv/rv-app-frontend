import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DangerBtn from "./../components/buttons/DangerBtn";
import SuccessBtn from "./../components/buttons/SuccessBtn";
import PurchaseNotification from "../components/notifications/PurchaseNotification";

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

storiesOf("Purchase notification (with shadow)", module).add(
  "Coca-Cola Zero, 1.85 eur",
  () => (
    <PurchaseNotification shadow={true} product="Coca-Cola Zero" price={1.85} />
  )
);

storiesOf("Purchase notification (without shadow)", module).add(
  "Coca-Cola Zero, 1.85 eur",
  () => <PurchaseNotification product="Coca-Cola Zero" price={1.85} />
);
