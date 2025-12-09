- machines:
  - ip: 
      - 51.159.232.57
      - 51.159.237.20
      - 51.159.82.118
    metrics:
      - 9100: node-exporter (cpu, ram, disk, etc..)
      - 9323: docker daemon (stats globales containers)
      - 9999: cadvisor (stats détaillées containers)
  - ip:
      - 51.159.82.118
    metrics:
      - 8080: http metrics
      - 8081: telemetry
      - 9323: demon docker
      - 9999: cadvisor
