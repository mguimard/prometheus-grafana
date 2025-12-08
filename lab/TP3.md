
## 3eme partie : découverte des différents écrans et dashboards

### 3.1. AJout de données factices.

Sur la machine virtuelle "applications" :

Démarrer 2 serveurs nginx pour servir des métriques statiques :

```bash
docker run --name nginx-app1 -p 8282:80 --restart always -v /vagrant/apps/static-metrics/app1:/usr/share/nginx/html:ro -d nginx
docker run --name nginx-app2 -p 8383:80  --restart always -v /vagrant/apps/static-metrics/app2:/usr/share/nginx/html:ro -d nginx
```

Ajouter le job pour récupérer les métrics dans prometheus, sur la machine virtuelle "prometheus" :

```bash
vim prometheus/prometheus.yml
```

```yaml
# prometheus.yaml
- job_name: my-apps
  fallback_scrape_protocol: PrometheusText0.0.4
  scrape_interval: 5s
  static_configs:
    - targets:
        - 192.168.56.100:8282
        - 192.168.56.100:8383
      labels:
        group: lab
```

Et redémarrer le conteneur prometheus

```bash
docker restart prometheus
```

### 3.2. Exploitation des données

Dans le menu Datasources, configurer une source prometheus, avec son addresse (http://192.168.56.10:9090/)

Prometheus :

- Accéder à prometheus: http://192.168.56.10:9090
- Tester les métriques statiques myapp_some_data et myapp_other_data

Grafana :

- Accéder à Grafana: http://192.168.56.11:3000
- Afficher les métriques statiques myapp_some_data et myapp_other_data dans un dashboard

Une fois les données affichées

- Changer les valeurs dans les fichiers metrics des deux dossiers lab/apps/static-metrics/app1 et lab/apps/static-metrics/app2.
- Vérifier que les graphiques affichent les nouvelles valeurs
