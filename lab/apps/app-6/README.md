# Déploiement de l'application pour partie 6 du lab

Build de l'image docker 

```bash
docker build -t app6 .
```

Lancement du conteneur

```bash
docker run -d --name app6 -p 8484:8484 app6
```

Vérification de l'installation

```bash
curl localhost:8484/metrics
```
