// export interface IuserDetail {
//     id: string;
//     name: string;
//     email: string;
//     phone: string | null;
//     gender: string | null;
//     profilePicture: string | null;
//     tests: any[];
// }
export interface ITestResult {
  testId: number;
  testName: string;
  dateTaken: string;
  result: string;
}

export interface IuserDetail {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  profilePicture: string | null;
  tests: ITestResult[];
}
