const express = require("express");
const app = express();
const port = process.env.APP6_HOST;

const start = Date.now();

const data = {
  app6_users_count_new: 0,
  app6_users_count_online: 0,
  app6_users_count_total: 0,
  app6_requests_total: 0,
  app6_errors_total: 0,
  app6_errors_count_new: 0,
  app6_uptime_seconds: 0,
  app6_requests_latency_seconds: 0,
  app6_db_requests_total: 0,
  app6_sensors_sensor1_temp_degrees: 0,
  app6_sensors_sensor2_temp_degrees: 0,
  app6_sensors_sensor3_temp_degrees: 0,
};

const compute = () => {
  const old_data = { ...data };

  data.app6_users_count_total += Math.round(Math.random() * 10) - 5;

  if (data.app6_users_count_total < 0) {
    data.app6_users_count_total = 0;
  }

  data.app6_users_count_new = data.app6_users_count_total - old_data.app6_users_count_total;
  data.app6_users_count_online = Math.floor((Math.random() * data.app6_users_count_total) / 2);
  data.app6_errors_total += Math.floor(Math.random() * 1.2);
  data.app6_errors_count_new = data.app6_errors_total - old_data.app6_errors_total;
  data.app6_uptime_seconds = Math.floor((Date.now() - start) / 1000);
  data.app6_requests_latency_seconds = (0.01 + Math.random() * 0.2).toFixed(3);

  if (Math.random() > 0.5) {
    data.app6_db_requests_total++;
  }

  const randomTemp = () => {
    let res = 30 + Math.random() * 20;

    if (Math.random() < 0.01) {
      res += 50;
    }

    return res.toFixed(0);
  };

  data.app6_sensors_sensor1_temp_degrees = randomTemp();
  data.app6_sensors_sensor2_temp_degrees = randomTemp();
  data.app6_sensors_sensor3_temp_degrees = randomTemp();
};

const metrics = () => {
  let res = "";
  for (var key of Object.keys(data)) {
    res += `${key} ${data[key]}\n`;
  }
  return res;
};

app.get("/", (req, res) => {
  data.app6_requests_total++;
  res.send("Hello World!");
});

app.get("/metrics", (req, res) => {
  data.app6_requests_total++;
  compute();
  res.send(metrics());
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
