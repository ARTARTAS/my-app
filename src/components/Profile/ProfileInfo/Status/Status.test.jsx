import React from "react";
import { create } from "react-test-renderer";
import TestRenderer from "react-test-renderer";
import ProfileStatus from "./Status";

describe("Profile status component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("SUBSCRIBE TO BASIC");
  });
  test("span should contain set text on mount", () => {
    const component = TestRenderer.create(
      <ProfileStatus status="SUBSCRIBE TO BASIC" />
    );
    const instance = component.root;
    let span = instance.findByType("span");
    expect(span.children).toStrictEqual(["SUBSCRIBE TO BASIC"]);
  });
  test("span should change to input after click and display set text", () => {
    const component = TestRenderer.create(
      <ProfileStatus status="SUBSCRIBE TO BASIC" />
    );
    const instance = component.root;
    let span = instance.findByType("span");
    span.props.onClick();
    let input = instance.findByType("input");
    expect(input.props.value).toBe("SUBSCRIBE TO BASIC");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn()
    const component = TestRenderer.create(
      <ProfileStatus updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1);
  });

});
