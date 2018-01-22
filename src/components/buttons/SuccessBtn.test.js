import React from "react";
import { shallow } from "enzyme";
import SuccessBtn from "./SuccessBtn";
import Loader from "./../loaders/Loader";

describe.only("<SuccessBtn />", () => {
  it("renders text correctly", () => {
    const data = {
      text: "Hello world"
    };

    const successBtnComponent = shallow(<SuccessBtn>{data.text}</SuccessBtn>);
    console.log(successBtnComponent.debug());
    const contentDiv = successBtnComponent.find(".btnContent");
    expect(contentDiv.text()).toContain(data.text);
  });

  it("shows loader correctly", () => {
    const successBtnComponent = shallow(<SuccessBtn loader={true} />);
    console.log(successBtnComponent.debug());
    expect(successBtnComponent.contains(<Loader />)).toBe(true);
  });

  it("onClick event works correctly", () => {
    const data = {
      text: "Hello world"
    };

    const mockHandler = jest.fn();

    const successBtnComponent = shallow(<SuccessBtn onClick={mockHandler} />);

    const button = successBtnComponent.find("button");

    expect(mockHandler.mock.calls.length).toBe(0);
    button.simulate("click");
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
