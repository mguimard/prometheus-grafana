Générer un cert + clé

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout server.key -out cert.crt
```

Lancer la stack

```bash
docker compose up -d
```

- User name : alice
- Password: password
