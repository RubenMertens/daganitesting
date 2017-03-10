import {TestBed, inject, ComponentFixture} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, XHRBackend} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {MockBackend} from "@angular/http/testing";
import {ConnectionService} from "../../providers/connection-service";
import {MapPage} from "./map";
import {NavController, NavParams, IonicModule} from "ionic-angular";
import {NavMock} from "../../mocks";
import {MyApp} from "../../app/app.component";
/**
 * Created by RubenMertens on 10/03/2017.
 */

//https://www.joshmorony.com/test-driven-development-in-ionic-2-navigation-and-spies/

let comp: MapPage;
let fixture : ComponentFixture<MapPage>;
let de: DebuElement;
let el: HTMLElement;

describe("connection service",() => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, MapPage],
      providers: [
        ConnectionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: NavParams,
          useClass: NavMock
        }
      ],
      imports: [
        FormsModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(MapPage);
    comp = fixture.componentInstance;
  });


  it("should load the map page", () => {
    console.log("doing the test");
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it("should be able to mock the navcontroller", () => {
    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'push');

  })

  //wil eigenlijk een test dat location data mockt dat binnenkomt..

  it("should be able to handle location data", () => {
    //todo write test with actual message (comp.handleMessage)
  })

}
