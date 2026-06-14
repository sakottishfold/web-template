import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  // For navigation that looks like a button, style a real link/anchor with
  // buttonVariants — keep <Button> for actions only. Routing an anchor through
  // Base UI's <Button> either warns (nativeButton) or forces role="button",
  // which strips the link semantics screen readers rely on.
  it("styles a link as a button via buttonVariants, keeping link semantics", () => {
    render(
      <a href="/docs" className={buttonVariants()}>
        Docs
      </a>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });
});
