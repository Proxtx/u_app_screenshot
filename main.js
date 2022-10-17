import { clients, refreshClients } from "../../private/clients.js";

export class App {
  constructor(config) {
    this.config = config;
  }

  async screenshot(monitorIndex) {
    await refreshClients();
    let client = clients[this.config.client];
    if (!client) return "Client is not connected.";

    return new Buffer.from(
      (
        await client.request("screen", "screenshot", [Number(monitorIndex)])
      ).result
    ).toString("base64");
  }

  async screens() {
    await refreshClients();
    let client = clients[this.config.client];
    if (!client) return "Client is not connected.";

    return (await client.request("screen", "screens", [])).result;
  }
}
