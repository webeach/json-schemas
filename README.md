# @webeach/json-schemas

JSON schemas for the [Webeach](https://webea.ch) ecosystem packages.

Schemas are hosted at **https://schemas.webea.ch** and can be referenced directly in your configs:

```json
{
  "$schema": "https://schemas.webea.ch/package-name/v1.0.json"
}
```

## Structure

```
schemas/
└── package-name/
    └── v1.json
```

## Development

```bash
pnpm install
pnpm validate   # validate all JSON schemas
pnpm fmt        # format
pnpm fmt:check  # check formatting
```
