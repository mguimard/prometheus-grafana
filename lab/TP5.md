## 5eme partie - mise en place d'alertes

Prérequis : serveur mailhog

```bash
docker run --name mailhog -d -p 8025:8025 -p 1025:1025 mailhog/mailhog
```

- 8025: port de la GUI WEB
- 1025: port SMTP

### 5.1 Première règle d'alerte

Dans le menu contact points, ajouter un point de contact de type email, tester que nous recevons bien des emails sur Mailhog http://localhost:8025

- Créer un dashboard, avec un panneau pour monitorer la valeur "myapp_some_data"
- Créer une alerte sur ce panneau
  - Nom de l'alerte : "Valeur élevée de myapp_some_data"
  - Fréquence : toutes les 30 secondes
  - Condition : valeur supérieure à 1000
  - Créer un dossier nommé "my app alerts"
  - Créer un groupe d'évaluation nommé "my app eval group"
  - Définir un message personalisé
  - Enregistrer.

Une fois l'alerte en place, vérifier que la condition n'est pas détectée (valeurs dans les fichiers inférieure à 500)

Modifier les fichiers de métriques statiques, mettre une valeur supérieur à 500, puis attendre la prochaine exécution.

- Vérifier qu'un email a bien été envoyé.
- Remettre la métrique en dessous de 500
- Vérifier qu'un 2eme email arrive (alerte résolue)

### 5.2 Création de plusieurs alertes

Créer de nouvelles alertes en reprenant les étapes précédentes :

- Utilisation CPU > 50%
- Espace disque utilisé > 80%
- Nombre d'instances nginx < 2
