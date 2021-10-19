import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator", () => {
  test("'previos' button should be dissabled when on first page", () => {
    const component = create(
      <Paginator totalItemCount={1000} pageSize={10} currentPage={1} />
    );
    const instance = component.root;
    const prevButton = instance.findAllByType("button");
    expect(prevButton[0].props.disabled).toBe(true);
  });
  test("'next' button should be dissabled when on last page", () => {
    const component = create(
      <Paginator totalItemCount={10000} pageSize={10} currentPage={1000} />
    );
    const instance = component.root;
    const nextButton = instance.findAllByType("button");
    expect(nextButton[21].props.disabled).toBe(true);
  });
  test("number of buttons should be 22 (20 pages + 2 nav)", () => {
    const component = create(
      <Paginator totalItemCount={1000} pageSize={1} currentPage={1} />
    );
    const instance = component.root;
    const Button = instance.findAllByType("button");
    expect(Button.length).toBe(22);
  });
});
