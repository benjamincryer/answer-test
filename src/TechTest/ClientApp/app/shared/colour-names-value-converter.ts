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

      //Put in array, then sort it
      let colourNames = [];
      for (var i = 0; i < colours.length; i++) {
          colourNames.push(colours[i].name);
      }

      return colourNames.sort().join(', ');

  }

}
