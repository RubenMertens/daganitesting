

import {TestBed, inject, async} from "@angular/core/testing";
import {ConnectionService} from "./connection-service";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, XHRBackend, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
describe("connection service",() => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ConnectionService,


          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory:
              (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend,defaultOptions);
              }
          }
        ],
        imports: [
          FormsModule,
          HttpModule
        ]
      });
      TestBed.compileComponents();
    });

  it('should construct', async(inject(
    [ConnectionService, MockBackend], (service, mockBackend) => {

      expect(service).toBeDefined();
    })));

    it("should give back some things from the backend", inject([ConnectionService], (connectionService: ConnectionService) => {
      console.log("doing the test")
      let bullShit:string = "";

      connectionService.getStagedGames().subscribe((data)=> {
        console.log("in the subscribe");
        for (let obj of data) {
          console.log(obj);
          console.log(obj.name);
          console.log(obj.name === "firstGame");
          if(obj.name === "firstGame"){
            bullShit = obj.id;
          }
        }

        console.log(bullShit);
        expect(bullShit).not.toBe("");
        connectionService.registerToGame(bullShit).subscribe((data) => {
          console.log(data);

          expect(data).not.toBeNull();
        });

      });
      console.log("past the whole thing")


    }))
});
