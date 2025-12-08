## 2eme partie : installation de prometheus, grafana

### Promehteus

Dans cette partie, nous installons prometheus et grafana dans des containers docker.

Se connecter à la machine prometheus :

```bash
vagrant ssh prometheus
```

Vérifier que docker est prêt à l'emploi

```bash
systemctl status docker
docker --version
```

Créer le fichier de configuration de prometheus

```bash
cd /home/vagrant
mkdir prometheus
touch prometheus/prometheus.yml
```

Editer `prometheus/prometheus.yml` et y placer cette configuration :

```bash
vim prometheus/prometheus.yml
```

```yaml
scrape_configs:
  - job_name: lab-metrics
    scrape_interval: 5s
    static_configs:
      - targets:
          - 192.168.56.10:9100
          - 192.168.56.11:9100
          - 192.168.56.100:9100
        labels:
          group: lab
          foo: bar
          myApp: someName

  - job_name: docker-metrics
    scrape_interval: 5s
    static_configs:
      - targets:
          - 192.168.56.10:9323
          - 192.168.56.11:9323
          - 192.168.56.100:9323
        labels:
          group: lab

  - job_name: cadvisor-metrics
    scrape_interval: 5s
    static_configs:
      - targets:
          - 192.168.56.10:9999
          - 192.168.56.11:9999
          - 192.168.56.100:9999
        labels:
          group: lab
```

**Note** : référence https://prometheus.io/docs/prometheus/latest/configuration/configuration/

Lancer prometheus :

```bash
docker run \
    --name prometheus \
    --detach \
    -p 9090:9090 \
    -v /home/vagrant/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

Vérifier que le container est bien démarré :

```bash
docker ps
```

Vérifier que l'interface de prometheus est accessible depuis un navigateur web. Ouvrir la page suivante :

http://192.168.56.10:9090

### Grafana

Se connecter à la machine grafana :

```bash
vagrant ssh grafana
```

Créer un répertoire pour stocker les données de grafana, et lancer un container grafana :

```bash
docker volume create grafana
docker run -d -p 3000:3000 --name=grafana \
  -e "GF_SERVER_ROOT_URL=http://192.168.56.11:3000" \
  -e "GF_SMTP_ENABLED=true" \
  -e "GF_SMTP_HOST=192.168.56.100:1025" \
  --user "$(id -u)" \
  --volume grafana:/var/lib/grafana \
  grafana/grafana-enterprise
```

Vérifier que le container est bien démarré :

```bash
docker ps
```

Vérifier que l'interface de grafana est accessible depuis un navigateur web. Ouvrir la page suivante :

http://192.168.56.11:3000

Le login et mot de passe par défaut sont : admin/admin
