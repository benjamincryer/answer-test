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
        //Pass the attributes for the personUpdate object via JSON parameters
        const params = {
            "Authorised": this.person.authorised,
            "Enabled": this.person.enabled,
            "Colours": this.person.colours
        };

        const options = {
            method: 'PUT',
            body: JSON.stringify(params)
        };

        console.log(JSON.stringify(params));

        const response = await this.http.fetch(`/people/${this.person.id}`, options);

        const data = await response.json();
        console.log(data);

        this.cancel(); //On success: navigate to the list page

    } catch (error) {
        console.log("Error: ", error); //On failure: print an error
        throw error;
    }


      /* There's a problem where the colour checkboxes in the update form aren't initalized correctly.
       * The HTML seem to be set up the same way as shown in the aurelia docs, but none of the checkboxes are ever checked on page load
       * */
  }

  cancel() {
    this.router.navigate('people');
  }
}
