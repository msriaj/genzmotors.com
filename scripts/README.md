# Catalogue scripts

The motorcycle and gear data in `app/data/` was generated from two live WooCommerce
catalogues. These scripts document that provenance and can regenerate it.

| Script | What it does |
| --- | --- |
| `fetch_speedoz.py` | Downloads GPX product photography from the Speedoz Limited catalogue (the parent company). |
| `gen2.py` | Parses the product descriptions into structured spec groups and copies images into `public/images/`. |
| `emit2.py` | Writes `app/data/bikes.ts` and `app/data/gear.ts`. |

They expect the raw catalogue JSON in a local `.scrape/` directory, which is not committed.
Run them from the project root. Day to day, edit `app/data/*.ts` directly — it is the
source of truth for the site.
