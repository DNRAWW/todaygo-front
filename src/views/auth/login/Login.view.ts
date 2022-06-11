import { MAIN } from "@/router/routes";
import axios, { AxiosError } from "axios";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export class Login extends Vue {
  protected formValid = false;
  protected login: string | null = null;
  protected password: string | null = null;

  protected isWrongLogin = false;
  protected wrongLoginText = "";
  protected isLoading = false;

  protected loginRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 50) || "Логин не должен превышать 50 символов",
    (v: string) =>
      (v && v.length >= 5) || "Логин должен быть больше 4 символов",
  ];
  protected passwordRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 50) || "Пароль не должен превышать 25 символов",
    (v: string) =>
      (v && v.length > 7) || "Пароль должен быть больше 7 символов",
  ];

  protected async makeLogin() {
    this.isLoading = true;

    try {
      const token: { data: string } = await axios.post("/users/login", {
        login: this.login,
        password: this.password,
      });

      localStorage.setItem("token", token.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        this.isWrongLogin = true;
        this.wrongLoginText = "Сервер недоступен";
        this.isLoading = false;

        return;
      }

      this.isWrongLogin = true;
      this.wrongLoginText = "Неправильный логин или пароль";
      this.isLoading = false;

      return;
    }
    window.location.href = MAIN;
  }

  private listenerKeyDown(e: KeyboardEvent) {
    if (e.key == "Enter") {
      this.makeLogin();
    }
  }
}

export default Login;
