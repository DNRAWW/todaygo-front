import { LOGIN } from "@/router/routes";
import axios, { AxiosError } from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import ru from "vuetify/src/locale/ru";

@Component({})
export class Signup extends Vue {
  protected allowedDates = (v: string) => new Date(v) < new Date();
  protected fromDateMenu = false;
  protected formValid = false;
  protected login: string | null = null;
  protected password: string | null = null;
  protected password2: string | null = null;
  protected visibleName: string | null = null;
  protected firstName: string | null = null;
  protected lastName: string | null = null;
  protected surName: string | null = null;
  protected dateOfBirth: Date | null = null;

  protected isWrongReg = false;
  protected wrongRegText = "";
  protected isLoading = false;

  protected loginTaken = "";
  protected nameTaken = "";

  protected loginRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 50) || "Логин не должен превышать 50 символов",
    (v: string) =>
      (v && v.length >= 5) || "Логин должен быть больше 4 символов",
  ];
  protected nameRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) => (v && v.length <= 20) || "Не должено превышать 20 символов",
    (v: string) => (v && v.length >= 3) || "Должно быть больше 2 символов",
  ];
  protected passwordRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 50) || "Пароль не должен превышать 25 символов",
    (v: string) =>
      (v && v.length > 7) || "Пароль должен быть больше 7 символов",
  ];
  protected dateRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
  ];
  protected visibleNameRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 40) || "Имя не должно превышать 40 символов",
    (v: string) => (v && v.length >= 5) || "Имя должно быть больше 4 символов",
  ];

  protected async register() {
    this.isLoading = true;
    if (this.password !== this.password2) {
      this.isWrongReg = true;
      this.wrongRegText = "Пароли должны совпадать";
      this.isLoading = false;
      return;
    }

    const isLoginTaken: { data: boolean } = await axios.post(
      `/users/is-login-taken`,
      {
        login: this.login,
      }
    );
    if (isLoginTaken.data) {
      this.loginTaken = "Логин уже занят";
    }

    const isNameTaken: { data: boolean } = await axios.post(
      `/users/is-visible-name-taken`,
      {
        name: this.visibleName,
      }
    );
    if (isNameTaken.data) {
      this.nameTaken = "Имя уже занято";
    }

    if (isNameTaken.data || isLoginTaken.data) {
      this.isLoading = false;
      return;
    }

    try {
      await axios.post("/users/register", {
        login: this.login,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        surName: this.surName,
        visibleName: this.visibleName,
        dateOfBirth: this.dateOfBirth,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        this.isWrongReg = true;
        this.wrongRegText = "Сервер недоступен";
        this.isLoading = false;
        return;
      }

      this.isWrongReg = true;
      this.wrongRegText = "Что-то пошло не так";
      this.isLoading = false;

      return;
    }

    window.location.href = LOGIN;
  }
}

export default Signup;
