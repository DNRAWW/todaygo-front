import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { TUser } from "../person/PersonEdit/types";

@Component({})
export class AdminPanel extends Vue {
  protected get role(): string {
    return this.$store.getters.role;
  }

  $refs!: {
    changeRoleForm: HTMLFormElement;
  };

  protected findByLoginValid = false;
  protected isChangeRoleValid = false;
  protected login = "";
  protected searchMade = false;
  protected isLoading = false;
  protected roleDialog = false;

  protected user: TUser | null = null;

  protected loginRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      (v && v.length <= 50) || "Логин не должен превышать 50 символов",
    (v: string) =>
      (v && v.length >= 5) || "Логин должен быть больше 4 символов",
  ];

  protected selectedRole = "";

  protected roles = [
    { name: "Админ", value: "ADMIN" },
    { name: "Организатор", value: "ORGANIZER" },
    { name: "Пользователь", value: "REGULAR_USER" },
  ];

  protected roleRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
  ];

  protected orgName = "";

  protected orgNameRules = [
    (v: string) => !!v || "Поле обязательно для заполнения",
    (v: string) =>
      v.length > 2 || "Имя организации должно быть больше 2 символов",
    (v: string) =>
      v.length < 51 || "Имя организации должно быть не больше 50 символов",
  ];

  protected async searchByLogin() {
    this.searchMade = true;

    this.isLoading = true;

    try {
      const user: { data: TUser } = await axios.get(
        `users/get-by-login/${this.login}`
      );

      this.user = user.data;
      this.isLoading = false;
    } catch {
      this.isLoading = false;
      this.user = null;
      return;
    }

    return;
  }

  protected async changeRole() {
    if (!this.user) {
      return;
    }

    if (this.orgName.length > 0) {
      await axios.post("people/change-role", {
        id: this.user.person.id,
        role: this.selectedRole,
        orgName: this.orgName,
      });
    } else {
      await axios.post("people/change-role", {
        id: this.user.person.id,
        role: this.selectedRole,
      });
    }

    this.roleDialog = false;
    this.$refs.changeRoleForm.reset();
    this.user.person.role = this.role;
    await this.searchByLogin();
  }

  protected formatedDate(unformatedDate: Date | null) {
    if (!unformatedDate) {
      return;
    }
    const date = new Date(unformatedDate);
    const result = date.toLocaleDateString("ru");

    return result;
  }
}

export default AdminPanel;
