import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { TUser, userResponse } from "./types";

@Component({})
export class PersonEdit extends Vue {
  protected user: TUser | null = null;
  protected allowedDates = (v: string) => new Date(v) < new Date();
  protected fromDateMenu = false;
  protected personFormValid = false;
  protected userFormValid = false;
  protected password: string | null = null;
  protected password2: string | null = null;
  protected newVisibleName: string | null = null;
  protected firstName: string | null = null;
  protected lastName: string | null = null;
  protected surName: string | null = null;
  protected dateOfBirth: Date | null = null;

  protected isWrongReg = false;
  protected wrongRegText = "";
  protected isLoading = false;

  protected loginTaken = "";
  protected nameTaken = "";
  protected wrongPassword = "";

  protected get visibleName() {
    return this.$store.getters.visibleName;
  }

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

  protected dialog = false;

  private async mounted() {
    await this.getMe();
    return;
  }

  protected async getMe() {
    this.isLoading = true;
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    try {
      const me: userResponse = await axios.get("users/me");

      this.user = me.data;

      this.newVisibleName = me.data.person.visableName;
      this.firstName = me.data.person.firstName;
      this.lastName = me.data.person.lastName;
      this.surName = me.data.person.surName;
      this.dateOfBirth = me.data.person.dateOfBirth;

      this.isLoading = false;
    } catch {
      window.location.href = "/login";
    }
  }

  protected async changePerson() {
    try {
      this.dialog = false;

      if (this.newVisibleName !== this.visibleName) {
        const isNameTaken: { data: boolean } = await axios.post(
          `/users/is-visible-name-taken`,
          {
            name: this.visibleName,
          }
        );

        if (isNameTaken.data) {
          this.nameTaken = "Имя уже занято";
          return;
        }
      }

      await axios.post("/people/change", {
        id: this.user?.person.id,
        firstName: this.firstName,
        lastName: this.lastName,
        surName: this.surName,
        visableName: this.visibleName,
        dateOfBirth: this.dateOfBirth,
      });

      window.location.href = `/person/${this.user?.person.id}`;
    } catch (e) {
      this.dialog = false;
    }
  }

  protected formatedDate(unformatedDate: Date): string {
    const date = new Date(unformatedDate);
    const result = date.toLocaleDateString("ru");

    return result;
  }
}

export default PersonEdit;
