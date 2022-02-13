import { AriaAttributes, DOMAttributes, IntrinsicAttributes } from "react";

declare module "react-router-dom";

declare module "react" {
  interface HTMLAttributes<T>
    extends AriaAttributes,
      DOMAttributes<T>,
      IntrinsicAttributes {
    selected?: any;
    value?: any;
    type?: any;
    style?: string;
  }
}

declare module "react" {
  interface DropDownInput extends IntrinsicAttributes {
    selected?: any;
    value?: any;
    type?: any;
    style?: any;
  }
}
