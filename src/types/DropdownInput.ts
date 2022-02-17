export default interface DropDownInput {
  name: string;
  label: string;
  error: string;
  data: any;
  options: any;
  onChange: () => void;
  restProps?: any;
  value: string;
  style: string;
}
