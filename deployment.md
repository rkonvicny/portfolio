# Nasazení Portfolio Aplikace (Deployment Guide)

Tento dokument popisuje proces nasazení aplikace Portfolio na produkční server s využitím **Dockeru**, **Dockge** jako správce kontejnerů a **Traefiku** jako reverzního proxy serveru.

## 1. Architektura Nasazení

- **Zdrojový kód**: Nachází se ve složce `~/projects/portfolio/`
- **Konfigurace pro Dockge**: Nachází se ve složce `~/docker/portfolio/`
- **Reverse Proxy**: Traefik (komunikuje přes Docker síť `proxy`)
- **Vnější přístup**: Zajišťuje Cloudflare Tunnel ukončující TLS šifrování a komunikující přímo s Traefikem přes port 80.
- **Lokální přístup**: Dostupný přes `portfolio.lan`.

---

## 2. Příprava Prostředí (.env.production)

Aby mohl kontejner správně odesílat zprávy přes kontaktní formulář, je nutné umístit konfigurační soubor s citlivými údaji přímo ke konfiguraci Dockge (nikoliv do veřejného gitu projektové složky, pokud nepoužíváte šifrování).

Vytvořte soubor `~/docker/portfolio/.env.production`:

```env
# Produkční nastavení pro Node.js
NODE_ENV=production

# Údaje pro odesílání e-mailů 
SMTP_USER=email@address.cz
SMTP_PASS=vase_heslo
SMTP_HOST=smtp.email-provider.cz
SMTP_PORT=465
```

---

## 3. Sestavení Docker Obrazu (Build)

Kvůli specifikům Dockge (který z bezpečnostních důvodů nevidí soubory mimo své vyhrazené stack složky) sestavujeme obraz ručně na hostitelském systému. `Dockerfile` leží společně se zdrojovými kódy.

Před samotným sestavením je důležité mít ve zdrojové složce `.dockerignore`, který zamezí kopírování lokální složky `node_modules`. Předejdeme tak pádu `pnpm` buildu (chyba ohledně chybějícího TTY terminálu při pokusu o smazání špatných modulů).

Spuštění buildu z kořenové složky projektu (`~/projects/portfolio`):

```bash
docker build -t portfolio-web:latest .
```

> **Poznámka pro Node 22 a pnpm 11+**:
> Dockerfile obsahuje flag `--ignore-scripts` během příkazu `pnpm install`, protože pnpm v11+ v CI/CD prostředích striktně blokuje běh "post-install" skriptů a mohl by způsobit pád buildu. Pro minimalizaci rušivých vlivů je navíc do build fáze vložena proměnná `ENV CI=true`.

---

## 4. Spuštění přes Dockge (compose.yml)

Dockge se stará pouze o běh samotného kontejneru a napojení na Traefik pomocí štítků (labels).

Soubor `~/docker/portfolio/compose.yml` vypadá následovně:

```yaml
services:
  portfolio:
    image: portfolio-web:latest
    container_name: portfolio-web
    restart: unless-stopped
    
    # Načtení env proměnných (relativní cesta ke složce Dockge)
    env_file:
      - .env.production
      
    networks:
      - proxy
      
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"
      # Routování pro lokální doménu i doménu skrze Cloudflare Tunnel
      - "traefik.http.routers.portfolio.rule=Host(`portfolio.lan`) || Host(`www.konr.cz`)"
      # Přesměrování na vnitřní port 80 (Cloudflare ukončuje SSL a přes HTTP se baví s Traefikem)
      - "traefik.http.routers.portfolio.entrypoints=web"
      # Výstupní port Next.js standalone aplikace
      - "traefik.http.services.portfolio.loadbalancer.server.port=3000"

networks:
  proxy:
    external: true
```

### Spuštění

1. Otevřete webové rozhraní **Dockge**.
2. Rozklikněte stack **portfolio**.
3. Klikněte na **Start** / **Deploy**.

Dockge načte lokálně upečený obraz `portfolio-web:latest`, načte hesla ze svého `.env.production` a kontejner úspěšně spustí za Traefikem.

---

## 5. Jak aktualizovat projekt po úpravě kódu

Při jakékoliv budoucí úpravě zdrojových kódů vašeho portfolia je postup následující:

1. Aplikujte úpravy kódu v `~/projects/portfolio`.
2. Znovu spusťte build příkaz:

   ```bash
   cd ~/projects/portfolio
   docker build -t portfolio-web:latest .
   ```

3. Přejděte do webového rozhraní **Dockge** a u stacku `portfolio` klikněte na **Update/Restart**. (Dockge si sám sáhne po nejnovější verzi s tagem `latest` a provede hladký restart aplikace).
