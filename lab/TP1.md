
## 1ere partie : installation et découverte du lab

### Démarrage du lab

Le lab est composé de trois machines virtuelles basées sur debian/bookworm64.

Vue d'ensemble : https://app.eraser.io/workspace/2KXbiRk3c5Vteg1cLeCV

![lab-overview](lab-overview.png)

Ouvrir un terminal dans le dossier "lab" et démarrer les vms :

```bash
cd lab
vagrant up
```

**Notes** :

- L'initialisation des VMs peut prendre un certain temps selon la qualité de la connexion internet.
- Toutes les commandes suivantes utilisant vagrant devront être exécutées dans le répertoire "lab".

Vérifier le statut des trois machines :

```bash
vagrant status
```

Les trois machines ont comme noms et IPs :

- **prometheus** : 192.168.56.10
- **grafana** : 192.168.56.11
- **applications** : 192.168.56.100

Pour ouvrir un shell dans une des trois machines :

```bash
vagrant ssh prometheus
vagrant ssh grafana
vagrant ssh applications
```

### Installation de node exporter

Sur les trois machines, installer prometheus-node-exporter

```bash
sudo apt install -y prometheus-node-exporter
```

Vérifier que les metrics sont accessibles depuis un navigateur web. Ouvrir les pages suivantes :

- http://192.168.56.10:9100
- http://192.168.56.11:9100
- http://192.168.56.100:9100

Ces trois machines sont maintenant prêtes à être monitorées dans Prometheus et Grafana.

### Monitoring des installation docker

Sur les 3 machines

```bash
sudo vim /etc/docker/daemon.json
```

Ajouter :

```json
{
  "metrics-addr": "0.0.0.0:9323"
}
```

Redémarrer docker

```sh
sudo systemctl restart docker
```

Tester depuis un navigateur

- http://192.168.56.10:9323/metrics
- http://192.168.56.11:9323/metrics
- http://192.168.56.100:9323/metrics

### Installation de cadvisor

Sur les 3 machines :

```bash
docker run \
  --restart always
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=9999:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  gcr.io/cadvisor/cadvisor:v0.49.1
```

Tester depuis un navigateur

- http://192.168.56.10:9999/metrics
- http://192.168.56.11:9999/metrics
- http://192.168.56.100:9999/metrics
