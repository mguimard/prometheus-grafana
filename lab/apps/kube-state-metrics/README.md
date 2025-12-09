# Metrics kubernetes

Depuis la VM "applications" :

```bash
kubectl apply -k /vagrant/apps/kube-state-metrics
kubectl port-forward -n kube-system service/kube-state-metrics --address 0.0.0.0 8080:8080 2>&1 >/dev/null &
kubectl port-forward -n kube-system service/kube-state-metrics --address 0.0.0.0 8081:8081 2>&1 >/dev/null &
```

Attention, les commandes "kubectl port-forward" sont stopées si la connexion ssh à la machine "applications" est terminée.

Tester depuis votre navigateur :

- http://192.168.56.100:8080
- http://192.168.56.100:8081