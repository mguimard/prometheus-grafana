
## 6eme partie - Dashboard et alertes from scratch

Nous devons mettre en place des dashboards et alertes sur une nouvelle application déployée.

### 6.1 Déploiement et analyse des métriques

Dans le dossier lab/apps/app-6/ lire les instructions de déploiment, puis analyser les métriques remontées par l'application.

### 6.2 Branchement à prometheus

Ajouter une nouvelle cible dans prometheus pour les métriques de notre application, puis vérifier que la donnée est bien remontée.

Note: utiliser 1s de scrape interval, penser à mettre des labels significatifs.

### 6.3 Dashboard

Réaliser un dashboard Grafana le plus complet possible sur les métriques remontées.

Contraintes :

- métriques en haut
- graphiques en dessous
- graphiques orgnanisés par groupes

### 6.4 Alertes

Mettre en place les règles d'alertes suivantes :

- Alerte lors d'une température > à 60°C sur un des sensors
- Alerte lors d'un nombre de user connectés > à 20
- Alerte lors d'une perte de 5 users
