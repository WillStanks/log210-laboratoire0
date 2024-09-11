// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import supertest from 'supertest';
import 'jest-extended';
import app from '../../../src/app';
import { jeuRoutes } from "../../../src/routes/jeuRouter";

const request = supertest(app);
const testNom1 = 'William';
const testNom2 = 'Jean';


describe('GET /api/v1/jeu/redemarrerJeu', () => {
  
  beforeAll(async () => {
    const response = await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    expect(response.statusCode).toBe(201);
    const response2 = await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
    expect(response2.statusCode).toBe(201);
  });

  it(`devrait redémarrer le jeu avec succès`, async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it('devrait rendre 0 pour le nombre de Joueurs', async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
  
});
