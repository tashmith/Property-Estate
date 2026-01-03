import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const renderHeader = (initialRoute = "/") => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  );
};

describe("Header Component", () => {
  it("renders the logo and brand name", () => {
    renderHeader();
    expect(screen.getByText(/estate agent/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("highlights the active route", () => {
    renderHeader("/properties");
    const activeLink = screen.getByText("Properties");
    expect(activeLink.className).toContain("text-accent");
  });

  it("opens mobile menu when menu button is clicked", () => {
    renderHeader();

    const menuButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(menuButton);

    expect(screen.getAllByText("Home").length).toBeGreaterThan(1);
  });

  it("closes mobile menu when a link is clicked", () => {
    renderHeader();

    const menuButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(menuButton);

    const mobileHomeLink = screen.getAllByText("Home")[1];
    fireEvent.click(mobileHomeLink);

    expect(screen.getAllByText("Home").length).toBe(1);
  });
});
