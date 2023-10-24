import { PropsWithChildren } from "react";

export const RadioGroup = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      role="radiogroup"
      className="radio-group"
      aria-labelledby="group_heading"
    >
      {/* <h2 id="group_heading">Payment Method</h2> */}
      {children}
    </div>
  );
};

export const Radio = ({
  children,
  id,
  name,
  defaultChecked,
}: PropsWithChildren<{
  id: string;
  name: string;
  defaultChecked: boolean;
}>) => {
  return (
    <>
      <input type="radio" id={id} name={name} defaultChecked={defaultChecked} />
      <label className="radio-label" htmlFor={id}>
        {children}
      </label>
    </>
  );
};
