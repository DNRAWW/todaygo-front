import { ADD_ROLE, ADD_PERSON_ID, ADD_VISIBLE_NAME } from "@/store/constants";
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ADMIN_PANEL, LOGIN, PERSON_VIEW, SIGNUP } from "@/router/routes";
import { meResponse } from "./types";

@Component({})
export class Wrapper extends Vue {
  protected get role(): string {
    return this.$store.getters.role;
  }
  protected get personId(): string {
    return this.$store.getters.personId;
  }
  protected get visibleName(): string {
    return this.$store.getters.visibleName;
  }

  private async mounted() {
    await this.getMe();
  }

  protected makeLoginLink() {
    return {
      name: LOGIN,
    };
  }
  protected makeSignUpLink() {
    return {
      name: SIGNUP,
    };
  }
  protected makeProfileLink() {
    return {
      name: PERSON_VIEW,
      params: {
        id: this.personId,
      },
    };
  }
  protected makeAdminLink() {
    return {
      name: ADMIN_PANEL,
    };
  }

  protected async getMe() {
    if (!localStorage.getItem("token")) {
      return;
    }

    try {
      const me: meResponse = await axios.get("users/me");

      if (me.data.person.visableName) {
        this.$store.commit(ADD_VISIBLE_NAME, me.data.person.visableName);
        this.$store.commit(ADD_ROLE, me.data.person.role);
        this.$store.commit(ADD_PERSON_ID, me.data.person.id);
      }

      if (me.data.person.role !== "ADMIN" && this.$route.name === ADMIN_PANEL) {
        window.location.href = "/";
      }
    } catch {
      if (this.$route.name === ADMIN_PANEL) {
        window.location.href = "/";
      }
      return;
    }
  }

  protected logout() {
    localStorage.removeItem("token");
    this.$store.commit(ADD_VISIBLE_NAME, null);
    window.location.href = "/";
  }
}

export default Wrapper;
