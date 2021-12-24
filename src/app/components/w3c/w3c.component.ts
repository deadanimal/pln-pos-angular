import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-w3c",
  templateUrl: "./w3c.component.html",
  styleUrls: ["./w3c.component.scss"],
})
export class W3cComponent implements OnInit {
  // Data
  fontFamilyChkbox: boolean = false;
  fontSize: string;
  grayScaleChkbox: boolean = false;
  invertColorChkbox: boolean = false;
  slider = 0.9;
  themeColor: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private w3cService: W3csService
  ) {}

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  openNav() {
    document.getElementById("myStickeyw3c").style.width = "300px";
  }

  closeNav() {
    document.getElementById("myStickeyw3c").style.width = "0";
  }

  onFontSizeChange(value: any) {
    var fontSizeClass = "fs-" + value.toString().replace(".", "") + "rem";
    this.w3cService.changeFontSize(fontSizeClass);
  }

  onThemeColorClick(value: any) {
    var themeColorClass = "theme-" + value;
    if (value == "default") {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "background-color",
        "#202251"
      );
    }
    if (value == "info") {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "background-color",
        "#8f2c2c"
      );
    }
    if (value == "primary") {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "background-color",
        "#c96130"
      );
    }
    if (value == "success") {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "background-color",
        "#18631b"
      );
    }
    this.w3cService.changeThemeColor(themeColorClass);
  }

  onReadableFontChange() {
    if (this.fontFamilyChkbox) {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "font-family",
        "Arial"
      );
    } else if (!this.fontFamilyChkbox) {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "font-family",
        "Poppins"
      );
    }
  }

  onGrayScaleChange() {
    if (this.grayScaleChkbox) {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "filter",
        "grayscale(100%)"
      );
    } else if (!this.grayScaleChkbox) {
      this.grayScaleChkbox = false;
      this.invertColorChkbox = false;
      this.renderer.removeStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "filter"
      );
    }
  }

  onInvertColorChange() {
    if (this.invertColorChkbox) {
      this.renderer.setStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "filter",
        "invert(1)"
      );
    } else if (!this.invertColorChkbox) {
      this.grayScaleChkbox = false;
      this.invertColorChkbox = false;
      this.renderer.removeStyle(
        this.elementRef.nativeElement.ownerDocument.body,
        "filter"
      );
    }
  }
}
