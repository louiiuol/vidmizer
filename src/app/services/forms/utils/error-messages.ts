/**
 * Global Error Messages
 */
export const ErrorMessages = {
  fields: [
      { type: 'required', message: 'Ce champ est requis !' },
      { type: 'minlength', message: 'Champ trop court' },
      { type: 'maxlength', message: 'Champ trop long' },
      { type: 'pattern', message: 'Le format est invalide' }
  ],
  unreachableApi: 'Seems like server is down, try again later ... ',
  uniqueName: 'Cette identité est déjà prise',
  uniquePhone: 'Ce numéro est déjà associé'
};
