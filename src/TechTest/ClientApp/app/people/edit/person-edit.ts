import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

  async submit() {

    // TODO: Step 7
    //
    // Implement the submit and save logic.
    // Send a JSON request to the API with the newly updated
    // this.person object. If the response is successful then
    // the user should be navigated to the list page.

      try {
        //Pass the properties for the personUpdate object via JSON parameters
        const params = {
            "Authorised": this.person.authorised,
            "Enabled": this.person.enabled,
            "Colours": this.person.colours
        };

        const options = {
            method: 'PUT',
            body: JSON.stringify(params)
        };

        const updateResponse = await this.http.fetch(`/people/${this.person.id}`, options);
        const data = await updateResponse.json();

        this.cancel(); //On success: navigate to the list page

    } catch (error) {
        console.log("Error: ", error); //On failure: print an error
        throw error;
    }


      /* There's a problem where the colour checkboxes in the update form aren't initalized correctly,
       * meaning the PersonUpdate doesn't update colours as expected
       * 
       * I tested a few things, and it seems to be caused by an bug in aurelia where the matcher doesn't work inside a for loop
       * I've changed the HTML accordingly, but left the old HTML in comments if you need to use the colourOptions
       * */
  }

  cancel() {
    this.router.navigate('people');
  }
}
