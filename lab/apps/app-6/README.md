# Déploiement de l'application pour partie 6 du lab

Depuis la VM "applications" :

```bash
cd /vagrant/apps/app-6
docker build -t app6 .
```

Vérification de l'installation :

```bash
docker run -d --name app6 -p 8484:8484 app6
```

```bash
curl localhost:1234/metrics
```