import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  })
  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  })
  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
  })
  it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
  })
  it("use the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });
});
