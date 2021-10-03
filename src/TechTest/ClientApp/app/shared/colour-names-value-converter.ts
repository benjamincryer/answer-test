import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

  toView(colours: IColour[]) {

    // TODO: Step 4
    //
    // Implement the value converter function.
    // Using the colours parameter, convert the list into a comma
    // separated string of colour names. The names should be sorted
    // alphabetically and there should not be a trailing comma.
    //
    // Example: 'Blue, Green, Red'

      //Turns the list of IColour objects into a list of names, then sorts alphabetically and joins them by comma
      return colours.map(c => c.name).sort().join(', ');


      /* My first attempt sorted using a custom function, but I realised I could just swap the order of functions and reduce it to one line of code
       * return colours.sort(
          (c1: IColour, c2: IColour) => {
              const str1 = c1.name.toLowerCase();
              const str2 = c2.name.toLowerCase();

              if (str1 < str2) return -1;
              if (str1 > str2) return 1;
              return 0;
          }
         ).map(c => c.name).join(', ');
      */

    }

}
