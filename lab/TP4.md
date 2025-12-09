## 4eme partie : déploiements et monitoring d'applications dans kubernetes et PromQL

### 4.1 Ajout de données dans prometheus

Se connecter à la machine applications :

```bash
vagrant ssh applications
```

Démarrer un cluster kubernetes :

```bash
minikube start --cpus=4 --memory=6g --addons=ingress
```

**Note** : cela peut prendre quelques minutes selon la qualité de la connexion internet.

Déployer les applications kube-state-metrics et postgres (voir README.md dans les dossiers lab/apps/)

Ajouter le job pour récupérer les métrics dans prometheus, sur la machine virtuelle prometheus :

```bash
vim prometheus/prometheus.yml
```

```yaml
# prometheus.yaml
- job_name: kube-metrics
  scrape_interval: 5s

  static_configs:
    - targets:
        - 192.168.56.100:8080
        - 192.168.56.100:8081
      labels:
        group: lab
```

Et redémarrer le conteneur prometheus

```bash
docker restart prometheus
```

Vérifier :

```bash
docker ps
```

### 4.2 Ecriture de requêtes PromQL

Accéder à http://192.168.56.10:9090/query pour écrire quelques requêtes PromQL :

- Evolution du nombre de conteneurs up
- Evolution de l'utilisation CPU par conteneur
- Evolution de l'utilisation CPU par namespace
- Evolution du nombre de PODs
- Evolution du nombre de services

### 4.3 Création d'un dashboard

Reprendre les différentes requêtes de la partie précédente pour créer un dashboard grafana.

### 4.4 Découverte du dashboard Kube State Metrics v2

Installer ce dashboard via son id (21742)

https://grafana.com/grafana/dashboards/21742-object-s-health-kube-state-metrics-v2/

Inspecter chaque panel.
