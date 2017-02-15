import {MyApp} from "./app.component";
import {Platform} from "ionic-angular";
import {ServerListPage} from "../pages/server-list/server-list";
/**
 * Created by RubenMertens on 13/02/2017.
 */

let app = null;

describe("appComponent", () => {
  beforeEach(() => {
    app = new MyApp(new Platform());
  })

  it("should change page if button clicked" , () => {
    let page: any = app.rootPage;
     app.onServerListClicked();
     let otherpage : any = app.rootPage;
     expect(page != otherpage).toBeTruthy();
  });

  it("rootpage should not be null",() => {
    let page: any = app.rootPage;
    app.onServerListClicked();
    let otherpage : any = app.rootPage;
    expect(otherpage != null && page !=  null).toBeTruthy();
  })

  it("should goto serverlist page if button clicked",() => {
    app.onServerListClicked();
    let page = app.rootPage;
    expect(page.title === "Server List").toBeTruthy();
    expect(page instanceof ServerListPage).toBeTruthy();
  })

});
