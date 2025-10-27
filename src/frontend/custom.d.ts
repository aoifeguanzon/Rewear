// Custom module declarations: make sure the logo.png is included in
//social.tsx without errors
//@author Huy Le (huyisme-005)
declare module '*.png' {
  const value: string;
  export default value;
}
