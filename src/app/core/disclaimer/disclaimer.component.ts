import { Component, OnInit } from "@angular/core";

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-disclaimer",
  templateUrl: "./disclaimer.component.html",
  styleUrls: ["./disclaimer.component.scss"],
})
export class DisclaimerComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  constructor(private w3cService: W3csService) {}

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }
}
