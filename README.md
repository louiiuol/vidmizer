# Vidmizer

## Test technique Angular - VIDMIZER

Le sujet de ce test doit être réalisé en Angular (version 8, 9 ou 10 selon votre préférence).
Fonctionnalités principales demandées :
- Un formulaire contenant les champs suivant :
  - Un champ “nom” qui doit être obligatoire.
  - Un champ “prénom” qui doit être obligatoire.
  - Un champ “téléphone” qui doit faire 10 caractères minimum et qui n’accepte
  que les chiffres.
  - Un champ “région” obligatoire qui sera un select qui propose l’ensemble des
  régions françaises. Pour récupérer ces régions vous devrez faire une requête GET à l’api Géo. Voici le lien vers la documentation de l’api : https://api.gouv.fr/documentation/api-geo
- A côté du formulaire un tableau qui contiendra l’ensemble des informations submit. Chaque colonne devra correspondre à un des champs du formulaire:
  - Le contenu du tableau devra être organisé par ordre alphabétique en fonction de la colonne “nom”.
  - Un champ input de recherche permettant de filtrer le contenu du tableau par nom, prénom, téléphone ou région.
  - Permettre de supprimer une ligne du tableau.
- Empêcher un utilisateur d’ajouter dans le tableau deux fois le même nom et prénom ou deux fois le même téléphone.
- Sauvegarder en local storage le contenu du tableau afin qu’il s’affiche encore si on
recharge la page.

## Launch

To launch the application, simply run the following commands:

```shell
cd vidmizer;
npm install;
npm start OR ng serve;
```

⛔️Angular CLI is needed to build and run the project ⛔️
