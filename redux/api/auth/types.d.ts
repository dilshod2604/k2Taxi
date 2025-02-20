interface signUpUserRequest {
  name: string;
  email: string;
  password: string;
}

interface signUpUserResponce {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface signInUserRequest {
  email: string;
  password: string;
}

interface signInUserResponce {
  token: strin;
}

interface getUserResponse {
  id: number;
  name: string;
  email: string;
}

// type getUserRequest = { id: number };
