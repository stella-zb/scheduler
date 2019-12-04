import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByLabelText, getByPlaceholderText, getByDisplayValue, getByAltText, getByTitle, getByRole, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    const firstEmptyAppointmentSpot = appointments[0];
    
    fireEvent.click(getByAltText(firstEmptyAppointmentSpot, "Add"))
    fireEvent.change(getByPlaceholderText(firstEmptyAppointmentSpot, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    fireEvent.click(getByAltText(firstEmptyAppointmentSpot, "Sylvia Palmer"))
    fireEvent.click(getByText(firstEmptyAppointmentSpot, "Save"))
    
    expect(getByText(firstEmptyAppointmentSpot, "Saving")).toBeInTheDocument();
    
    await waitForElementToBeRemoved(() => getByText(firstEmptyAppointmentSpot, "Saving"))

    expect(getByText(firstEmptyAppointmentSpot, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    
    await waitForElement(() => getByText(day, "no spots remaining"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });

})
