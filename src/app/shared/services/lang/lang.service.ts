import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LangService {
  constructor() {}

  getLang() {
    return window.localStorage["lang"];
  }

  saveLang(lang: String) {
    window.localStorage["lang"] = lang;
  }

  destroyLang() {
    window.localStorage.removeItem("lang");
  }
}
