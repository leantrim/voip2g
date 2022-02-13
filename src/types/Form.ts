export interface Form {
  initalData: any;
  joiSchema: any;
  doSubmit?: any;
}

export interface ValidateProperty {
  name: string;
  value: string;
}

export interface RenderInput {
  name: string;
  label: string;
  input: string;
}

export interface RenderDropDown {
  name: string;
  label: string;
  options: {};
}

export interface RenderButton {
  input: string;
  style: string;
}
